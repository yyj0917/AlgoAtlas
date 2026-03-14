'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Eye, FileCode2, Filter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Problem, Algorithm } from '@/types/firestore';

function getDifficultyColor(difficulty: number) {
  switch (difficulty) {
    case 1:
      return 'bg-green-100 text-green-700 border-green-200';
    case 2:
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 3:
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 4:
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 5:
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

const PLATFORM_LABELS: Record<string, string> = {
  baekjoon: '백준',
  programmers: '프로그래머스',
  leetcode: 'LeetCode',
};

export function AdminProblemsClient({
  problems,
  algorithms,
}: {
  problems: Problem[];
  algorithms: Algorithm[];
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [algorithmFilter, setAlgorithmFilter] = React.useState('all');
  const [platformFilter, setPlatformFilter] = React.useState('all');

  const filtered = problems.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platformId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAlgorithm = algorithmFilter === 'all' || p.algorithmSlug === algorithmFilter;
    const matchPlatform = platformFilter === 'all' || p.platform === platformFilter;
    return matchSearch && matchAlgorithm && matchPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">문제 관리</h1>
          <p className="mt-1 text-muted-foreground">알고리즘 문제를 추가, 수정, 삭제합니다.</p>
        </div>
        <Button asChild>
          <Link href="/admin/problems/new">
            <Plus className="mr-2 h-4 w-4" />새 문제
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="문제 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="알고리즘" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 알고리즘</SelectItem>
              {algorithms.map((a) => (
                <SelectItem key={a.slug} value={a.slug}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="플랫폼" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 플랫폼</SelectItem>
              <SelectItem value="baekjoon">백준</SelectItem>
              <SelectItem value="programmers">프로그래머스</SelectItem>
              <SelectItem value="leetcode">LeetCode</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="secondary">{filtered.length}개</Badge>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>문제 ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">플랫폼</TableHead>
              <TableHead className="hidden lg:table-cell">알고리즘 / 테마</TableHead>
              <TableHead className="text-center">난이도</TableHead>
              <TableHead className="hidden text-center sm:table-cell">풀이</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileCode2 className="h-8 w-8" />
                    <p>문제가 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell className="font-mono text-sm">{problem.platformId}</TableCell>
                  <TableCell className="font-medium">{problem.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{PLATFORM_LABELS[problem.platform] ?? problem.platform}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">{problem.algorithmSlug}</span>
                      <span className="text-sm">{problem.themeSlug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={cn('border text-xs', getDifficultyColor(problem.difficulty))}>
                      {problem.difficultyLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-center sm:table-cell">
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
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/problems/${problem.id}`}>
                            <Eye className="mr-2 h-4 w-4" />보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/problems/${problem.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />수정
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <a href={problem.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />원본 문제
                          </a>
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
    </div>
  );
}
