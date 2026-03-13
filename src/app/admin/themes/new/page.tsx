"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

export default function AdminThemeNewPage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [algorithm, setAlgorithm] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [conceptContent, setConceptContent] = React.useState("")
  const [order, setOrder] = React.useState("")

  // Auto-generate slug from name
  React.useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[가-힣]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
    setSlug(generatedSlug)
  }, [name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      name,
      slug,
      algorithm,
      description,
      conceptContent,
      order: parseInt(order) || 0,
    })
    router.push("/admin/themes")
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
        <h1 className="text-2xl font-bold tracking-tight">새 테마 추가</h1>
        <p className="mt-1 text-muted-foreground">
          새로운 알고리즘 테마를 등록합니다.
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
                <p className="mt-1 text-xs text-muted-foreground">
                  URL에 사용될 고유 식별자입니다.
                </p>
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
                placeholder="테마에 대한 상세 개념 설명을 마크다운으로 작성하세요...

예:
## 배낭 문제란?

배낭 문제(Knapsack Problem)는 주어진 물건들의 무게와 가치를 고려하여, 
배낭의 용량을 초과하지 않으면서 최대 가치를 얻는 조합을 찾는 문제입니다.

### 핵심 아이디어
- 각 물건을 선택하거나 선택하지 않는 두 가지 경우를 고려
- 점화식: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
"
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
          <Button type="submit">등록하기</Button>
        </div>
      </form>
    </div>
  )
}
