"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Cpu, Network, Database, Boxes, HardDrive, Cog, Brain, Server, Shield, Cloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const iconMap: Record<string, typeof Cpu> = {
  Cpu, Network, Database, Boxes, HardDrive, Cog, Brain, Server, Shield, Cloud
}

const csCategories = [
  { id: "1", slug: "operating-system", name: "운영체제", englishName: "Operating System", icon: "Cpu", topicCount: 7, questionCount: 83, order: 1 },
  { id: "2", slug: "network", name: "네트워크", englishName: "Network", icon: "Network", topicCount: 6, questionCount: 72, order: 2 },
  { id: "3", slug: "database", name: "데이터베이스", englishName: "Database", icon: "Database", topicCount: 6, questionCount: 70, order: 3 },
  { id: "4", slug: "data-structure", name: "자료구조", englishName: "Data Structure", icon: "Boxes", topicCount: 6, questionCount: 75, order: 4 },
  { id: "5", slug: "computer-architecture", name: "컴퓨터 구조", englishName: "Computer Architecture", icon: "HardDrive", topicCount: 4, questionCount: 44, order: 5 },
  { id: "6", slug: "compiler", name: "컴파일러", englishName: "Compiler", icon: "Cog", topicCount: 4, questionCount: 32, order: 6 },
  { id: "7", slug: "machine-learning", name: "머신러닝", englishName: "Machine Learning", icon: "Brain", topicCount: 5, questionCount: 75, order: 7 },
  { id: "8", slug: "system-design", name: "시스템 설계", englishName: "System Design", icon: "Server", topicCount: 5, questionCount: 57, order: 8 },
  { id: "9", slug: "security", name: "보안", englishName: "Security", icon: "Shield", topicCount: 4, questionCount: 44, order: 9 },
  { id: "10", slug: "distributed-system", name: "분산 시스템", englishName: "Distributed System", icon: "Cloud", topicCount: 4, questionCount: 33, order: 10 },
]

export default function AdminCSCategoriesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<typeof csCategories[0] | null>(null)

  const filteredCategories = csCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (category: typeof csCategories[0]) => {
    setSelectedCategory(category)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Handle delete logic
    setDeleteDialogOpen(false)
    setSelectedCategory(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">CS 카테고리 관리</h1>
          <p className="mt-1 text-muted-foreground">
            CS 지식의 대분류 카테고리를 관리합니다.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cs-categories/new">
            <Plus className="mr-2 h-4 w-4" />
            새 카테고리 추가
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="카테고리 검색..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>영문명</TableHead>
              <TableHead className="text-center">토픽 수</TableHead>
              <TableHead className="text-center">문항 수</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => {
              const Icon = iconMap[category.icon] || Cpu
              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.order}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{category.englishName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{category.topicCount}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{category.questionCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">메뉴</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/cs-categories/${category.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            수정
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(category)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>카테고리 삭제</DialogTitle>
            <DialogDescription>
              정말 "{selectedCategory?.name}" 카테고리를 삭제하시겠습니까?
              <br />
              이 카테고리에 속한 {selectedCategory?.topicCount}개의 토픽도 함께 삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
