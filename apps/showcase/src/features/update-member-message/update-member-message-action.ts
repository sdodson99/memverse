'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createServiceProvider } from '@/app/create-service-provider';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const updateMemberMessageRequestSchema = z.object({
  message: z.string().max(50).nullable(),
});

export async function updateMemberMessageAction(data: unknown) {
  const session = await getServerSession(authOptions);
  const memberId = session?.channelId;

  if (!memberId) {
    throw new Error('Unauthenticated');
  }

  const parsedData = updateMemberMessageRequestSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid');
  }

  const message = parsedData.data.message;

  const { updateMemberMessageCommand } = createServiceProvider();

  await updateMemberMessageCommand.execute(memberId, message);
}
