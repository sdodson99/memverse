'use server';

import { createServiceProvider } from '@/app/create-service-provider';
import { z } from 'zod';

const updateMemberMessageRequestSchema = z.object({
  message: z.string().max(50).nullable(),
});

type ActionOptions = {
  mock?: string;
  mockChannelId?: string;
};

export async function updateMemberMessageAction(
  data: unknown,
  options: ActionOptions = {}
) {
  const { updateMemberMessageCommand, getServerSession } =
    createServiceProvider(options);

  const session = await getServerSession();
  const memberId = session?.channelId;

  if (!memberId) {
    throw new Error('Unauthenticated');
  }

  const parsedData = updateMemberMessageRequestSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid');
  }

  const message = parsedData.data.message;

  await updateMemberMessageCommand.execute(memberId, message);
}
