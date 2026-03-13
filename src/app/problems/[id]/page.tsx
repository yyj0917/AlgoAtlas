"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink, MessageSquare, Copy, Check, Clock, HardDrive } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample problem data
const problemData = {
  id: 12865,
  title: "평범한 배낭",
  platform: "백준",
  difficulty: "실버 II",
  tags: ["DP", "배낭"],
  theme: { slug: "knapsack", name: "배낭 문제" },
  algorithm: { slug: "dp", name: "다이나믹 프로그래밍" },
  externalUrl: "https://www.acmicpc.net/problem/12865",
  approach: `
이 문제는 0/1 배낭 문제의 가장 기본적인 형태입니다.

**문제 분석**
- N개의 물건이 있고, 각 물건은 무게(W)와 가치(V)를 가집니다.
- 배낭에 담을 수 있는 최대 무게는 K입니다.
- 배낭에 담을 수 있는 물건들의 최대 가치를 구해야 합니다.

**접근 방법**
1. dp[i][w]를 "i번째 물건까지 고려했을 때, 무게 w 이하로 담을 수 있는 최대 가치"로 정의합니다.
2. 각 물건에 대해 담거나 담지 않는 두 가지 선택을 합니다.
3. 점화식: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
  `,
  solutions: {
    python: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
items = [tuple(map(int, input().split())) for _ in range(N)]

# dp[w] = 무게 w 이하로 담을 수 있는 최대 가치
dp = [0] * (K + 1)

for weight, value in items:
    # 역순으로 순회해야 같은 물건을 여러 번 담지 않음
    for w in range(K, weight - 1, -1):
        dp[w] = max(dp[w], dp[w - weight] + value)

print(dp[K])`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, K;
    cin >> N >> K;

    vector<int> dp(K + 1, 0);

    for (int i = 0; i < N; i++) {
        int W, V;
        cin >> W >> V;

        // 역순으로 순회
        for (int w = K; w >= W; w--) {
            dp[w] = max(dp[w], dp[w - W] + V);
        }
    }

    cout << dp[K] << "\\n";
    return 0;
}`,
    java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());

        int[] dp = new int[K + 1];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            int W = Integer.parseInt(st.nextToken());
            int V = Integer.parseInt(st.nextToken());

            for (int w = K; w >= W; w--) {
                dp[w] = Math.max(dp[w], dp[w - W] + V);
            }
        }

        System.out.println(dp[K]);
    }
}`,
  },
  explanation: `
**코드 설명**

1. **입력 처리**: N개의 물건 정보(무게, 가치)를 입력받습니다.

2. **DP 배열 초기화**: 1차원 배열 dp를 사용하여 공간을 최적화합니다. dp[w]는 무게 w 이하로 담을 수 있는 최대 가치입니다.

3. **점화식 적용**:
   - 각 물건에 대해 역순으로 순회합니다.
   - 역순으로 순회하는 이유: 같은 물건을 여러 번 담지 않기 위해서입니다.
   - 정순으로 순회하면 이미 갱신된 값을 다시 사용하게 되어 같은 물건이 중복됩니다.

