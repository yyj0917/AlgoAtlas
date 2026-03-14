'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Eye, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { getIcon } from '@/lib/icon-map';
import type { CSCategory } from '@/types/firestore';

export function AdminCSCategoriesClient({ categories }: { categories: CSCategory[] }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CS 카테고리 관리</h1>
          <p className="mt-1 text-muted-foreground">CS 지식 카테고리를 관리합니다.</p>
        </div>
        <Button asChild>
          <Link href="/admin/cs-categories/new">
            <Plus className="mr-2 h-4 w-4" />새 카테고리
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="카테고리 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary">{filtered.length}개</Badge>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">슬러그</TableHead>
              <TableHead className="hidden lg:table-cell">설명</TableHead>
              <TableHead className="text-center">토픽</TableHead>
              <TableHead className="text-center">문항</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Monitor className="h-8 w-8" />
                    <p>카테고리가 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((cat) => {
                const Icon = getIcon(cat.icon);
                return (
                  <TableRow key={cat.id}>
                    <TableCell className="font-mono text-muted-foreground">{cat.order}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-secondary" />
                        <span className="font-medium">{cat.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{cat.slug}</code>
                    </TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground lg:table-cell">
                      {cat.description}
                    </TableCell>
                    <TableCell className="text-center">{cat.topicCount}</TableCell>
                    <TableCell className="text-center">{cat.questionCount}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/cs/${cat.slug}`}>
                              <Eye className="mr-2 h-4 w-4" />보기
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/cs-categories/${cat.slug}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />수정
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
