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

// Sample existing topic data
const topicData = {
  id: "1",
  categoryId: "1",
  slug: "process-thread",
  name: "프로세스와 스레드",
  englishName: "Process & Thread",
  difficulty: "기초",
  description: "프로세스와 스레드의 개념, 차이점, 생명주기",
  content: `## 프로세스 (Process)

프로세스는 **실행 중인 프로그램**을 의미합니다.

### 프로세스의 특징
- 독립된 메모리 공간
- 최소 1개의 스레드 포함

## 스레드 (Thread)

스레드는 프로세스 내에서 실행되는 **실행 흐름의 단위**입니다.`,
  questions: [
    { id: "1", question: "프로세스와 스레드의 차이점은?", answer: "프로세스는 독립된 메모리 공간을 가지지만, 스레드는 프로세스 내에서 메모리를 공유합니다.", difficulty: "기초", tags: "프로세스, 스레드, 메모리" },
    { id: "2", question: "컨텍스트 스위칭이란?", answer: "CPU가 현재 실행 중인 작업을 중단하고 다른 작업으로 전환하는 과정입니다.", difficulty: "중급", tags: "컨텍스트 스위칭, PCB" },
  ],
  references: [
    { title: "Operating System Concepts", url: "https://www.os-book.com/" },
  ],
}

interface Question {
  id: string
  question: string
  answer: string
  difficulty: string
  tags: string
}

export default function EditCSTopicPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [questions, setQuestions] = React.useState<Question[]>(topicData.questions)
  const [openQuestions, setOpenQuestions] = React.useState<string[]>([])

  const addQuestion = () => {
    const newId = Date.now().toString()
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
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">CS 토픽 수정</h1>
          <p className="mt-1 text-muted-foreground">
            "{topicData.name}" 토픽을 수정합니다.
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
                    <Select defaultValue={topicData.categoryId} required>
                      <SelectTrigger>
                        <SelectValue />
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
                      defaultValue={topicData.name}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="englishName">영문 이름 *</FieldLabel>
                    <Input
                      id="englishName"
                      defaultValue={topicData.englishName}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="slug">슬러그 *</FieldLabel>
                    <Input
                      id="slug"
                      defaultValue={topicData.slug}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="difficulty">난이도 *</FieldLabel>
                    <Select defaultValue={topicData.difficulty}>
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
                      defaultValue={topicData.description}
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
                  defaultValue={topicData.content}
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
                    <CardTitle>면접 문항 ({questions.length}개)</CardTitle>
                    <CardDescription>토픽에 대한 면접 문항을 관리합니다.</CardDescription>
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
                            <span className="text-sm font-medium line-clamp-1">
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
                                rows={2}
                              />
                            </Field>
                            <Field>
                              <FieldLabel>답변 *</FieldLabel>
                              <Textarea
                                value={q.answer}
                                onChange={(e) => updateQuestion(q.id, "answer", e.target.value)}
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
                                  placeholder="쉼표로 구분"
                                />
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
                  {isSubmitting ? "저장 중..." : "변경사항 저장"}
                </Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/cs-topics">취소</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Preview Link */}
            <Card>
              <CardHeader>
                <CardTitle>미리보기</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/cs/operating-system/${topicData.slug}`} target="_blank">
                    사이트에서 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle>참고 자료</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>참고 자료 1</FieldLabel>
                    <Input defaultValue={topicData.references[0]?.title} placeholder="제목" className="mb-2" />
                    <Input defaultValue={topicData.references[0]?.url} placeholder="URL" />
                  </Field>
                  <Field>
                    <FieldLabel>참고 자료 2</FieldLabel>
                    <Input placeholder="제목" className="mb-2" />
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
