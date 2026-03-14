'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { getThemeDifficultyColor } from '@/lib/utils';
import type { Theme, Algorithm } from '@/types/firestore';

export function AdminThemesClient({
  themes,
  algorithms,
}: {
  themes: Theme[];
  algorithms: Algorithm[];
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [algorithmFilter, setAlgorithmFilter] = React.useState('all');

  const filtered = themes.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAlgo = algorithmFilter === 'all' || t.algorithmSlug === algorithmFilter;
    return matchSearch && matchAlgo;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">테마 관리</h1>
          <p className="mt-1 text-muted-foreground">알고리즘 테마를 관리합니다.</p>
        </div>
        <Button asChild>
          <Link href="/admin/themes/new">
            <Plus className="mr-2 h-4 w-4" />새 테마
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="테마 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="알고리즘 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {algorithms.map((a) => (
              <SelectItem key={a.slug} value={a.slug}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="secondary">{filtered.length}개</Badge>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">슬러그</TableHead>
              <TableHead>알고리즘</TableHead>
              <TableHead>난이도</TableHead>
              <TableHead className="text-center">문제</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-8 w-8" />
                    <p>테마가 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((theme) => (
                <TableRow key={theme.id}>
                  <TableCell className="font-medium">{theme.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{theme.slug}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{theme.algorithmSlug}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getThemeDifficultyColor(theme.difficulty)} border text-xs`}
                    >
                      {theme.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{theme.problemCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/themes/${theme.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/themes/${theme.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />수정
                          </Link>
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
