"use client"

import * as React from "react"
import Link from "next/link"
import { Search, X, Check, ChevronLeft, ChevronRight } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Sample data
const allProblems = [
  { id: 12865, title: "평범한 배낭", englishTitle: "Normal Knapsack", platform: "백준", difficulty: "실버 II", difficultyLevel: 2, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "knapsack", themeName: "배낭 문제", tags: ["DP", "배낭"], hasSolution: true },
  { id: 12920, title: "평범한 배낭 2", englishTitle: "", platform: "백준", difficulty: "골드 I", difficultyLevel: 4, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "knapsack", themeName: "배낭 문제", tags: ["DP", "배낭", "최적화"], hasSolution: true },
  { id: 1753, title: "최단경로", englishTitle: "Shortest Path", platform: "백준", difficulty: "골드 IV", difficultyLevel: 3, algorithm: "graph", algorithmName: "그래프", theme: "dijkstra", themeName: "다익스트라", tags: ["그래프", "최단경로"], hasSolution: true },
  { id: 1260, title: "DFS와 BFS", englishTitle: "DFS and BFS", platform: "백준", difficulty: "실버 II", difficultyLevel: 2, algorithm: "graph", algorithmName: "그래프", theme: "bfs", themeName: "BFS", tags: ["그래프", "탐색"], hasSolution: true },
  { id: 2750, title: "수 정렬하기", englishTitle: "Sort Numbers", platform: "백준", difficulty: "브론즈 I", difficultyLevel: 1, algorithm: "sorting", algorithmName: "정렬", theme: "basic-sort", themeName: "기본 정렬", tags: ["정렬"], hasSolution: false },
  { id: 494, title: "Target Sum", englishTitle: "Target Sum", platform: "LeetCode", difficulty: "Medium", difficultyLevel: 3, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "knapsack", themeName: "배낭 문제", tags: ["DP", "DFS"], hasSolution: true },
  { id: 416, title: "Partition Equal Subset Sum", englishTitle: "", platform: "LeetCode", difficulty: "Medium", difficultyLevel: 3, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "knapsack", themeName: "배낭 문제", tags: ["DP", "배낭"], hasSolution: false },
  { id: 43105, title: "정수 삼각형", englishTitle: "Integer Triangle", platform: "프로그래머스", difficulty: "Level 3", difficultyLevel: 3, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "basic-dp", themeName: "기본 DP", tags: ["DP"], hasSolution: true },
  { id: 11404, title: "플로이드", englishTitle: "Floyd", platform: "백준", difficulty: "골드 IV", difficultyLevel: 3, algorithm: "graph", algorithmName: "그래프", theme: "floyd", themeName: "플로이드-워셜", tags: ["그래프", "최단경로"], hasSolution: true },
  { id: 11053, title: "가장 긴 증가하는 부분 수열", englishTitle: "LIS", platform: "백준", difficulty: "실버 II", difficultyLevel: 2, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "lis", themeName: "LIS", tags: ["DP", "이분탐색"], hasSolution: true },
  { id: 1149, title: "RGB거리", englishTitle: "RGB Street", platform: "백준", difficulty: "실버 I", difficultyLevel: 2, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "basic-dp", themeName: "기본 DP", tags: ["DP"], hasSolution: true },
  { id: 1932, title: "정수 삼각형", englishTitle: "Integer Triangle", platform: "백준", difficulty: "실버 I", difficultyLevel: 2, algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "basic-dp", themeName: "기본 DP", tags: ["DP"], hasSolution: true },
]

const algorithms = [
  { slug: "dp", name: "다이나믹 프로그래밍" },
  { slug: "graph", name: "그래프" },
  { slug: "sorting", name: "정렬" },
  { slug: "search", name: "탐색" },
  { slug: "data-structure", name: "자료구조" },
  { slug: "greedy", name: "그리디" },
]

