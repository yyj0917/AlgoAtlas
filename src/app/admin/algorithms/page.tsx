"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Layers } from "lucide-react"

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const initialAlgorithms = [
  { id: "1", slug: "dp", name: "다이나믹 프로그래밍", description: "큰 문제를 작은 하위 문제로 나누어 해결하는 알고리즘 기법", themeCount: 8, problemCount: 45, order: 1 },
  { id: "2", slug: "graph", name: "그래프", description: "정점과 간선으로 구성된 자료구조를 다루는 알고리즘", themeCount: 10, problemCount: 38, order: 2 },
  { id: "3", slug: "sorting", name: "정렬", description: "데이터를 특정 순서대로 배열하는 알고리즘", themeCount: 4, problemCount: 15, order: 3 },
  { id: "4", slug: "search", name: "탐색", description: "데이터 집합에서 원하는 값을 찾는 알고리즘", themeCount: 3, problemCount: 12, order: 4 },
  { id: "5", slug: "data-structure", name: "자료구조", description: "효율적인 데이터 관리를 위한 구조", themeCount: 6, problemCount: 22, order: 5 },
  { id: "6", slug: "greedy", name: "그리디", description: "각 단계에서 최선의 선택을 하는 알고리즘", themeCount: 4, problemCount: 18, order: 6 },
  { id: "7", slug: "string", name: "문자열", description: "문자열 처리 및 패턴 매칭 알고리즘", themeCount: 5, problemCount: 14, order: 7 },
  { id: "8", slug: "math", name: "수학", description: "수학적 개념을 활용한 알고리즘", themeCount: 4, problemCount: 12, order: 8 },
]

export default function AdminAlgorithmsPage() {
  const [algorithms, setAlgorithms] = React.useState(initialAlgorithms)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [deleteDialog, setDeleteDialog] = React.useState<{ open: boolean; algorithm: typeof initialAlgorithms[0] | null }>({
    open: false,
    algorithm: null,
  })

  const filteredAlgorithms = algorithms.filter(
    (alg) =>
      alg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alg.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = () => {
    if (deleteDialog.algorithm) {
      setAlgorithms(algorithms.filter((alg) => alg.id !== deleteDialog.algorithm?.id))
      setDeleteDialog({ open: false, algorithm: null })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">알고리즘 관리</h1>
          <p className="mt-1 text-muted-foreground">
            알고리즘 카테고리를 추가, 수정, 삭제합니다.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/algorithms/new">
            <Plus className="mr-2 h-4 w-4" />
            새 알고리즘
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="알고리즘 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary">{filteredAlgorithms.length}개</Badge>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">슬러그</TableHead>
              <TableHead className="hidden lg:table-cell">설명</TableHead>
              <TableHead className="text-center">테마</TableHead>
              <TableHead className="text-center">문제</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlgorithms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Layers className="h-8 w-8" />
                    <p>알고리즘이 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAlgorithms.map((algorithm) => (
                <TableRow key={algorithm.id}>
                  <TableCell className="font-mono text-muted-foreground">
                    {algorithm.order}
                  </TableCell>
                  <TableCell className="font-medium">{algorithm.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {algorithm.slug}
                    </code>
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate lg:table-cell text-muted-foreground">
                    {algorithm.description}
                  </TableCell>
                  <TableCell className="text-center">{algorithm.themeCount}</TableCell>
                  <TableCell className="text-center">{algorithm.problemCount}</TableCell>
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
                          <Link href={`/algorithms/${algorithm.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/algorithms/${algorithm.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            수정
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteDialog({ open: true, algorithm })}
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
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, algorithm: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>알고리즘 삭제</DialogTitle>
            <DialogDescription>
              정말로 <strong>{deleteDialog.algorithm?.name}</strong>을(를) 삭제하시겠습니까?
              이 작업은 되돌릴 수 없으며, 하위 테마와 문제들의 연결이 해제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialog({ open: false, algorithm: null })}>
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
