'use server';

import { Services, withServiceProvider } from '@/app/create-service-provider';
import { z } from 'zod';

const updateMemberMessageRequestSchema = z.object({
  message: z.string().max(50).nullable(),
});

type ActionOptions = {
  mock?: string;
  mockChannelId?: string;
};

type ActionParameters = [data: unknown, options: ActionOptions];

async function updateMemberMessageActionInner(
  data: unknown,
  services: Services
) {
  const session = await services.getServerSession();
  const memberId = session?.channelId;

  if (!memberId) {
    console.warn('Unable to authenticate update message request.');
    throw new Error('Unauthenticated');
  }

  console.log('Updating message for member ID:', memberId);

  const parsedData = updateMemberMessageRequestSchema.safeParse(data);

  if (!parsedData.success) {
    console.warn('Update message validation failed:', parsedData.error);
    throw new Error('Invalid');
  }

  const message = parsedData.data.message;

  await services.updateMemberMessageCommand.execute(memberId, message);

  console.log('Successfully updated message for member ID:', memberId);
}

export const updateMemberMessageAction = withServiceProvider<
  ActionParameters,
  Promise<void>
>(
  (services) => (data) => updateMemberMessageActionInner(data, services),
  (_, options) => options
);
