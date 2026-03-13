"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, ArrowRight, FileQuestion, Layers, BookOpen, FileCode, Monitor, GraduationCap } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const algorithms = [
  { slug: "dp", name: "다이나믹 프로그래밍", englishName: "Dynamic Programming", themeCount: 6, problemCount: 87 },
  { slug: "graph", name: "그래프", englishName: "Graph", themeCount: 8, problemCount: 65 },
  { slug: "sorting", name: "정렬", englishName: "Sorting", themeCount: 6, problemCount: 42 },
  { slug: "greedy", name: "그리디", englishName: "Greedy", themeCount: 4, problemCount: 31 },
  { slug: "data-structure", name: "자료구조", englishName: "Data Structure", themeCount: 10, problemCount: 72 },
]

const themes = [
  { slug: "knapsack", name: "배낭 문제", englishName: "Knapsack", algorithm: "다이나믹 프로그래밍", problemCount: 8 },
  { slug: "lis", name: "LIS (최장 증가 부분 수열)", englishName: "Longest Increasing Subsequence", algorithm: "다이나믹 프로그래밍", problemCount: 12 },
  { slug: "bfs", name: "너비 우선 탐색", englishName: "BFS", algorithm: "그래프", problemCount: 15 },
  { slug: "dijkstra", name: "다익스트라", englishName: "Dijkstra", algorithm: "그래프", problemCount: 12 },
  { slug: "quick-sort", name: "퀵 정렬", englishName: "Quick Sort", algorithm: "정렬", problemCount: 8 },
]

const problems = [
  { id: 12865, title: "평범한 배낭", platform: "백준", difficulty: "실버 II", theme: "배낭 문제" },
  { id: 1753, title: "최단경로", platform: "백준", difficulty: "골드 IV", theme: "다익스트라" },
  { id: 1260, title: "DFS와 BFS", platform: "백준", difficulty: "실버 II", theme: "BFS" },
  { id: 11053, title: "가장 긴 증가하는 부분 수열", platform: "백준", difficulty: "실버 II", theme: "LIS" },
  { id: 494, title: "Target Sum", platform: "LeetCode", difficulty: "Medium", theme: "배낭 문제" },
  { id: 11404, title: "플로이드", platform: "백준", difficulty: "골드 IV", theme: "플로이드-워셜" },
]

const csCategories = [
  { slug: "operating-system", name: "운영체제", englishName: "Operating System", topicCount: 7, questionCount: 83 },
  { slug: "network", name: "네트워크", englishName: "Network", topicCount: 6, questionCount: 72 },
  { slug: "database", name: "데이터베이스", englishName: "Database", topicCount: 6, questionCount: 70 },
  { slug: "data-structure", name: "자료구조", englishName: "Data Structure", topicCount: 6, questionCount: 75 },
  { slug: "machine-learning", name: "머신러닝", englishName: "Machine Learning", topicCount: 5, questionCount: 75 },
]

const csTopics = [
  { slug: "process-thread", name: "프로세스와 스레드", englishName: "Process & Thread", category: "운영체제", categorySlug: "operating-system", questionCount: 15 },
  { slug: "tcp-ip", name: "TCP/IP", englishName: "TCP/IP", category: "네트워크", categorySlug: "network", questionCount: 15 },
  { slug: "transaction", name: "트랜잭션", englishName: "Transaction", category: "데이터베이스", categorySlug: "database", questionCount: 12 },
  { slug: "tree", name: "트리", englishName: "Tree", category: "자료구조", categorySlug: "data-structure", questionCount: 18 },
  { slug: "neural-network", name: "신경망", englishName: "Neural Network", category: "머신러닝", categorySlug: "machine-learning", questionCount: 15 },
  { slug: "deadlock", name: "데드락", englishName: "Deadlock", category: "운영체제", categorySlug: "operating-system", questionCount: 10 },
]

