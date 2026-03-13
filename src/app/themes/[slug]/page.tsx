"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink, MessageSquare, Filter, Copy, Check } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample theme data
const themeData = {
  slug: "knapsack",
  name: "배낭 문제",
  englishName: "Knapsack Problem",
  parentAlgorithm: { slug: "dp", name: "다이나믹 프로그래밍" },
  difficulty: "중급",
  description: "제한된 용량의 배낭에 최대 가치의 물건을 담는 최적화 문제입니다.",
  content: `
## 개요

배낭 문제(Knapsack Problem)는 조합 최적화의 대표적인 문제입니다. 무게 제한이 있는 배낭에 가치가 다른 물건들을 담을 때, 최대 가치를 구하는 문제입니다.

## 핵심 아이디어

1. **상태 정의**: \`dp[i][w]\` = i번째 물건까지 고려했을 때, 무게 w 이하로 담을 수 있는 최대 가치
2. **선택**: 각 물건에 대해 담거나(포함) 담지 않거나(제외) 선택
3. **점화식**: 이전 상태의 값을 활용하여 현재 상태 계산

## 점화식

\`\`\`
dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
\`\`\`

- **물건을 담지 않는 경우**: dp[i-1][w]
- **물건을 담는 경우**: dp[i-1][w-weight[i]] + value[i]

## 시간/공간 복잡도

- **시간 복잡도**: O(N × W) - N은 물건 수, W는 배낭 용량
- **공간 복잡도**: O(N × W) 또는 O(W) (1차원 배열 최적화 시)

## 구현 팁

1. 1차원 배열로 공간 최적화 가능 (역순 순회 필요)
2. 물건의 개수가 제한되어 있으면 0/1 배낭, 무한하면 무한 배낭
3. 실수 처리 시 부동소수점 오차 주의
`,
  problems: [
    { id: 12865, title: "평범한 배낭", platform: "백준", difficulty: "실버 II", difficultyLevel: 2, tags: ["DP", "배낭"], hasSolution: true },
    { id: 12920, title: "평범한 배낭 2", platform: "백준", difficulty: "골드 I", difficultyLevel: 4, tags: ["DP", "배낭", "최적화"], hasSolution: true },
    { id: 43105, title: "정수 삼각형", platform: "프로그래머스", difficulty: "Level 3", difficultyLevel: 3, tags: ["DP"], hasSolution: false },
    { id: 494, title: "Target Sum", platform: "LeetCode", difficulty: "Medium", difficultyLevel: 3, tags: ["DP", "DFS"], hasSolution: true },
    { id: 416, title: "Partition Equal Subset Sum", platform: "LeetCode", difficulty: "Medium", difficultyLevel: 3, tags: ["DP", "배낭"], hasSolution: false },
    { id: 7579, title: "앱", platform: "백준", difficulty: "골드 III", difficultyLevel: 4, tags: ["DP", "배낭"], hasSolution: true },
    { id: 1450, title: "냅색문제", platform: "백준", difficulty: "골드 I", difficultyLevel: 4, tags: ["MITM", "이분탐색"], hasSolution: false },
    { id: 2629, title: "양팔저울", platform: "백준", difficulty: "골드 III", difficultyLevel: 4, tags: ["DP", "배낭"], hasSolution: true },
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

export default function ThemeDetailPage() {
  const [platformFilter, setPlatformFilter] = React.useState("all")
  const [difficultyFilter, setDifficultyFilter] = React.useState("all")

  const filteredProblems = themeData.problems.filter((problem) => {
    if (platformFilter !== "all" && problem.platform !== platformFilter) return false
    if (difficultyFilter !== "all" && problem.difficultyLevel.toString() !== difficultyFilter) return false
    return true
  })

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
                <BreadcrumbLink href={`/algorithms/${themeData.parentAlgorithm.slug}`}>
                  {themeData.parentAlgorithm.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{themeData.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {themeData.name}
              </h1>
              <span className="text-lg text-muted-foreground">{themeData.englishName}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{themeData.parentAlgorithm.name}</Badge>
              <Badge
                variant="outline"
                className={`${getDifficultyColor(themeData.difficulty)} border`}
              >
                {themeData.difficulty}
              </Badge>
            </div>
            <p className="mt-3 text-muted-foreground">{themeData.description}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="concept" className="space-y-6">
            <TabsList>
              <TabsTrigger value="concept">개념 설명</TabsTrigger>
              <TabsTrigger value="problems">문제 목록</TabsTrigger>
            </TabsList>

            {/* Concept Tab */}
            <TabsContent value="concept" className="space-y-8">
              {/* Markdown Content */}
              <div className="prose prose-gray max-w-none">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold">개요</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      배낭 문제(Knapsack Problem)는 조합 최적화의 대표적인 문제입니다.
                      무게 제한이 있는 배낭에 가치가 다른 물건들을 담을 때, 최대 가치를 구하는 문제입니다.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold">핵심 아이디어</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li><strong className="text-foreground">상태 정의</strong>: dp[i][w] = i번째 물건까지 고려했을 때, 무게 w 이하로 담을 수 있는 최대 가치</li>
                      <li><strong className="text-foreground">선택</strong>: 각 물건에 대해 담거나(포함) 담지 않거나(제외) 선택</li>
                      <li><strong className="text-foreground">점화식</strong>: 이전 상태의 값을 활용하여 현재 상태 계산</li>
                    </ol>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold">점화식</h2>
                    <div className="relative rounded-lg bg-zinc-950 p-4">
                      <code className="font-mono text-sm text-zinc-100">
                        dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
                      </code>
                    </div>
                    <ul className="mt-3 list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong className="text-foreground">물건을 담지 않는 경우</strong>: dp[i-1][w]</li>
                      <li><strong className="text-foreground">물건을 담는 경우</strong>: dp[i-1][w-weight[i]] + value[i]</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold">시간/공간 복잡도</h2>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong className="text-foreground">시간 복잡도</strong>: O(N × W) - N은 물건 수, W는 배낭 용량</li>
                      <li><strong className="text-foreground">공간 복잡도</strong>: O(N × W) 또는 O(W) (1차원 배열 최적화 시)</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold">구현 예시</h2>
                    <CodeTabs />
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold">구현 팁</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>1차원 배열로 공간 최적화 가능 (역순 순회 필요)</li>
                      <li>물건의 개수가 제한되어 있으면 0/1 배낭, 무한하면 무한 배낭</li>
                      <li>실수 처리 시 부동소수점 오차 주의</li>
                    </ol>
                  </section>
                </div>
              </div>

              {/* Feedback Button */}
              <div className="border-t pt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      내용에 오류가 있나요?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>피드백 보내기</DialogTitle>
                      <DialogDescription>
                        오류나 개선 사항을 알려주세요. 검토 후 반영하겠습니다.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea placeholder="피드백 내용을 입력해주세요..." className="min-h-[120px]" />
                    <div className="flex justify-end">
                      <Button>제출하기</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            {/* Problems Tab */}
            <TabsContent value="problems" className="space-y-6">
              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">필터:</span>
                </div>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="플랫폼" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 플랫폼</SelectItem>
                    <SelectItem value="백준">백준</SelectItem>
                    <SelectItem value="프로그래머스">프로그래머스</SelectItem>
                    <SelectItem value="LeetCode">LeetCode</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="난이도" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 난이도</SelectItem>
                    <SelectItem value="1">1 (쉬움)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5 (어려움)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Problem List */}
              <div className="space-y-3">
                {filteredProblems.map((problem) => (
                  <div
                    key={`${problem.platform}-${problem.id}`}
                    className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className={`${getPlatformColor(problem.platform)} shrink-0 border`}
                      >
                        {problem.platform}
                      </Badge>
                      <div>
                        <Link
                          href={`/problems/${problem.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {problem.title}
                        </Link>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`${getDifficultyColor(problem.difficulty)} border`}
                      >
                        {problem.difficulty}
                      </Badge>
                      {problem.hasSolution ? (
                        <Link href={`/problems/${problem.id}`}>
                          <Button variant="outline" size="sm">
                            풀이 보기
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          풀이 없음
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`#`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="원본 문제 보기"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  조건에 맞는 문제가 없습니다.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

const codeExamples = {
  python: `def knapsack(W, weights, values):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(W + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w-weights[i-1]] + values[i-1])

    return dp[n][W]

# 사용 예시
print(knapsack(7, [3, 4, 2], [4, 5, 3]))  # 출력: 7`,
  cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(int W, vector<int>& weights, vector<int>& values) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w];
            if (weights[i-1] <= w) {
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w-weights[i-1]] + values[i-1]);
            }
        }
    }
    return dp[n][W];
}

int main() {
    vector<int> weights = {3, 4, 2};
    vector<int> values = {4, 5, 3};
    cout << knapsack(7, weights, values) << endl;  // 출력: 7
    return 0;
}`,
  java: `public class Knapsack {
    public static int knapsack(int W, int[] weights, int[] values) {
        int n = weights.length;
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                dp[i][w] = dp[i-1][w];
                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(dp[i][w],
                        dp[i-1][w-weights[i-1]] + values[i-1]);
                }
            }
        }
        return dp[n][W];
    }

    public static void main(String[] args) {
        int[] weights = {3, 4, 2};
        int[] values = {4, 5, 3};
        System.out.println(knapsack(7, weights, values));  // 출력: 7
    }
}`,
  rust: `fn knapsack(w: usize, weights: &[usize], values: &[i32]) -> i32 {
    let n = weights.len();
    let mut dp = vec![vec![0; w + 1]; n + 1];

    for i in 1..=n {
        for weight in 0..=w {
            dp[i][weight] = dp[i-1][weight];
            if weights[i-1] <= weight {
                dp[i][weight] = dp[i][weight].max(
                    dp[i-1][weight - weights[i-1]] + values[i-1]
                );
            }
        }
    }
    dp[n][w]
}

