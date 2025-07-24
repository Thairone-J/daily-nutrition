import { getFoods } from '@/lib/data';
import DashboardClient from './DashboardClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);

  if (session?.user?.name) {
    return { title: `Refeições de ${session.user.name}` };
  }

  return { title: 'Dashboard' };
}

export default async function DashboardPage() {
  const foods = await getFoods();
  return <DashboardClient foods={foods} />;
}
