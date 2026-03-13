"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

const csCategories = [
  { id: "1", slug: "operating-system", name: "운영체제" },
  { id: "2", slug: "network", name: "네트워크" },
  { id: "3", slug: "database", name: "데이터베이스" },
  { id: "4", slug: "data-structure", name: "자료구조" },
  { id: "5", slug: "computer-architecture", name: "컴퓨터 구조" },
  { id: "6", slug: "compiler", name: "컴파일러" },
  { id: "7", slug: "machine-learning", name: "머신러닝" },
  { id: "8", slug: "system-design", name: "시스템 설계" },
  { id: "9", slug: "security", name: "보안" },
  { id: "10", slug: "distributed-system", name: "분산 시스템" },
]

interface Question {
  id: string
  question: string
  answer: string
  difficulty: string
  tags: string
}

export default function NewCSTopicPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [questions, setQuestions] = React.useState<Question[]>([
    { id: "1", question: "", answer: "", difficulty: "기초", tags: "" }
  ])
  const [openQuestions, setOpenQuestions] = React.useState<string[]>(["1"])

  const addQuestion = () => {
    const newId = (questions.length + 1).toString()
    setQuestions([...questions, { id: newId, question: "", answer: "", difficulty: "기초", tags: "" }])
    setOpenQuestions([...openQuestions, newId])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
      setOpenQuestions(openQuestions.filter(qId => qId !== id))
    }
  }

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    )
  }

  const updateQuestion = (id: string, field: keyof Question, value: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push("/admin/cs-topics")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/cs-topics">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로가기</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">새 CS 토픽 추가</h1>
          <p className="mt-1 text-muted-foreground">
            새로운 CS 지식 토픽을 생성합니다.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>토픽의 기본 정보를 입력합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="category">CS 카테고리 *</FieldLabel>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {csCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="name">토픽 이름 *</FieldLabel>
                    <Input
                      id="name"
                      placeholder="예: 프로세스와 스레드"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="englishName">영문 이름 *</FieldLabel>
                    <Input
                      id="englishName"
                      placeholder="예: Process & Thread"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="slug">슬러그 *</FieldLabel>
                    <Input
                      id="slug"
                      placeholder="예: process-thread"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      URL에 사용됩니다. 영문 소문자, 숫자, 하이픈만 사용 가능합니다.
                    </p>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="difficulty">난이도 *</FieldLabel>
                    <Select defaultValue="기초">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="기초">기초</SelectItem>
                        <SelectItem value="중급">중급</SelectItem>
                        <SelectItem value="심화">심화</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">간단한 설명 *</FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="토픽에 대한 간단한 설명을 입력하세요."
                      rows={2}
                      required
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Concept Content */}
            <Card>
              <CardHeader>
                <CardTitle>개념 정리</CardTitle>
                <CardDescription>마크다운 형식으로 개념을 정리합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="content"
                  placeholder="## 제목&#10;&#10;내용을 입력하세요...&#10;&#10;### 소제목&#10;&#10;- 항목 1&#10;- 항목 2"
                  rows={15}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Questions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>면접 문항</CardTitle>
                    <CardDescription>토픽에 대한 면접 문항을 추가합니다.</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    문항 추가
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((q, index) => (
                  <Collapsible
                    key={q.id}
                    open={openQuestions.includes(q.id)}
                    onOpenChange={() => toggleQuestion(q.id)}
                  >
                    <div className="rounded-lg border">
                      <CollapsibleTrigger asChild>
                        <div className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Q{index + 1}</Badge>
                            <span className="text-sm font-medium">
                              {q.question || "새 문항"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {questions.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeQuestion(q.id)
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                            {openQuestions.includes(q.id) ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t p-4">
                          <FieldGroup>
                            <Field>
                              <FieldLabel>질문 *</FieldLabel>
                              <Textarea
                                value={q.question}
                                onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                                placeholder="면접 질문을 입력하세요."
                                rows={2}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>답변 *</FieldLabel>
                              <Textarea
                                value={q.answer}
                                onChange={(e) => updateQuestion(q.id, "answer", e.target.value)}
                                placeholder="모범 답변을 입력하세요."
                                rows={4}
                              />
                            </Field>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field>
                                <FieldLabel>난이도</FieldLabel>
                                <Select 
                                  value={q.difficulty} 
                                  onValueChange={(value) => updateQuestion(q.id, "difficulty", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="기초">기초</SelectItem>
                                    <SelectItem value="중급">중급</SelectItem>
                                    <SelectItem value="심화">심화</SelectItem>
                                  </SelectContent>
                                </Select>
                              </Field>
                              <Field>
                                <FieldLabel>태그</FieldLabel>
                                <Input
                                  value={q.tags}
                                  onChange={(e) => updateQuestion(q.id, "tags", e.target.value)}
                                  placeholder="태그1, 태그2, 태그3"
                                />
                                <p className="text-xs text-muted-foreground">쉼표로 구분</p>
                              </Field>
                            </div>
                          </FieldGroup>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>저장</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "저장 중..." : "토픽 저장"}
                </Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/cs-topics">취소</Link>
                </Button>
              </CardContent>
            </Card>

            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle>참고 자료</CardTitle>
                <CardDescription>관련 참고 자료 링크를 추가합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="ref1">참고 자료 1</FieldLabel>
                    <Input id="ref1" placeholder="제목" className="mb-2" />
                    <Input placeholder="URL" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="ref2">참고 자료 2</FieldLabel>
                    <Input id="ref2" placeholder="제목" className="mb-2" />
                    <Input placeholder="URL" />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
