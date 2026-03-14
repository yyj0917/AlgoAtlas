import { getAlgorithms, getAllThemes, getAllProblems, getCSCategories, getAllCSTopics } from '@/lib/firestore';
import { AdminDashboardClient } from './admin-dashboard-client';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [algorithms, themes, problems, csCategories, csTopics] = await Promise.all([
    getAlgorithms(),
    getAllThemes(),
    getAllProblems(),
    getCSCategories(),
    getAllCSTopics(),
  ]);

  const recentProblems = [...problems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminDashboardClient
      stats={{
        algorithmCount: algorithms.length,
        themeCount: themes.length,
        problemCount: problems.length,
        csCategoryCount: csCategories.length,
        csTopicCount: csTopics.length,
      }}
      recentProblems={recentProblems}
    />
  );
}
