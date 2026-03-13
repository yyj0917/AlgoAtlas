import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Layers, GitBranch, Binary, Search, Database, Hash, Type, Calculator, Code, Split } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const algorithmCategories = [
  {
    slug: "dp",
    name: "다이나믹 프로그래밍",
    englishName: "Dynamic Programming",
    description: "복잡한 문제를 부분 문제로 나누어 해결하는 최적화 기법입니다. 중복되는 부분 문제의 결과를 저장하여 효율적으로 전체 문제를 해결합니다.",
    icon: Layers,
    themeCount: 6,
    problemCount: 87,
    themes: [
      { slug: "knapsack", name: "배낭 문제", englishName: "Knapsack", difficulty: "중급", description: "제한된 용량에서 최대 가치를 선택하는 문제", problemCount: 8, tags: ["최적화", "DP테이블"] },
      { slug: "lis", name: "LIS (최장 증가 부분 수열)", englishName: "Longest Increasing Subsequence", difficulty: "중급", description: "가장 긴 증가하는 부분 수열을 찾는 문제", problemCount: 12, tags: ["이분탐색", "DP"] },
      { slug: "interval-dp", name: "구간 DP", englishName: "Interval DP", difficulty: "고급", description: "구간을 기준으로 점화식을 세우는 기법", problemCount: 10, tags: ["구간", "분할"] },
      { slug: "bitmask-dp", name: "비트마스크 DP", englishName: "Bitmask DP", difficulty: "고급", description: "비트마스크를 상태로 사용하는 DP", problemCount: 15, tags: ["비트연산", "상태압축"] },
      { slug: "tree-dp", name: "트리 DP", englishName: "Tree DP", difficulty: "고급", description: "트리 구조에서의 DP 적용", problemCount: 18, tags: ["트리", "DFS"] },
      { slug: "probability-dp", name: "확률 DP", englishName: "Probability DP", difficulty: "고급", description: "확률을 상태로 하는 DP 문제", problemCount: 6, tags: ["확률", "기댓값"] },
    ],
  },
  {
    slug: "graph",
    name: "그래프",
    englishName: "Graph",
    description: "정점과 간선으로 이루어진 자료구조입니다. BFS, DFS, 최단경로, 최소 신장 트리 등 다양한 알고리즘을 학습합니다.",
    icon: GitBranch,
    themeCount: 8,
    problemCount: 65,
    themes: [
      { slug: "bfs", name: "너비 우선 탐색", englishName: "BFS", difficulty: "입문", description: "큐를 이용한 그래프 탐색", problemCount: 15, tags: ["탐색", "큐"] },
      { slug: "dfs", name: "깊이 우선 탐색", englishName: "DFS", difficulty: "입문", description: "스택/재귀를 이용한 그래프 탐색", problemCount: 18, tags: ["탐색", "재귀"] },
      { slug: "dijkstra", name: "다익스트라", englishName: "Dijkstra", difficulty: "중급", description: "가중치 그래프의 최단 경로", problemCount: 12, tags: ["최단경로", "우선순위큐"] },
      { slug: "floyd", name: "플로이드-워셜", englishName: "Floyd-Warshall", difficulty: "중급", description: "모든 쌍 최단 경로", problemCount: 8, tags: ["최단경로", "완전탐색"] },
    ],
  },
  {
    slug: "sorting",
    name: "정렬",
    englishName: "Sorting",
    description: "데이터를 특정 순서로 배열하는 다양한 알고리즘을 학습합니다.",
    icon: Binary,
    themeCount: 6,
    problemCount: 42,
    themes: [
      { slug: "quick-sort", name: "퀵 정렬", englishName: "Quick Sort", difficulty: "중급", description: "분할 정복 기반 정렬", problemCount: 8, tags: ["분할정복", "피벗"] },
      { slug: "merge-sort", name: "병합 정렬", englishName: "Merge Sort", difficulty: "중급", description: "분할 후 병합하는 정렬", problemCount: 10, tags: ["분할정복", "안정정렬"] },
    ],
  },
]

const allCategories = [
  { slug: "dp", name: "다이나믹 프로그래밍" },
  { slug: "graph", name: "그래프" },
  { slug: "sorting", name: "정렬" },
  { slug: "search", name: "탐색" },
  { slug: "data-structure", name: "자료구조" },
  { slug: "greedy", name: "그리디" },
  { slug: "string", name: "문자열" },
  { slug: "math", name: "수학" },
  { slug: "implementation", name: "구현" },
  { slug: "divide-conquer", name: "분할정복" },
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "입문":
      return "bg-green-100 text-green-700 border-green-200"
    case "중급":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "고급":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export default async function AlgorithmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = algorithmCategories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const Icon = category.icon

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">홈</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/algorithms">알고리즘</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar - Desktop Only */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-20">
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground">알고리즘 목록</h3>
                <nav className="flex flex-col gap-1">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/algorithms/${cat.slug}`}
                      className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                        cat.slug === slug
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                      {category.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">{category.englishName}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">{category.description}</p>

                {/* Stats */}
                <div className="mt-4 flex gap-3">
                  <Badge variant="secondary">{category.themeCount} 테마</Badge>
                  <Badge variant="outline">{category.problemCount} 문제</Badge>
                </div>
              </div>

              {/* Theme List */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">테마 목록</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {category.themes.map((theme) => (
                    <Link key={theme.slug} href={`/themes/${theme.slug}`}>
                      <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{theme.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{theme.englishName}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${getDifficultyColor(theme.difficulty)} border text-xs`}
                            >
                              {theme.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="mb-3 line-clamp-2 text-sm">
                            {theme.description}
                          </CardDescription>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1">
                              {theme.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{theme.problemCount} 문제</span>
                              <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