const themesByAlgorithm: Record<string, { slug: string; name: string }[]> = {
  dp: [
    { slug: "knapsack", name: "배낭 문제" },
    { slug: "lis", name: "LIS" },
    { slug: "basic-dp", name: "기본 DP" },
  ],
  graph: [
    { slug: "bfs", name: "BFS" },
    { slug: "dfs", name: "DFS" },
    { slug: "dijkstra", name: "다익스트라" },
    { slug: "floyd", name: "플로이드-워셜" },
  ],
  sorting: [
    { slug: "basic-sort", name: "기본 정렬" },
  ],
}

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
  if (difficulty.includes("브론즈") || difficulty === "Level 1" || difficulty === "Easy") {
    return "bg-amber-100 text-amber-700 border-amber-200"
  }
  if (difficulty.includes("실버") || difficulty === "Level 2") {
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

const ITEMS_PER_PAGE = 10

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [algorithmFilter, setAlgorithmFilter] = React.useState("all")
  const [themeFilter, setThemeFilter] = React.useState("all")
  const [platformFilter, setPlatformFilter] = React.useState("all")
  const [difficultyFilter, setDifficultyFilter] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)

  // Get available themes based on selected algorithm
  const availableThemes = algorithmFilter !== "all" ? themesByAlgorithm[algorithmFilter] || [] : []

  // Reset theme filter when algorithm changes
  React.useEffect(() => {
    setThemeFilter("all")
  }, [algorithmFilter])

  // Filter problems
  const filteredProblems = allProblems.filter((problem) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = problem.title.toLowerCase().includes(query)
      const matchesEnglishTitle = problem.englishTitle.toLowerCase().includes(query)
      const matchesTags = problem.tags.some((tag) => tag.toLowerCase().includes(query))
      if (!matchesTitle && !matchesEnglishTitle && !matchesTags) return false
    }

    // Algorithm filter
    if (algorithmFilter !== "all" && problem.algorithm !== algorithmFilter) return false

    // Theme filter
    if (themeFilter !== "all" && problem.theme !== themeFilter) return false

    // Platform filter
    if (platformFilter !== "all" && problem.platform !== platformFilter) return false

    // Difficulty filter
    if (difficultyFilter !== "all" && problem.difficultyLevel.toString() !== difficultyFilter) return false

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE)
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, algorithmFilter, themeFilter, platformFilter, difficultyFilter])

  // Active filters
  const activeFilters = [
    algorithmFilter !== "all" && { key: "algorithm", label: algorithms.find((a) => a.slug === algorithmFilter)?.name },
    themeFilter !== "all" && { key: "theme", label: availableThemes.find((t) => t.slug === themeFilter)?.name },
    platformFilter !== "all" && { key: "platform", label: platformFilter },
    difficultyFilter !== "all" && { key: "difficulty", label: `난이도 ${difficultyFilter}` },
  ].filter(Boolean) as { key: string; label: string }[]

  const clearFilter = (key: string) => {
    switch (key) {
      case "algorithm":
        setAlgorithmFilter("all")
        break
      case "theme":
        setThemeFilter("all")
        break
      case "platform":
        setPlatformFilter("all")
        break
      case "difficulty":
        setDifficultyFilter("all")
        break
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">문제 목록</h1>
            <p className="mt-1 text-muted-foreground">
              전체 {allProblems.length}개의 문제
            </p>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="문제명, 태그로 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="알고리즘" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 알고리즘</SelectItem>
                {algorithms.map((alg) => (
                  <SelectItem key={alg.slug} value={alg.slug}>
                    {alg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={themeFilter}
              onValueChange={setThemeFilter}
              disabled={algorithmFilter === "all"}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="테마" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 테마</SelectItem>
                {availableThemes.map((theme) => (
                  <SelectItem key={theme.slug} value={theme.slug}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              value={platformFilter}
              onValueChange={(value) => setPlatformFilter(value || "all")}
              className="flex-wrap"
            >
              <ToggleGroupItem value="all" className="text-xs">전체</ToggleGroupItem>
              <ToggleGroupItem value="백준" className="text-xs">백준</ToggleGroupItem>
              <ToggleGroupItem value="프로그래머스" className="text-xs">프로그래머스</ToggleGroupItem>
              <ToggleGroupItem value="LeetCode" className="text-xs">LeetCode</ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
              type="single"
              value={difficultyFilter}
              onValueChange={(value) => setDifficultyFilter(value || "all")}
            >
              <ToggleGroupItem value="all" className="text-xs">전체</ToggleGroupItem>
              <ToggleGroupItem value="1" className="text-xs">1</ToggleGroupItem>
              <ToggleGroupItem value="2" className="text-xs">2</ToggleGroupItem>
              <ToggleGroupItem value="3" className="text-xs">3</ToggleGroupItem>
              <ToggleGroupItem value="4" className="text-xs">4</ToggleGroupItem>
              <ToggleGroupItem value="5" className="text-xs">5</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  className="cursor-pointer gap-1 pr-1"
                  onClick={() => clearFilter(filter.key)}
                >
                  {filter.label}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-muted-foreground"
                onClick={() => {
                  setAlgorithmFilter("all")
                  setThemeFilter("all")
                  setPlatformFilter("all")
                  setDifficultyFilter("all")
                }}
              >
                전체 초기화
              </Button>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              검색 결과 {filteredProblems.length}개
            </p>
          </div>

          {/* Problem List */}
          <div className="space-y-3">
            {paginatedProblems.map((problem) => (
              <Link
                key={`${problem.platform}-${problem.id}`}
                href={`/problems/${problem.id}`}
                className="block"
              >
                <div className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${getPlatformColor(problem.platform)} shrink-0 border`}
                      >
                        {problem.platform}
                      </Badge>
                      <span className="font-medium">{problem.title}</span>
                      {problem.englishTitle && (
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                          {problem.englishTitle}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {problem.algorithmName} {">"} {problem.themeName}
                      </Badge>
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${getDifficultyColor(problem.difficulty)} border`}
                    >
                      {problem.difficulty}
                    </Badge>
                    {problem.hasSolution && (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Check className="h-3 w-3" />
                        풀이
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">조건에 맞는 문제가 없습니다.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setAlgorithmFilter("all")
                  setThemeFilter("all")
                  setPlatformFilter("all")
                  setDifficultyFilter("all")
                }}
              >
                필터 초기화
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
