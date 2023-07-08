import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession as getServerSessionBase } from 'next-auth';

export function getServerSession() {
  return getServerSessionBase(authOptions);
}
