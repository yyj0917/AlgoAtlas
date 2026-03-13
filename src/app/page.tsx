'use client';

import Link from 'next/link';
import {
  Search,
  ArrowRight,
  Database,
  GitBranch,
  Binary,
  Layers,
  Hash,
  Type,
  Calculator,
  Code,
  Split,
  Cpu,
  Network,
  HardDrive,
  Server,
  Cog,
  Brain,
  Monitor,
  Shield,
  Cloud,
  Boxes,
} from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const algorithmCategories = [
  {
    slug: 'dp',
    name: '다이나믹 프로그래밍',
    englishName: 'Dynamic Programming',
    description: '복잡한 문제를 부분 문제로 나누어 해결하는 최적화 기법',
    icon: Layers,
    themeCount: 12,
    problemCount: 87,
  },
  {
    slug: 'graph',
    name: '그래프',
    englishName: 'Graph',
    description: '정점과 간선으로 이루어진 자료구조와 탐색 알고리즘',
    icon: GitBranch,
    themeCount: 8,
    problemCount: 65,
  },
  {
    slug: 'sorting',
    name: '정렬',
    englishName: 'Sorting',
    description: '데이터를 특정 순서로 배열하는 다양한 알고리즘',
    icon: Binary,
    themeCount: 6,
    problemCount: 42,
  },
  {
    slug: 'search',
    name: '탐색',
    englishName: 'Search',
    description: '이분 탐색, 완전 탐색 등 데이터 검색 기법',
    icon: Search,
    themeCount: 5,
    problemCount: 38,
  },
  {
    slug: 'data-structure',
    name: '자료구조',
    englishName: 'Data Structure',
    description: '스택, 큐, 힙, 트리 등 기본 자료구조 활용법',
    icon: Database,
    themeCount: 10,
    problemCount: 72,
  },
  {
    slug: 'greedy',
    name: '그리디',
    englishName: 'Greedy',
    description: '각 단계에서 최선의 선택을 하는 탐욕적 알고리즘',
    icon: Hash,
    themeCount: 4,
    problemCount: 31,
  },
  {
    slug: 'string',
    name: '문자열',
    englishName: 'String',
    description: '문자열 처리, 패턴 매칭, 파싱 알고리즘',
    icon: Type,
    themeCount: 7,
    problemCount: 45,
  },
  {
    slug: 'math',
    name: '수학',
    englishName: 'Math',
    description: '정수론, 조합론, 기하학 기반 문제 해결',
    icon: Calculator,
    themeCount: 9,
    problemCount: 58,
  },
  {
    slug: 'implementation',
    name: '구현',
    englishName: 'Implementation',
    description: '시뮬레이션, 복잡한 조건 처리 문제',
    icon: Code,
    themeCount: 5,
    problemCount: 40,
  },
  {
    slug: 'divide-conquer',
    name: '분할정복',
    englishName: 'Divide & Conquer',
    description: '문제를 분할하여 정복 후 병합하는 기법',
    icon: Split,
    themeCount: 4,
    problemCount: 28,
  },
];