function getPlatformColor(platform: string) {
  switch (platform) {
    case "백준":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "프로그래머스":
      return "bg-green-100 text-green-700 border-green-200"
    case "LeetCode":
      return "bg-orange-100 text-orange-700 border-orange-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

function getDifficultyColor(difficulty: string) {
  if (difficulty.includes("실버") || difficulty === "Level 2" || difficulty === "Easy") {
    return "bg-gray-100 text-gray-700 border-gray-200"
  }
  if (difficulty.includes("골드") || difficulty === "Level 3" || difficulty === "Medium") {
    return "bg-yellow-100 text-yellow-700 border-yellow-200"
  }
  if (difficulty.includes("플래") || difficulty === "Level 4" || difficulty === "Hard") {
    return "bg-red-100 text-red-700 border-red-200"
  }
  return "bg-green-100 text-green-700 border-green-200"
}

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = React.useState(initialQuery)
  const [searchQuery, setSearchQuery] = React.useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(query)
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  // Filter results based on search query
  const filteredAlgorithms = searchQuery
    ? algorithms.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.englishName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const filteredThemes = searchQuery
    ? themes.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.englishName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const filteredProblems = searchQuery
    ? problems.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.theme.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const filteredCSCategories = searchQuery
    ? csCategories.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.englishName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const filteredCSTopics = searchQuery
    ? csTopics.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const totalResults = filteredAlgorithms.length + filteredThemes.length + filteredProblems.length + filteredCSCategories.length + filteredCSTopics.length
  const hasResults = totalResults > 0

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Search Input */}
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="알고리즘, 테마, 문제를 검색하세요..."
                  className="h-14 pl-12 text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </form>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mx-auto mt-8 max-w-3xl">
              {/* Results Count */}
              <p className="mb-6 text-muted-foreground">
                {hasResults
                  ? `${totalResults}개의 검색 결과`
                  : "검색 결과가 없습니다."}
              </p>

              {hasResults ? (
                <div className="space-y-8">
                  {/* Algorithms Section */}
                  {filteredAlgorithms.length > 0 && (
                    <section>
                      <div className="mb-4 flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">알고리즘</h2>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {filteredAlgorithms.slice(0, 4).map((algorithm) => (
                          <Link key={algorithm.slug} href={`/algorithms/${algorithm.slug}`}>
                            <Card className="transition-colors hover:bg-accent/50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{algorithm.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{algorithm.englishName}</p>
                              </CardHeader>
                              <CardContent>
                                <div className="flex gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {algorithm.themeCount} 테마
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {algorithm.problemCount} 문제
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                      {filteredAlgorithms.length > 4 && (
                        <Button variant="link" className="mt-2 px-0" asChild>
                          <Link href={`/algorithms?q=${encodeURIComponent(searchQuery)}`}>
                            더 보기 ({filteredAlgorithms.length - 4}개)
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </section>
                  )}

                  {/* Themes Section */}
                  {filteredThemes.length > 0 && (
                    <section>
                      <div className="mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">테마</h2>
                      </div>
                      <div className="space-y-2">
                        {filteredThemes.slice(0, 5).map((theme) => (
                          <Link key={theme.slug} href={`/themes/${theme.slug}`}>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50">
                              <div>
                                <span className="font-medium">{theme.name}</span>
                                <span className="ml-2 text-sm text-muted-foreground">{theme.englishName}</span>
                                <div className="mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {theme.algorithm}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {theme.problemCount} 문제
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {filteredThemes.length > 5 && (
                        <Button variant="link" className="mt-2 px-0" asChild>
                          <Link href={`/themes?q=${encodeURIComponent(searchQuery)}`}>
                            더 보기 ({filteredThemes.length - 5}개)
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </section>
                  )}

                  {/* Problems Section */}
                  {filteredProblems.length > 0 && (
                    <section>
                      <div className="mb-4 flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">문제</h2>
                      </div>
                      <div className="space-y-2">
                        {filteredProblems.slice(0, 5).map((problem) => (
                          <Link key={`${problem.platform}-${problem.id}`} href={`/problems/${problem.id}`}>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50">
                              <div className="flex items-center gap-3">
                                <Badge
                                  variant="outline"
                                  className={`${getPlatformColor(problem.platform)} shrink-0 border`}
                                >
                                  {problem.platform}
                                </Badge>
                                <div>
                                  <span className="font-medium">{problem.title}</span>
                                  <div className="mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                      {problem.theme}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`${getDifficultyColor(problem.difficulty)} border`}
                                >
                                  {problem.difficulty}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {filteredProblems.length > 5 && (
                        <Button variant="link" className="mt-2 px-0" asChild>
                          <Link href={`/problems?q=${encodeURIComponent(searchQuery)}`}>
                            더 보기 ({filteredProblems.length - 5}개)
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </section>
                  )}

                  {/* CS Categories Section */}
                  {filteredCSCategories.length > 0 && (
                    <section>
                      <div className="mb-4 flex items-center gap-2">
                        <Monitor className="h-5 w-5 text-secondary" />
                        <h2 className="text-lg font-semibold">CS 카테고리</h2>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {filteredCSCategories.slice(0, 4).map((category) => (
                          <Link key={category.slug} href={`/cs/${category.slug}`}>
                            <Card className="transition-colors hover:bg-accent/50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{category.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{category.englishName}</p>
                              </CardHeader>
                              <CardContent>
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
                        ))}
                      </div>
                      {filteredCSCategories.length > 4 && (
                        <Button variant="link" className="mt-2 px-0" asChild>
                          <Link href={`/cs?q=${encodeURIComponent(searchQuery)}`}>
                            더 보기 ({filteredCSCategories.length - 4}개)
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </section>
                  )}

                  {/* CS Topics Section */}
                  {filteredCSTopics.length > 0 && (
                    <section>
                      <div className="mb-4 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-secondary" />
                        <h2 className="text-lg font-semibold">CS 토픽</h2>
                      </div>
                      <div className="space-y-2">
                        {filteredCSTopics.slice(0, 5).map((topic) => (
                          <Link key={topic.slug} href={`/cs/${topic.categorySlug}/${topic.slug}`}>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50">
                              <div>
                                <span className="font-medium">{topic.name}</span>
                                <span className="ml-2 text-sm text-muted-foreground">{topic.englishName}</span>
                                <div className="mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {topic.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {topic.questionCount} 문항
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {filteredCSTopics.length > 5 && (
                        <Button variant="link" className="mt-2 px-0" asChild>
                          <Link href={`/cs?q=${encodeURIComponent(searchQuery)}`}>
                            더 보기 ({filteredCSTopics.length - 5}개)
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </section>
                  )}
                </div>
              ) : (
                /* Empty State */
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <FileQuestion className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">검색 결과가 없습니다</h3>
                  <p className="mt-2 text-muted-foreground">
                    다른 키워드로 검색해보세요.
                  </p>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">추천 검색어</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      {["DP", "그래프", "운영체제", "네트워크", "데이터베이스"].map((keyword) => (
                        <Button
                          key={keyword}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setQuery(keyword)
                            setSearchQuery(keyword)
                            router.push(`/search?q=${encodeURIComponent(keyword)}`)
                          }}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Initial State (no search query) */}
          {!searchQuery && (
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">통합 검색</h2>
              <p className="mt-2 text-muted-foreground">
                알고리즘, CS 지식, 문제를 한 번에 검색하세요.
              </p>
              <div className="mt-8">
                <p className="text-sm text-muted-foreground">인기 검색어</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {["다이나믹 프로그래밍", "그래프", "배낭 문제", "BFS", "다익스트라"].map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(keyword)
                        setSearchQuery(keyword)
                        router.push(`/search?q=${encodeURIComponent(keyword)}`)
                      }}
                    >
                      {keyword}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
