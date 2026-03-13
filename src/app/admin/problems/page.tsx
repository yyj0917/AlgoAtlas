"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  FileCode2, 
  Filter,
  ExternalLink 
} from "lucide-react"

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
import { cn } from "@/lib/utils"

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

const platforms = ["백준", "프로그래머스", "LeetCode"]

const initialProblems = [
  { id: "12865", title: "평범한 배낭", platform: "백준", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "배낭 문제", difficulty: 3, difficultyLabel: "골드 V", hasSolution: true },
  { id: "1916", title: "최소비용 구하기", platform: "백준", algorithm: "graph", algorithmName: "그래프", theme: "다익스트라", difficulty: 3, difficultyLabel: "골드 V", hasSolution: true },
  { id: "11053", title: "가장 긴 증가하는 부분 수열", platform: "백준", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "LIS", difficulty: 2, difficultyLabel: "실버 II", hasSolution: true },
  { id: "2206", title: "벽 부수고 이동하기", platform: "백준", algorithm: "graph", algorithmName: "그래프", theme: "BFS", difficulty: 4, difficultyLabel: "골드 III", hasSolution: false },
  { id: "9251", title: "LCS", platform: "백준", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "LCS", difficulty: 3, difficultyLabel: "골드 V", hasSolution: true },
  { id: "two-sum", title: "Two Sum", platform: "LeetCode", algorithm: "data-structure", algorithmName: "자료구조", theme: "해시맵", difficulty: 1, difficultyLabel: "Easy", hasSolution: true },
  { id: "42861", title: "섬 연결하기", platform: "프로그래머스", algorithm: "graph", algorithmName: "그래프", theme: "MST", difficulty: 3, difficultyLabel: "Level 3", hasSolution: false },
  { id: "1753", title: "최단경로", platform: "백준", algorithm: "graph", algorithmName: "그래프", theme: "다익스트라", difficulty: 3, difficultyLabel: "골드 IV", hasSolution: true },
  { id: "11066", title: "파일 합치기", platform: "백준", algorithm: "dp", algorithmName: "다이나믹 프로그래밍", theme: "구간 DP", difficulty: 4, difficultyLabel: "골드 III", hasSolution: false },
  { id: "1920", title: "수 찾기", platform: "백준", algorithm: "search", algorithmName: "탐색", theme: "이분 탐색", difficulty: 2, difficultyLabel: "실버 IV", hasSolution: true },
]

function getDifficultyColor(difficulty: number) {
  switch (difficulty) {
    case 1: return "bg-green-100 text-green-700 border-green-200"
    case 2: return "bg-blue-100 text-blue-700 border-blue-200"
    case 3: return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case 4: return "bg-orange-100 text-orange-700 border-orange-200"
    case 5: return "bg-red-100 text-red-700 border-red-200"
    default: return "bg-muted text-muted-foreground"
  }
}

export default function AdminProblemsPage() {
  const [problems, setProblems] = React.useState(initialProblems)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [algorithmFilter, setAlgorithmFilter] = React.useState("all")
  const [platformFilter, setPlatformFilter] = React.useState("all")
  const [deleteDialog, setDeleteDialog] = React.useState<{ open: boolean; problem: typeof initialProblems[0] | null }>({
    open: false,
    problem: null,
  })

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAlgorithm = algorithmFilter === "all" || problem.algorithm === algorithmFilter
    const matchesPlatform = platformFilter === "all" || problem.platform === platformFilter
    return matchesSearch && matchesAlgorithm && matchesPlatform
  })

  const handleDelete = () => {
    if (deleteDialog.problem) {
      setProblems(problems.filter((p) => p.id !== deleteDialog.problem?.id))
      setDeleteDialog({ open: false, problem: null })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">문제 관리</h1>
          <p className="mt-1 text-muted-foreground">
            알고리즘 문제를 추가, 수정, 삭제합니다.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/problems/new">
            <Plus className="mr-2 h-4 w-4" />
            새 문제
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="문제 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="알고리즘" />
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
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="플랫폼" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 플랫폼</SelectItem>
            {platforms.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="secondary">{filteredProblems.length}개</Badge>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>문제 ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">플랫폼</TableHead>
              <TableHead className="hidden lg:table-cell">알고리즘 / 테마</TableHead>
              <TableHead className="text-center">난이도</TableHead>
              <TableHead className="text-center hidden sm:table-cell">풀이</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProblems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileCode2 className="h-8 w-8" />
                    <p>문제가 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProblems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell className="font-mono text-sm">{problem.id}</TableCell>
                  <TableCell className="font-medium">{problem.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{problem.platform}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">{problem.algorithmName}</span>
                      <span className="text-sm">{problem.theme}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={cn("border", getDifficultyColor(problem.difficulty))}>
                      {problem.difficultyLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    {problem.hasSolution ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        있음
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        없음
                      </Badge>
                    )}
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
                          <Link href={`/problems/${problem.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/problems/${problem.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            수정
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a 
                            href={
                              problem.platform === "백준" 
                                ? `https://www.acmicpc.net/problem/${problem.id}`
                                : problem.platform === "프로그래머스"
                                ? `https://programmers.co.kr/learn/courses/30/lessons/${problem.id}`
                                : `https://leetcode.com/problems/${problem.id}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            원본 문제
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteDialog({ open: true, problem })}
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
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, problem: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>문제 삭제</DialogTitle>
            <DialogDescription>
              정말로 <strong>{deleteDialog.problem?.title}</strong>을(를) 삭제하시겠습니까?
              이 작업은 되돌릴 수 없으며, 관련 풀이 데이터도 함께 삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialog({ open: false, problem: null })}>
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
