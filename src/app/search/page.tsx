import type { Metadata } from 'next';
import { SearchContent } from './search-content';

export const metadata: Metadata = {
  title: '검색',
  description:
    '알고리즘, CS 지식, 코딩테스트 문제를 한 번에 검색하세요. 다이나믹 프로그래밍, 그래프, 운영체제, 네트워크 등 원하는 주제를 빠르게 찾아보세요.',
  alternates: { canonical: '/search' },
  openGraph: {
    title: '통합 검색 | AlgoAtlas',
    description: '알고리즘, CS 지식, 코딩테스트 문제를 한 번에 검색하세요.',
    url: '/search',
  },
};

export default function SearchPage() {
  return <SearchContent />;
}