const csCategories = [
  {
    slug: 'operating-system',
    name: '운영체제',
    englishName: 'Operating System',
    description: '프로세스, 메모리, 스케줄링 등 OS의 핵심 개념',
    icon: Cpu,
    topicCount: 15,
    questionCount: 120,
  },
  {
    slug: 'network',
    name: '네트워크',
    englishName: 'Network',
    description: 'TCP/IP, HTTP, DNS 등 네트워크 프로토콜과 통신',
    icon: Network,
    topicCount: 12,
    questionCount: 95,
  },
  {
    slug: 'database',
    name: '데이터베이스',
    englishName: 'Database',
    description: 'SQL, 트랜잭션, 인덱싱 등 DB 설계와 최적화',
    icon: Database,
    topicCount: 10,
    questionCount: 85,
  },
  {
    slug: 'data-structure',
    name: '자료구조',
    englishName: 'Data Structure',
    description: '배열, 링크드 리스트, 트리, 그래프 등 기본 자료구조',
    icon: Boxes,
    topicCount: 14,
    questionCount: 110,
  },
  {
    slug: 'computer-architecture',
    name: '컴퓨터 구조',
    englishName: 'Computer Architecture',
    description: 'CPU, 메모리 계층, 캐시, 파이프라이닝',
    icon: HardDrive,
    topicCount: 8,
    questionCount: 60,
  },
  {
    slug: 'compiler',
    name: '컴파일러',
    englishName: 'Compiler',
    description: '렉싱, 파싱, AST, 코드 생성 등 컴파일 과정',
    icon: Cog,
    topicCount: 7,
    questionCount: 45,
  },
  {
    slug: 'machine-learning',
    name: '머신러닝',
    englishName: 'Machine Learning',
    description: '지도/비지도 학습, 딥러닝, 모델 최적화',
    icon: Brain,
    topicCount: 11,
    questionCount: 90,
  },
  {
    slug: 'system-design',
    name: '시스템 설계',
    englishName: 'System Design',
    description: '대규모 시스템 설계, 확장성, 가용성',
    icon: Server,
    topicCount: 9,
    questionCount: 70,
  },
  {
    slug: 'security',
    name: '보안',
    englishName: 'Security',
    description: '암호화, 인증, 취약점 분석 등 보안 기초',
    icon: Shield,
    topicCount: 8,
    questionCount: 55,
  },
  {
    slug: 'distributed-system',
    name: '분산 시스템',
    englishName: 'Distributed System',
    description: 'CAP 정리, 합의 알고리즘, 분산 트랜잭션',
    icon: Cloud,
    topicCount: 6,
    questionCount: 48,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="container relative mx-auto px-4 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              {/* Platform badges */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500" />
                  백준
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                  프로그래머스
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-orange-500" />
                  LeetCode
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-purple-500" />
                  CS 면접
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                알고리즘 & CS 지식,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  체계적으로 정리하다
                </span>
              </h1>
              <p className="mt-4 text-pretty text-lg text-muted-foreground lg:text-xl">
                코딩 테스트 문제 풀이부터 CS 핵심 개념까지,
                <br className="hidden sm:inline" />
                개발자 면접 준비를 한 곳에서 완성하세요.
              </p>

              {/* Stats */}
              <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    500+
                  </span>
                  <span className="text-muted-foreground">문제 풀이</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    70+
                  </span>
                  <span className="text-muted-foreground">알고리즘 테마</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    95+
                  </span>
                  <span className="text-muted-foreground">CS 토픽</span>
                </div>
              </div>

              {/* Hero Search Bar */}
              <div className="mt-8">
                <Link href="/search" className="block">
                  <div className="relative mx-auto max-w-xl">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      readOnly
                      placeholder="알고리즘, CS 개념, 문제를 검색하세요..."
                      className="h-12 cursor-pointer rounded-full border-muted-foreground/20 bg-background pl-12 text-base shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                    />
                    <kbd className="pointer-events-none absolute right-4 top-1/2 hidden h-6 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid with Tabs */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="algorithm" className="w-full">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  카테고리
                </h2>
                <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                  <TabsTrigger value="algorithm" className="gap-2">
                    <Layers className="h-4 w-4" />
                    알고리즘
                  </TabsTrigger>
                  <TabsTrigger value="cs" className="gap-2">
                    <Monitor className="h-4 w-4" />
                    CS 지식
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="algorithm" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {algorithmCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.slug}
                        href={`/algorithms/${category.slug}`}
                      >
                        <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <CardTitle className="mt-3 text-lg">
                              {category.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {category.englishName}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-3 line-clamp-2">
                              {category.description}
                            </CardDescription>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {category.themeCount} 테마
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {category.problemCount} 문제
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="cs" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {csCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.slug}
                        href={`/cs/${category.slug}`}
                      >
                        <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <CardTitle className="mt-3 text-lg">
                              {category.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {category.englishName}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-3 line-clamp-2">
                              {category.description}
                            </CardDescription>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {category.topicCount} 토픽
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {category.questionCount} 문항
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
