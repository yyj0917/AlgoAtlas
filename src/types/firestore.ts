// Timestamp는 직렬화 후 ISO string으로 전달되므로 string으로 처리
type Timestamp = string;

// ─────────────────────────────────────────
// 알고리즘 카테고리
// Collection: algorithms / Doc ID: slug
// ─────────────────────────────────────────
export interface Algorithm {
  id: string; // = slug (e.g. "dp")
  name: string; // 한국어 이름
  nameEn: string; // 영어 이름
  slug: string;
  description: string;
  icon: string; // Lucide icon name (e.g. "Layers")
  order: number; // 목록 정렬 순서
  themeCount: number; // denormalized
  problemCount: number; // denormalized
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// 알고리즘 테마
// Collection: themes / Doc ID: slug
// ─────────────────────────────────────────
export type ThemeDifficulty = '입문' | '중급' | '고급';

export interface Theme {
  id: string; // = slug (e.g. "knapsack")
  algorithmId: string; // = algorithmSlug
  algorithmSlug: string;
  name: string; // 한국어 이름
  nameEn: string; // 영어 이름
  slug: string;
  description: string;
  difficulty: ThemeDifficulty;
  tags: string[];
  problemCount: number; // denormalized
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// 문제
// Collection: problems / Doc ID: "{platform}-{platformId}"
// ─────────────────────────────────────────
export type Platform = 'baekjoon' | 'programmers' | 'leetcode';

export interface Problem {
  id: string; // "{platform}-{platformId}" (e.g. "baekjoon-12865")
  platform: Platform;
  platformId: string; // 플랫폼 고유 번호/슬러그
  title: string; // 한국어 제목
  titleEn: string; // 영어 제목 (없으면 "")
  difficulty: 1 | 2 | 3 | 4 | 5; // 통합 난이도
  difficultyLabel: string; // 플랫폼 원래 표기 (e.g. "골드 V", "Medium")
  url: string; // 원본 문제 URL
  tags: string[];
  themeId: string; // = themeSlug
  themeSlug: string;
  algorithmId: string; // = algorithmSlug
  algorithmSlug: string;
  hasSolution: boolean;
  solutionId: string; // solutions 컬렉션 doc ID, 없으면 ""
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// 개념 설명
// Collection: concepts / Doc ID: themeSlug
// ─────────────────────────────────────────
export interface Concept {
  id: string; // = themeSlug
  themeId: string; // = themeSlug
  themeSlug: string;
  title: string;
  content: string; // 마크다운 본문
  timeComplexity: string; // e.g. "O(nW)"
  spaceComplexity: string; // e.g. "O(W)"
  prerequisites: string[]; // theme slugs
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// 풀이
// Collection: solutions / Doc ID: "{platform}-{platformId}-{language}"
// ─────────────────────────────────────────
export type SolutionLanguage =
  | 'python'
  | 'cpp'
  | 'java'
  | 'javascript'
  | 'typescript'
  | 'rust'
  | 'go';

export interface Solution {
  id: string; // "{platform}-{platformId}-{language}"
  problemId: string; // Problem.id
  platform: Platform;
  platformId: string;
  language: SolutionLanguage;
  approach: string; // 마크다운 - 접근 방식
  code: string; // 풀이 코드
  explanation: string; // 마크다운 - 코드 설명
  timeComplexity: string;
  spaceComplexity: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// CS 카테고리
// Collection: cs-categories / Doc ID: slug
// ─────────────────────────────────────────
export type CSTopicDifficulty = '기초' | '중급' | '심화';

export interface CSCategory {
  id: string; // = slug (e.g. "operating-system")
  name: string; // 한국어 이름
  nameEn: string; // 영어 이름
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  order: number;
  topicCount: number; // denormalized
  questionCount: number; // denormalized
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// CS 토픽
// Collection: cs-topics / Doc ID: "{categorySlug}-{topicSlug}"
// ─────────────────────────────────────────
export interface CSTopic {
  id: string; // "{categorySlug}-{topicSlug}"
  categoryId: string; // = categorySlug
  categorySlug: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  difficulty: CSTopicDifficulty;
  content: string; // 마크다운 개념 설명 (나중에 채움)
  questionCount: number; // denormalized
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────
// CS 면접 질문
// Collection: cs-questions / Doc ID: auto
// ─────────────────────────────────────────
export interface CSQuestion {
  id: string;
  topicId: string; // CSTopic.id
  topicSlug: string;
  categoryId: string; // = categorySlug
  categorySlug: string;
  question: string;
  answer: string; // 마크다운
  difficulty: CSTopicDifficulty;
  tags: string[];
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