fn main() {
    let weights = vec![3, 4, 2];
    let values = vec![4, 5, 3];
    println!("{}", knapsack(7, &weights, &values));  // 출력: 7
}`,
  go: `package main

import "fmt"

func knapsack(W int, weights, values []int) int {
    n := len(weights)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, W+1)
    }

    for i := 1; i <= n; i++ {
        for w := 0; w <= W; w++ {
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w {
                val := dp[i-1][w-weights[i-1]] + values[i-1]
                if val > dp[i][w] {
                    dp[i][w] = val
                }
            }
        }
    }
    return dp[n][W]
}

func main() {
    weights := []int{3, 4, 2}
    values := []int{4, 5, 3}
    fmt.Println(knapsack(7, weights, values))  // 출력: 7
}`,
}

function CodeTabs() {
  const [activeTab, setActiveTab] = React.useState<keyof typeof codeExamples>("python")
  const [copied, setCopied] = React.useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs: { key: keyof typeof codeExamples; label: string }[] = [
    { key: "python", label: "Python" },
    { key: "cpp", label: "C++" },
    { key: "java", label: "Java" },
    { key: "rust", label: "Rust" },
    { key: "go", label: "Go" },
  ]

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-800">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 h-8 text-zinc-400 hover:text-zinc-100"
          onClick={copyCode}
        >
          {copied ? (
            <Check className="mr-1 h-4 w-4" />
          ) : (
            <Copy className="mr-1 h-4 w-4" />
          )}
          {copied ? "복사됨" : "복사"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm text-zinc-100">{codeExamples[activeTab]}</code>
      </pre>
    </div>
  )
}
