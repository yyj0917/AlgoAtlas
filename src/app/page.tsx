import { getAlgorithms, getCSCategories, getAllThemes, getAllProblems, getCSTopicsByCategorySlug } from '@/lib/firestore';
import { HomeClient } from './home-client';

export const revalidate = 3600;

export default async function HomePage() {
  const [algorithms, csCategories, themes, problems] = await Promise.all([
    getAlgorithms(),
    getCSCategories(),
    getAllThemes(),
    getAllProblems(),
  ]);

  // CS 토픽 카운트 합산
  const totalCSTopics = csCategories.reduce((sum, c) => sum + (c.topicCount ?? 0), 0);

  const stats = {
    problemCount: problems.length,
    themeCount: themes.length,
    csTopicCount: totalCSTopics,
  };

  return <HomeClient algorithms={algorithms} csCategories={csCategories} stats={stats} />;
}
