import Link from "next/link"
import { ArrowRight, Database, GitBranch, Binary, Search, Layers, Hash, Type, Calculator, Code, Split } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const algorithmCategories = [
  {
    slug: "dp",
    name: "다이나믹 프로그래밍",
    englishName: "Dynamic Programming",
    description: "복잡한 문제를 부분 문제로 나누어 해결하는 최적화 기법",
    icon: Layers,
    themeCount: 12,
    problemCount: 87,
  },
  {
    slug: "graph",
    name: "그래프",
    englishName: "Graph",
    description: "정점과 간선으로 이루어진 자료구조와 탐색 알고리즘",
    icon: GitBranch,
    themeCount: 8,
    problemCount: 65,
  },
  {
    slug: "sorting",
    name: "정렬",
    englishName: "Sorting",
    description: "데이터를 특정 순서로 배열하는 다양한 알고리즘",
    icon: Binary,
    themeCount: 6,
    problemCount: 42,
  },
  {
    slug: "search",
    name: "탐색",
    englishName: "Search",
    description: "이분 탐색, 완전 탐색 등 데이터 검색 기법",
    icon: Search,
    themeCount: 5,
    problemCount: 38,
  },
  {
    slug: "data-structure",
    name: "자료구조",
    englishName: "Data Structure",
    description: "스택, 큐, 힙, 트리 등 기본 자료구조 활용법",
    icon: Database,
    themeCount: 10,
    problemCount: 72,
  },
  {
    slug: "greedy",
    name: "그리디",
    englishName: "Greedy",
    description: "각 단계에서 최선의 선택을 하는 탐욕적 알고리즘",
    icon: Hash,
    themeCount: 4,
    problemCount: 31,
  },
  {
    slug: "string",
    name: "문자열",
    englishName: "String",
    description: "문자열 처리, 패턴 매칭, 파싱 알고리즘",
    icon: Type,
    themeCount: 7,
    problemCount: 45,
  },
  {
    slug: "math",
    name: "수학",
    englishName: "Math",
    description: "정수론, 조합론, 기하학 기반 문제 해결",
    icon: Calculator,
    themeCount: 9,
    problemCount: 58,
  },
  {
    slug: "implementation",
    name: "구현",
    englishName: "Implementation",
    description: "시뮬레이션, 복잡한 조건 처리 문제",
    icon: Code,
    themeCount: 5,
    problemCount: 40,
  },
  {
    slug: "divide-conquer",
    name: "분할정복",
    englishName: "Divide & Conquer",
    description: "문제를 분할하여 정복 후 병합하는 기법",
    icon: Split,
    themeCount: 4,
    problemCount: 28,
  },
]

export default function AlgorithmsPage() {
  const totalThemes = algorithmCategories.reduce((acc, cat) => acc + cat.themeCount, 0)
  const totalProblems = algorithmCategories.reduce((acc, cat) => acc + cat.problemCount, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">알고리즘</h1>
            <p className="mt-1 text-muted-foreground">
              {algorithmCategories.length}개 카테고리 · {totalThemes}개 테마 · {totalProblems}개 문제
            </p>
          </div>

          {/* Algorithm Categories Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {algorithmCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link key={category.slug} href={`/algorithms/${category.slug}`}>
                  <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <CardTitle className="mt-3 text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.englishName}</p>
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
              )
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
