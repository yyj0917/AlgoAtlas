"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Cpu, Network, Database, Boxes, HardDrive, Cog, Brain, Server, Shield, Cloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const iconOptions = [
  { value: "Cpu", label: "CPU", icon: Cpu },
  { value: "Network", label: "네트워크", icon: Network },
  { value: "Database", label: "데이터베이스", icon: Database },
  { value: "Boxes", label: "박스", icon: Boxes },
  { value: "HardDrive", label: "하드드라이브", icon: HardDrive },
  { value: "Cog", label: "톱니", icon: Cog },
  { value: "Brain", label: "두뇌", icon: Brain },
  { value: "Server", label: "서버", icon: Server },
  { value: "Shield", label: "방패", icon: Shield },
  { value: "Cloud", label: "클라우드", icon: Cloud },
]

export default function NewCSCategoryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [selectedIcon, setSelectedIcon] = React.useState("Cpu")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push("/admin/cs-categories")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/cs-categories">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로가기</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">새 CS 카테고리 추가</h1>
          <p className="mt-1 text-muted-foreground">
            새로운 CS 지식 카테고리를 생성합니다.
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
                <CardDescription>카테고리의 기본 정보를 입력합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">카테고리 이름 *</FieldLabel>
                    <Input
                      id="name"
                      placeholder="예: 운영체제"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="englishName">영문 이름 *</FieldLabel>
                    <Input
                      id="englishName"
                      placeholder="예: Operating System"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="slug">슬러그 *</FieldLabel>
                    <Input
                      id="slug"
                      placeholder="예: operating-system"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      URL에 사용됩니다. 영문 소문자, 숫자, 하이픈만 사용 가능합니다.
                    </p>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">설명 *</FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="카테고리에 대한 간단한 설명을 입력하세요."
                      rows={3}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="order">순서</FieldLabel>
                    <Input
                      id="order"
                      type="number"
                      min={1}
                      defaultValue={1}
                    />
                    <p className="text-xs text-muted-foreground">
                      목록에서 표시되는 순서입니다.
                    </p>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Icon Selection */}
            <Card>
              <CardHeader>
                <CardTitle>아이콘 선택</CardTitle>
                <CardDescription>카테고리를 대표하는 아이콘을 선택합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedIcon}
                  onValueChange={setSelectedIcon}
                  className="grid grid-cols-5 gap-4"
                >
                  {iconOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <div key={option.value}>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={option.value}
                          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/10 cursor-pointer transition-colors"
                        >
                          <Icon className="h-6 w-6" />
                          <span className="text-xs">{option.label}</span>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
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
                  {isSubmitting ? "저장 중..." : "카테고리 저장"}
                </Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/cs-categories">취소</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
