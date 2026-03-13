"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

// Mock data
const mockThemes: Record<string, {
  name: string
  slug: string
  algorithm: string
  description: string
  conceptContent: string
  order: number
}> = {
  "1": {
    name: "배낭 문제",
    slug: "knapsack",
    algorithm: "dp",
    description: "주어진 용량의 배낭에 물건을 담아 최대 가치를 얻는 문제",
    conceptContent: `## 배낭 문제란?

배낭 문제(Knapsack Problem)는 주어진 물건들의 무게와 가치를 고려하여, 배낭의 용량을 초과하지 않으면서 최대 가치를 얻는 조합을 찾는 문제입니다.

### 핵심 아이디어
- 각 물건을 선택하거나 선택하지 않는 두 가지 경우를 고려
- 점화식: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])`,
    order: 1,
  },
  "5": {
    name: "BFS (너비 우선 탐색)",
    slug: "bfs",
    algorithm: "graph",
    description: "가까운 노드부터 탐색하는 그래프 순회 알고리즘",
    conceptContent: `## BFS란?

너비 우선 탐색(Breadth-First Search)은 그래프에서 가까운 노드부터 우선적으로 탐색하는 알고리즘입니다.

### 특징
- 큐(Queue) 자료구조 사용
- 최단 경로 보장 (가중치가 동일한 경우)`,
    order: 1,
  },
}

export default function AdminThemeEditPage() {
  const router = useRouter()
  const params = useParams()
  const themeId = params.id as string

  const existingData = mockThemes[themeId]

  const [name, setName] = React.useState(existingData?.name || "")
  const [slug, setSlug] = React.useState(existingData?.slug || "")
  const [algorithm, setAlgorithm] = React.useState(existingData?.algorithm || "")
  const [description, setDescription] = React.useState(existingData?.description || "")
  const [conceptContent, setConceptContent] = React.useState(existingData?.conceptContent || "")
  const [order, setOrder] = React.useState(existingData?.order?.toString() || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      id: themeId,
      name,
      slug,
      algorithm,
      description,
      conceptContent,
      order: parseInt(order) || 0,
    })
    router.push("/admin/themes")
  }

  if (!existingData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">테마를 찾을 수 없습니다.</p>
        <Button variant="link" asChild className="mt-4">
          <Link href="/admin/themes">목록으로 돌아가기</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/themes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        테마 목록으로
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">테마 수정</h1>
        <p className="mt-1 text-muted-foreground">
          <strong>{existingData.name}</strong> 테마 정보를 수정합니다.
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
                <FieldLabel required>상위 알고리즘</FieldLabel>
                <Select value={algorithm} onValueChange={setAlgorithm} required>
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
                <FieldLabel required>테마 이름</FieldLabel>
                <Input
                  placeholder="예: 배낭 문제"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel required>슬러그 (URL)</FieldLabel>
                <Input
                  placeholder="예: knapsack"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="font-mono"
                />
              </Field>

              <Field>
                <FieldLabel required>짧은 설명</FieldLabel>
                <Textarea
                  placeholder="테마에 대한 간단한 설명을 입력하세요..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={2}
                />
              </Field>

              <Field>
                <FieldLabel>정렬 순서</FieldLabel>
                <Input
                  type="number"
                  placeholder="예: 1"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  min="1"
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>개념 설명</CardTitle>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel>개념 설명 (마크다운)</FieldLabel>
              <Textarea
                placeholder="테마에 대한 상세 개념 설명을 마크다운으로 작성하세요..."
                value={conceptContent}
                onChange={(e) => setConceptContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </Field>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/themes">취소</Link>
          </Button>
          <Button type="submit">저장하기</Button>
        </div>
      </form>
    </div>
  )
}
