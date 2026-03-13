"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Filter } from "lucide-react"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const csCategories = [
  { id: "1", name: "운영체제" },
  { id: "2", name: "네트워크" },
  { id: "3", name: "데이터베이스" },
  { id: "4", name: "자료구조" },
  { id: "5", name: "컴퓨터 구조" },
  { id: "6", name: "컴파일러" },
  { id: "7", name: "머신러닝" },
  { id: "8", name: "시스템 설계" },
  { id: "9", name: "보안" },
  { id: "10", name: "분산 시스템" },
]

const csTopics = [
  { id: "1", slug: "process-thread", name: "프로세스와 스레드", englishName: "Process & Thread", categoryId: "1", categoryName: "운영체제", questionCount: 15, difficulty: "기초" },
  { id: "2", slug: "cpu-scheduling", name: "CPU 스케줄링", englishName: "CPU Scheduling", categoryId: "1", categoryName: "운영체제", questionCount: 12, difficulty: "중급" },
  { id: "3", slug: "memory-management", name: "메모리 관리", englishName: "Memory Management", categoryId: "1", categoryName: "운영체제", questionCount: 18, difficulty: "중급" },
  { id: "4", slug: "deadlock", name: "데드락", englishName: "Deadlock", categoryId: "1", categoryName: "운영체제", questionCount: 10, difficulty: "중급" },
  { id: "5", slug: "osi-7-layer", name: "OSI 7계층", englishName: "OSI 7 Layer", categoryId: "2", categoryName: "네트워크", questionCount: 10, difficulty: "기초" },
  { id: "6", slug: "tcp-ip", name: "TCP/IP", englishName: "TCP/IP", categoryId: "2", categoryName: "네트워크", questionCount: 15, difficulty: "중급" },
  { id: "7", slug: "http-https", name: "HTTP/HTTPS", englishName: "HTTP/HTTPS", categoryId: "2", categoryName: "네트워크", questionCount: 18, difficulty: "중급" },
  { id: "8", slug: "sql-basic", name: "SQL 기초", englishName: "SQL Basics", categoryId: "3", categoryName: "데이터베이스", questionCount: 15, difficulty: "기초" },
  { id: "9", slug: "transaction", name: "트랜잭션", englishName: "Transaction", categoryId: "3", categoryName: "데이터베이스", questionCount: 12, difficulty: "중급" },
  { id: "10", slug: "indexing", name: "인덱싱", englishName: "Indexing", categoryId: "3", categoryName: "데이터베이스", questionCount: 14, difficulty: "중급" },
  { id: "11", slug: "array-list", name: "배열과 리스트", englishName: "Array & List", categoryId: "4", categoryName: "자료구조", questionCount: 12, difficulty: "기초" },
  { id: "12", slug: "tree", name: "트리", englishName: "Tree", categoryId: "4", categoryName: "자료구조", questionCount: 18, difficulty: "중급" },
  { id: "13", slug: "neural-network", name: "신경망", englishName: "Neural Network", categoryId: "7", categoryName: "머신러닝", questionCount: 15, difficulty: "심화" },
  { id: "14", slug: "cap-theorem", name: "CAP 정리", englishName: "CAP Theorem", categoryId: "10", categoryName: "분산 시스템", questionCount: 8, difficulty: "심화" },
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "기초":
      return "bg-green-100 text-green-700 border-green-200"
    case "중급":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "심화":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export default function AdminCSTopicsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [difficultyFilter, setDifficultyFilter] = React.useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedTopic, setSelectedTopic] = React.useState<typeof csTopics[0] | null>(null)

  const filteredTopics = csTopics.filter((topic) => {
    const matchesSearch = 
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || topic.categoryId === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || topic.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleDelete = (topic: typeof csTopics[0]) => {
    setSelectedTopic(topic)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setDeleteDialogOpen(false)
    setSelectedTopic(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">CS 토픽 관리</h1>
          <p className="mt-1 text-muted-foreground">
            CS 지식의 세부 토픽을 관리합니다.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cs-topics/new">
            <Plus className="mr-2 h-4 w-4" />
            새 토픽 추가
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="토픽 검색..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {csCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="난이도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 난이도</SelectItem>
              <SelectItem value="기초">기초</SelectItem>
              <SelectItem value="중급">중급</SelectItem>
              <SelectItem value="심화">심화</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        {filteredTopics.length}개의 토픽
      </p>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>토픽</TableHead>
              <TableHead>영문명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead className="text-center">난이도</TableHead>
              <TableHead className="text-center">문항 수</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTopics.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell className="font-medium">{topic.name}</TableCell>
                <TableCell className="text-muted-foreground">{topic.englishName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{topic.categoryName}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={`${getDifficultyColor(topic.difficulty)} border`}>
                    {topic.difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{topic.questionCount}</Badge>
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
                        <Link href={`/admin/cs-topics/${topic.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          수정
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(topic)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>토픽 삭제</DialogTitle>
            <DialogDescription>
              정말 "{selectedTopic?.name}" 토픽을 삭제하시겠습니까?
              <br />
              이 토픽에 포함된 {selectedTopic?.questionCount}개의 문항도 함께 삭제됩니다.
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
