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

export default function AdminAlgorithmNewPage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [order, setOrder] = React.useState("")
  const [icon, setIcon] = React.useState("")

  // Auto-generate slug from name
  React.useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[가-힣]+/g, (match) => {
        // Simple romanization for common algorithm names
        const romanizations: Record<string, string> = {
          "다이나믹프로그래밍": "dp",
          "그래프": "graph",
          "정렬": "sorting",
          "탐색": "search",
          "자료구조": "data-structure",
          "그리디": "greedy",
          "문자열": "string",
          "수학": "math",
        }
        return romanizations[match.replace(/\s/g, "")] || match
      })
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    setSlug(generatedSlug)
  }, [name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      name,
      slug,
      description,
      order: parseInt(order) || 0,
      icon,
    })
    router.push("/admin/algorithms")
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/algorithms"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        알고리즘 목록으로
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">새 알고리즘 추가</h1>
        <p className="mt-1 text-muted-foreground">
          새로운 알고리즘 카테고리를 등록합니다.
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
                <FieldLabel required>이름</FieldLabel>
                <Input
                  placeholder="예: 다이나믹 프로그래밍"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel required>슬러그 (URL)</FieldLabel>
                <Input
                  placeholder="예: dp"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="font-mono"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  URL에 사용될 고유 식별자입니다. 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.
                </p>
              </Field>

              <Field>
                <FieldLabel required>설명</FieldLabel>
                <Textarea
                  placeholder="알고리즘에 대한 간단한 설명을 입력하세요..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>정렬 순서</FieldLabel>
                  <Input
                    type="number"
                    placeholder="예: 1"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    min="1"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    홈페이지에 표시될 순서입니다.
                  </p>
                </Field>

                <Field>
                  <FieldLabel>아이콘 (Lucide)</FieldLabel>
                  <Input
                    placeholder="예: Layers"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Lucide 아이콘 이름을 입력하세요.
                  </p>
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/algorithms">취소</Link>
          </Button>
          <Button type="submit">등록하기</Button>
        </div>
      </form>
    </div>
  )
}
