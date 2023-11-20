import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/libs/prismaDb';

export async function getSession() {
  return await getServerSession(authOptions);
}