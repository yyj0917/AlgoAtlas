"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Plus, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

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
  sorting: [
    { slug: "quick-sort", name: "퀵 정렬" },
    { slug: "merge-sort", name: "병합 정렬" },
  ],
}

const difficultyLabels: Record<string, string[]> = {
  "1": ["브론즈", "Level 1", "Easy"],
  "2": ["실버", "Level 2", "Easy-Medium"],
  "3": ["골드", "Level 3", "Medium"],
  "4": ["플래티넘", "Level 4", "Medium-Hard"],
  "5": ["다이아몬드", "Level 5", "Hard"],
}

export default function AdminProblemNewPage() {
  const [algorithm, setAlgorithm] = React.useState("")
  const [theme, setTheme] = React.useState("")
  const [platform, setPlatform] = React.useState("")
  const [problemId, setProblemId] = React.useState("")
  const [titleKo, setTitleKo] = React.useState("")
  const [titleEn, setTitleEn] = React.useState("")
  const [difficulty, setDifficulty] = React.useState("")
  const [difficultyLabel, setDifficultyLabel] = React.useState("")
  const [tags, setTags] = React.useState<string[]>([])
  const [tagInput, setTagInput] = React.useState("")
  const [solutionOpen, setSolutionOpen] = React.useState(false)
  
  // Solution fields
  const [approach, setApproach] = React.useState("")
  const [code, setCode] = React.useState("")
  const [language, setLanguage] = React.useState("")
  const [explanation, setExplanation] = React.useState("")
  const [timeComplexity, setTimeComplexity] = React.useState("")
  const [spaceComplexity, setSpaceComplexity] = React.useState("")

  const availableThemes = algorithm ? themesByAlgorithm[algorithm] || [] : []

  // Reset theme when algorithm changes
  React.useEffect(() => {
    setTheme("")
  }, [algorithm])

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
    // Handle form submission
    console.log({
      algorithm,
      theme,
      platform,
      problemId,
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
        <h1 className="text-2xl font-bold tracking-tight">문제 등록</h1>
        <p className="mt-1 text-muted-foreground">새로운 문제를 등록합니다.</p>
      </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
            {/* Basic Info */}
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
                      value={problemId}
                      onChange={(e) => setProblemId(e.target.value)}
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
                      placeholder="예: Normal Knapsack (선택사항)"
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
                              {d} ({difficultyLabels[d]?.[0]})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel required>난이도 라벨</FieldLabel>
                      <Input
                        placeholder="예: 실버 II, Level 3, Medium"
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
                        <Badge variant="secondary" className="text-xs">선택사항</Badge>
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
                            placeholder="예: O(N log N)"
                            value={timeComplexity}
                            onChange={(e) => setTimeComplexity(e.target.value)}
                          />
                        </Field>
                        <Field>
                          <FieldLabel>공간 복잡도</FieldLabel>
                          <Input
                            placeholder="예: O(N)"
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
              <Button type="submit">등록하기</Button>
            </div>
          </form>
    </div>
  )
}