4. **결과 출력**: dp[K]가 최대 가치입니다.
  `,
  timeComplexity: "O(N × K)",
  spaceComplexity: "O(K)",
  relatedProblems: [
    { id: 12920, title: "평범한 배낭 2", platform: "백준", difficulty: "골드 I" },
    { id: 7579, title: "앱", platform: "백준", difficulty: "골드 III" },
    { id: 2629, title: "양팔저울", platform: "백준", difficulty: "골드 III" },
    { id: 494, title: "Target Sum", platform: "LeetCode", difficulty: "Medium" },
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

export default function ProblemDetailPage() {
  const [copied, setCopied] = React.useState(false)
  const [selectedLang, setSelectedLang] = React.useState("python")

  const copyCode = () => {
    const code = problemData.solutions[selectedLang as keyof typeof problemData.solutions]
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">홈</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/algorithms/${problemData.algorithm.slug}`}>
                      {problemData.algorithm.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/themes/${problemData.theme.slug}`}>
                      {problemData.theme.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{problemData.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Problem Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                    {problemData.title}
                  </h1>
                  <span className="text-lg text-muted-foreground">#{problemData.id}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${getPlatformColor(problemData.platform)} border`}
                  >
                    {problemData.platform}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${getDifficultyColor(problemData.difficulty)} border`}
                  >
                    {problemData.difficulty}
                  </Badge>
                  {problemData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild>
                    <a
                      href={problemData.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      원본 문제 보기
                    </a>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        피드백
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>피드백 보내기</DialogTitle>
                        <DialogDescription>
                          오류나 개선 사항을 알려주세요.
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea placeholder="피드백 내용을 입력해주세요..." className="min-h-[120px]" />
                      <div className="flex justify-end">
                        <Button>제출하기</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Solution Content */}
              <div className="space-y-8">
                {/* Approach Section */}
                <section>
                  <h2 className="mb-4 text-xl font-semibold">접근 방식</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      이 문제는 0/1 배낭 문제의 가장 기본적인 형태입니다.
                    </p>
                    <h3 className="mt-4 text-lg font-medium">문제 분석</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>N개의 물건이 있고, 각 물건은 무게(W)와 가치(V)를 가집니다.</li>
                      <li>배낭에 담을 수 있는 최대 무게는 K입니다.</li>
                      <li>배낭에 담을 수 있는 물건들의 최대 가치를 구해야 합니다.</li>
                    </ul>
                    <h3 className="mt-4 text-lg font-medium">접근 방법</h3>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>{"dp[i][w]를 \"i번째 물건까지 고려했을 때, 무게 w 이하로 담을 수 있는 최대 가치\"로 정의합니다."}</li>
                      <li>각 물건에 대해 담거나 담지 않는 두 가지 선택을 합니다.</li>
                      <li>{"점화식: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])"}</li>
                    </ol>
                  </div>
                </section>

                {/* Code Section */}
                <section>
                  <h2 className="mb-4 text-xl font-semibold">풀이 코드</h2>
                  <div className="rounded-lg bg-zinc-950">
                    <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
                      <Tabs value={selectedLang} onValueChange={setSelectedLang}>
                        <TabsList className="bg-zinc-900">
                          <TabsTrigger value="python" className="text-xs">Python</TabsTrigger>
                          <TabsTrigger value="cpp" className="text-xs">C++</TabsTrigger>
                          <TabsTrigger value="java" className="text-xs">Java</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-zinc-400 hover:text-zinc-100"
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
                      <code className="font-mono text-sm text-zinc-100">
                        {problemData.solutions[selectedLang as keyof typeof problemData.solutions]}
                      </code>
                    </pre>
                  </div>
                </section>

                {/* Explanation Section */}
                <section>
                  <h2 className="mb-4 text-xl font-semibold">코드 설명</h2>
                  <div className="prose prose-gray max-w-none">
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">입력 처리</strong>: N개의 물건 정보(무게, 가치)를 입력받습니다.
                      </li>
                      <li>
                        <strong className="text-foreground">DP 배열 초기화</strong>: 1차원 배열 dp를 사용하여 공간을 최적화합니다. dp[w]는 무게 w 이하로 담을 수 있는 최대 가치입니다.
                      </li>
                      <li>
                        <strong className="text-foreground">점화식 적용</strong>:
                        <ul className="mt-2 list-disc list-inside ml-4">
                          <li>각 물건에 대해 역순으로 순회합니다.</li>
                          <li>역순으로 순회하는 이유: 같은 물건을 여러 번 담지 않기 위해서입니다.</li>
                          <li>정순으로 순회하면 이미 갱신된 값을 다시 사용하게 되어 같은 물건이 중복됩니다.</li>
                        </ul>
                      </li>
                      <li>
                        <strong className="text-foreground">결과 출력</strong>: dp[K]가 최대 가치입니다.
                      </li>
                    </ol>
                  </div>
                </section>

                {/* Complexity Section */}
                <section>
                  <h2 className="mb-4 text-xl font-semibold">복잡도 분석</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Clock className="h-4 w-4 text-primary" />
                          시간 복잡도
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                          {problemData.timeComplexity}
                        </code>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <HardDrive className="h-4 w-4 text-primary" />
                          공간 복잡도
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                          {problemData.spaceComplexity}
                        </code>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-20 space-y-6">
                {/* Related Problems */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">관련 문제</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {problemData.relatedProblems.map((problem) => (
                      <Link
                        key={`${problem.platform}-${problem.id}`}
                        href={`/problems/${problem.id}`}
                        className="block rounded-md p-2 transition-colors hover:bg-accent"
                      >
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${getPlatformColor(problem.platform)} border text-xs`}
                          >
                            {problem.platform}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${getDifficultyColor(problem.difficulty)} border text-xs`}
                          >
                            {problem.difficulty}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm font-medium">{problem.title}</p>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Theme Link */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">이 테마의 다른 문제</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/themes/${problemData.theme.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {problemData.theme.name} 문제 목록 보기 →
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
