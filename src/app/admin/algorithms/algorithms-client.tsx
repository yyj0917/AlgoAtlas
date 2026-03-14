'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Eye, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { Algorithm } from '@/types/firestore';

export function AdminAlgorithmsClient({ algorithms }: { algorithms: Algorithm[] }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filtered = algorithms.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">알고리즘 관리</h1>
          <p className="mt-1 text-muted-foreground">알고리즘 카테고리를 관리합니다.</p>
        </div>
        <Button asChild>
          <Link href="/admin/algorithms/new">
            <Plus className="mr-2 h-4 w-4" />새 알고리즘
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="알고리즘 검색..."
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
              <TableHead className="text-center">테마</TableHead>
              <TableHead className="text-center">문제</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Layers className="h-8 w-8" />
                    <p>알고리즘이 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((alg) => (
                <TableRow key={alg.id}>
                  <TableCell className="font-mono text-muted-foreground">{alg.order}</TableCell>
                  <TableCell className="font-medium">{alg.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{alg.slug}</code>
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate text-muted-foreground lg:table-cell">
                    {alg.description}
                  </TableCell>
                  <TableCell className="text-center">{alg.themeCount}</TableCell>
                  <TableCell className="text-center">{alg.problemCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/algorithms/${alg.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/algorithms/${alg.slug}/edit`}>
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
