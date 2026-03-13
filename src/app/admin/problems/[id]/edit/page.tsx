"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const algorithms = [
  { slug: "dp", name: "다이나믹 프로그래밍" },
  { slug: "graph", name: "그래프" },
  { slug: "sorting", name: "정렬" },
  { slug: "search", name: "탐색" },
  { slug: "data-structure", name: "자료구조" },
  { slug: "greedy", name: "그리디" },
  { slug: "string", name: "문자열" },
  { slug: "math", name: "수학" },
]

const themesByAlgorithm: Record<string, { slug: string; name: string }[]> = {
  dp: [
    { slug: "knapsack", name: "배낭 문제" },
    { slug: "lis", name: "LIS" },
    { slug: "interval-dp", name: "구간 DP" },
    { slug: "bitmask-dp", name: "비트마스크 DP" },
  ],
  graph: [
    { slug: "bfs", name: "BFS" },
    { slug: "dfs", name: "DFS" },
    { slug: "dijkstra", name: "다익스트라" },
    { slug: "floyd", name: "플로이드-워셜" },
  ],
}

// Mock data
const mockProblems: Record<string, {
  algorithm: string
  theme: string
  platform: string
  problemId: string
  titleKo: string
  titleEn: string
  difficulty: string
  difficultyLabel: string
  tags: string[]
  approach: string
  code: string
  language: string
  explanation: string
  timeComplexity: string
  spaceComplexity: string
}> = {
  "12865": {
    algorithm: "dp",
    theme: "knapsack",
    platform: "백준",
    problemId: "12865",
    titleKo: "평범한 배낭",
    titleEn: "Normal Knapsack",
    difficulty: "3",
    difficultyLabel: "골드 V",
    tags: ["dp", "배낭", "knapsack"],
    approach: `## 접근 방식

이 문제는 0/1 배낭 문제의 대표적인 예시입니다.

### 핵심 아이디어
1. 각 물건을 선택하거나 선택하지 않는 두 가지 경우를 고려
2. dp[i][w] = i번째 물건까지 고려했을 때, 무게 제한 w에서의 최대 가치`,
    code: `n, k = map(int, input().split())
items = [tuple(map(int, input().split())) for _ in range(n)]

dp = [0] * (k + 1)
for w, v in items:
    for j in range(k, w - 1, -1):
        dp[j] = max(dp[j], dp[j - w] + v)

print(dp[k])`,
    language: "python",
    explanation: `### 코드 설명

1. 1차원 DP 배열 사용으로 공간 최적화
2. 각 물건에 대해 역순으로 순회하여 중복 선택 방지
3. dp[j] = max(현재 가치, 물건 추가 시 가치)`,
    timeComplexity: "O(NK)",
    spaceComplexity: "O(K)",
  },
}

