'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Eye, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { CSTopic, CSCategory } from '@/types/firestore';

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case '기초':
      return 'bg-green-100 text-green-700 border-green-200';
    case '중급':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case '심화':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function AdminCSTopicsClient({
  topics,
  categories,
}: {
  topics: CSTopic[];
  categories: CSCategory[];
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [difficultyFilter, setDifficultyFilter] = React.useState('all');

  const filtered = topics.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'all' || t.categorySlug === categoryFilter;
    const matchDifficulty = difficultyFilter === 'all' || t.difficulty === difficultyFilter;
    return matchSearch && matchCategory && matchDifficulty;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CS 토픽 관리</h1>
          <p className="mt-1 text-muted-foreground">CS 지식의 세부 토픽을 관리합니다.</p>
        </div>
        <Button asChild>
          <Link href="/admin/cs-topics/new">
            <Plus className="mr-2 h-4 w-4" />새 토픽
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="토픽 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-32">
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
        <Badge variant="secondary">{filtered.length}개</Badge>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>토픽</TableHead>
              <TableHead className="hidden md:table-cell">영문명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead className="text-center">난이도</TableHead>
              <TableHead className="text-center">문항</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-8 w-8" />
                    <p>토픽이 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell className="font-medium">{topic.name}</TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{topic.nameEn}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{topic.categorySlug}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`${getDifficultyColor(topic.difficulty)} border text-xs`}>
                      {topic.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{topic.questionCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/cs/${topic.categorySlug}/${topic.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/cs-topics/${topic.id}/edit`}>
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
