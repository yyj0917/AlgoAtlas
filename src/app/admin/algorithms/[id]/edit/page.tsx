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

// Mock data - in production, fetch from API
const mockAlgorithms: Record<string, { name: string; slug: string; description: string; order: number; icon: string }> = {
  "1": { name: "다이나믹 프로그래밍", slug: "dp", description: "큰 문제를 작은 하위 문제로 나누어 해결하는 알고리즘 기법", order: 1, icon: "Layers" },
  "2": { name: "그래프", slug: "graph", description: "정점과 간선으로 구성된 자료구조를 다루는 알고리즘", order: 2, icon: "Network" },
  "3": { name: "정렬", slug: "sorting", description: "데이터를 특정 순서대로 배열하는 알고리즘", order: 3, icon: "ArrowUpDown" },
}

export default function AdminAlgorithmEditPage() {
  const router = useRouter()
  const params = useParams()
  const algorithmId = params.id as string

  const existingData = mockAlgorithms[algorithmId]

  const [name, setName] = React.useState(existingData?.name || "")
  const [slug, setSlug] = React.useState(existingData?.slug || "")
  const [description, setDescription] = React.useState(existingData?.description || "")
  const [order, setOrder] = React.useState(existingData?.order?.toString() || "")
  const [icon, setIcon] = React.useState(existingData?.icon || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      id: algorithmId,
      name,
      slug,
      description,
      order: parseInt(order) || 0,
      icon,
    })
    router.push("/admin/algorithms")
  }

  if (!existingData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">알고리즘을 찾을 수 없습니다.</p>
        <Button variant="link" asChild className="mt-4">
          <Link href="/admin/algorithms">목록으로 돌아가기</Link>
        </Button>
      </div>
    )
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
        <h1 className="text-2xl font-bold tracking-tight">알고리즘 수정</h1>
        <p className="mt-1 text-muted-foreground">
          <strong>{existingData.name}</strong> 알고리즘 정보를 수정합니다.
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
                  URL에 사용될 고유 식별자입니다. 변경 시 기존 URL이 작동하지 않을 수 있습니다.
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
                </Field>

                <Field>
                  <FieldLabel>아이콘 (Lucide)</FieldLabel>
                  <Input
                    placeholder="예: Layers"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  />
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
          <Button type="submit">저장하기</Button>
        </div>
      </form>
    </div>
  )
}