export default function AdminProblemEditPage() {
  const router = useRouter()
  const params = useParams()
  const problemId = params.id as string

  const existingData = mockProblems[problemId]

  const [algorithm, setAlgorithm] = React.useState(existingData?.algorithm || "")
  const [theme, setTheme] = React.useState(existingData?.theme || "")
  const [platform, setPlatform] = React.useState(existingData?.platform || "")
  const [problemIdValue, setProblemIdValue] = React.useState(existingData?.problemId || "")
  const [titleKo, setTitleKo] = React.useState(existingData?.titleKo || "")
  const [titleEn, setTitleEn] = React.useState(existingData?.titleEn || "")
  const [difficulty, setDifficulty] = React.useState(existingData?.difficulty || "")
  const [difficultyLabel, setDifficultyLabel] = React.useState(existingData?.difficultyLabel || "")
  const [tags, setTags] = React.useState<string[]>(existingData?.tags || [])
  const [tagInput, setTagInput] = React.useState("")
  const [solutionOpen, setSolutionOpen] = React.useState(!!existingData?.approach)
  
  const [approach, setApproach] = React.useState(existingData?.approach || "")
  const [code, setCode] = React.useState(existingData?.code || "")
  const [language, setLanguage] = React.useState(existingData?.language || "")
  const [explanation, setExplanation] = React.useState(existingData?.explanation || "")
  const [timeComplexity, setTimeComplexity] = React.useState(existingData?.timeComplexity || "")
  const [spaceComplexity, setSpaceComplexity] = React.useState(existingData?.spaceComplexity || "")

  const availableThemes = algorithm ? themesByAlgorithm[algorithm] || [] : []

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      algorithm,
      theme,
      platform,
      problemId: problemIdValue,
      titleKo,
      titleEn,
      difficulty,
      difficultyLabel,
      tags,
      approach,
      code,
      language,
      explanation,
      timeComplexity,
      spaceComplexity,
    })
    router.push("/admin/problems")
  }

  if (!existingData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">문제를 찾을 수 없습니다.</p>
        <Button variant="link" asChild className="mt-4">
          <Link href="/admin/problems">목록으로 돌아가기</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/problems"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        문제 목록으로
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">문제 수정</h1>
        <p className="mt-1 text-muted-foreground">
          <strong>{existingData.titleKo}</strong> 문제 정보를 수정합니다.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel required>알고리즘 카테고리</FieldLabel>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="알고리즘 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map((alg) => (
                      <SelectItem key={alg.slug} value={alg.slug}>
                        {alg.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel required>테마</FieldLabel>
                <Select value={theme} onValueChange={setTheme} disabled={!algorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder={algorithm ? "테마 선택" : "알고리즘을 먼저 선택하세요"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableThemes.map((t) => (
                      <SelectItem key={t.slug} value={t.slug}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel required>플랫폼</FieldLabel>
                <div className="flex gap-2">
                  {["백준", "프로그래머스", "LeetCode"].map((p) => (
                    <Button
                      key={p}
                      type="button"
                      variant={platform === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPlatform(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </Field>

              <Field>
                <FieldLabel required>문제 ID</FieldLabel>
                <Input
                  placeholder="예: 12865"
                  value={problemIdValue}
                  onChange={(e) => setProblemIdValue(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel required>문제 제목 (한글)</FieldLabel>
                <Input
                  placeholder="예: 평범한 배낭"
                  value={titleKo}
                  onChange={(e) => setTitleKo(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>문제 제목 (영문)</FieldLabel>
                <Input
                  placeholder="예: Normal Knapsack"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel required>난이도 (1-5)</FieldLabel>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="난이도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5"].map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel required>난이도 라벨</FieldLabel>
                  <Input
                    placeholder="예: 골드 V"
                    value={difficultyLabel}
                    onChange={(e) => setDifficultyLabel(e.target.value)}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel>태그</FieldLabel>
                <Input
                  placeholder="태그 입력 후 Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 rounded-full hover:bg-muted-foreground/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Solution Section */}
        <Collapsible open={solutionOpen} onOpenChange={setSolutionOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    풀이 정보
                    {existingData.approach && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        등록됨
                      </Badge>
                    )}
                  </CardTitle>
                  <Plus className={`h-5 w-5 transition-transform ${solutionOpen ? "rotate-45" : ""}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>접근 방식</FieldLabel>
                    <Textarea
                      placeholder="문제 접근 방식을 마크다운으로 작성하세요..."
                      className="min-h-[120px] font-mono text-sm"
                      value={approach}
                      onChange={(e) => setApproach(e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>언어</FieldLabel>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="언어 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>풀이 코드</FieldLabel>
                    <Textarea
                      placeholder="풀이 코드를 입력하세요..."
                      className="min-h-[200px] font-mono text-sm"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel>코드 설명</FieldLabel>
                    <Textarea
                      placeholder="코드 설명을 마크다운으로 작성하세요..."
                      className="min-h-[120px] font-mono text-sm"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>시간 복잡도</FieldLabel>
                      <Input
                        placeholder="예: O(NK)"
                        value={timeComplexity}
                        onChange={(e) => setTimeComplexity(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>공간 복잡도</FieldLabel>
                      <Input
                        placeholder="예: O(K)"
                        value={spaceComplexity}
                        onChange={(e) => setSpaceComplexity(e.target.value)}
                      />
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/problems">취소</Link>
          </Button>
          <Button type="submit">저장하기</Button>
        </div>
      </form>
    </div>
  )
}
