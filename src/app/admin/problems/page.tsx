import { getAllProblems, getAlgorithms } from '@/lib/firestore';
import { AdminProblemsClient } from './problems-client';

export const revalidate = 0;

export default async function AdminProblemsPage() {
  const [problems, algorithms] = await Promise.all([getAllProblems(), getAlgorithms()]);
  return <AdminProblemsClient problems={problems} algorithms={algorithms} />;
}
