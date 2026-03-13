"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, BookOpen, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DropdownMenuSeparator,
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
import { Badge } from "@/components/ui/badge"

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

const initialThemes = [
  { id: "1", slug: "knapsack", name: "배낭 문제", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", problemCount: 8, order: 1 },
  { id: "2", slug: "lis", name: "LIS (최장 증가 부분 수열)", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", problemCount: 6, order: 2 },
  { id: "3", slug: "interval-dp", name: "구간 DP", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", problemCount: 5, order: 3 },
  { id: "4", slug: "bitmask-dp", name: "비트마스크 DP", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", problemCount: 7, order: 4 },
  { id: "5", slug: "bfs", name: "BFS (너비 우선 탐색)", algorithm: "graph", algorithmName: "그래프", problemCount: 10, order: 1 },
  { id: "6", slug: "dfs", name: "DFS (깊이 우선 탐색)", algorithm: "graph", algorithmName: "그래프", problemCount: 8, order: 2 },
  { id: "7", slug: "dijkstra", name: "다익스트라", algorithm: "graph", algorithmName: "그래프", problemCount: 6, order: 3 },
  { id: "8", slug: "floyd", name: "플로이드-워셜", algorithm: "graph", algorithmName: "그래프", problemCount: 4, order: 4 },
  { id: "9", slug: "binary-search", name: "이분 탐색", algorithm: "search", algorithmName: "탐색", problemCount: 9, order: 1 },
  { id: "10", slug: "parametric-search", name: "매개변수 탐색", algorithm: "search", algorithmName: "탐색", problemCount: 5, order: 2 },
]

export default function AdminThemesPage() {
  const [themes, setThemes] = React.useState(initialThemes)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [algorithmFilter, setAlgorithmFilter] = React.useState("all")
  const [deleteDialog, setDeleteDialog] = React.useState<{ open: boolean; theme: typeof initialThemes[0] | null }>({
    open: false,
    theme: null,
  })

  const filteredThemes = themes.filter((theme) => {
    const matchesSearch = 
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAlgorithm = algorithmFilter === "all" || theme.algorithm === algorithmFilter
    return matchesSearch && matchesAlgorithm
  })

  const handleDelete = () => {
    if (deleteDialog.theme) {
      setThemes(themes.filter((t) => t.id !== deleteDialog.theme?.id))
      setDeleteDialog({ open: false, theme: null })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">테마 관리</h1>
          <p className="mt-1 text-muted-foreground">
            알고리즘 하위 테마를 추가, 수정, 삭제합니다.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/themes/new">
            <Plus className="mr-2 h-4 w-4" />
            새 테마
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="테마 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
          <SelectTrigger className="w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="알고리즘 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 알고리즘</SelectItem>
            {algorithms.map((alg) => (
              <SelectItem key={alg.slug} value={alg.slug}>
                {alg.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="secondary">{filteredThemes.length}개</Badge>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">슬러그</TableHead>
              <TableHead>알고리즘</TableHead>
              <TableHead className="text-center">문제 수</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredThemes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-8 w-8" />
                    <p>테마가 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredThemes.map((theme) => (
                <TableRow key={theme.id}>
                  <TableCell className="font-mono text-muted-foreground">
                    {theme.order}
                  </TableCell>
                  <TableCell className="font-medium">{theme.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {theme.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{theme.algorithmName}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{theme.problemCount}</TableCell>
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
                          <Link href={`/themes/${theme.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/themes/${theme.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            수정
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteDialog({ open: true, theme })}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, theme: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>테마 삭제</DialogTitle>
            <DialogDescription>
              정말로 <strong>{deleteDialog.theme?.name}</strong>을(를) 삭제하시겠습니까?
              이 작업은 되돌릴 수 없으며, 하위 문제들의 연결이 해제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialog({ open: false, theme: null })}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
