import type { Metadata } from 'next';
import { getAllProblems, getAlgorithms, getAllThemes } from '@/lib/firestore';
import { ProblemsClient } from './problems-client';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '문제',
  description:
    '백준, 프로그래머스, LeetCode의 코딩테스트 문제를 알고리즘 유형별로 정리했습니다. 난이도와 플랫폼 필터로 원하는 문제를 찾아보세요.',
  alternates: { canonical: '/problems' },
  openGraph: {
    title: '코딩테스트 문제 | AlgoAtlas',
    description:
      '백준, 프로그래머스, LeetCode 문제를 알고리즘 유형별로 정리했습니다.',
    url: '/problems',
  },
};

export default async function ProblemsPage() {
  const [problems, algorithms, themes] = await Promise.all([
    getAllProblems(),
    getAlgorithms(),
    getAllThemes(),
  ]);

  return <ProblemsClient problems={problems} algorithms={algorithms} themes={themes} />;
}
