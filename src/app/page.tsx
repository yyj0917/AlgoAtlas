import type { Metadata } from 'next';
import { getAlgorithms, getCSCategories, getAllThemes, getAllProblems } from '@/lib/firestore';
import { HomeClient } from './home-client';

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://algoatlas.vercel.app';

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'AlgoAtlas - 알고리즘, 체계적으로 정리하다',
    description:
      '백준, 프로그래머스, LeetCode 문제를 유형별로 분류하고, 개념과 풀이를 한 곳에서 학습하세요.',
    url: siteUrl,
    type: 'website',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AlgoAtlas',
  url: siteUrl,
  description:
    '백준, 프로그래머스, LeetCode 문제를 유형별로 분류하고, 개념과 풀이를 한 곳에서 학습하세요.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient algorithms={algorithms} csCategories={csCategories} stats={stats} />
    </>
  );
}
