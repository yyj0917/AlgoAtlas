import { getAllProblems, getAlgorithms, getAllThemes } from '@/lib/firestore';
import { ProblemsClient } from './problems-client';

export const revalidate = 3600;

export default async function ProblemsPage() {
  const [problems, algorithms, themes] = await Promise.all([
    getAllProblems(),
    getAlgorithms(),
    getAllThemes(),
  ]);

  return <ProblemsClient problems={problems} algorithms={algorithms} themes={themes} />;
}
