'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getDifficultyColor } from '@/lib/utils';
import type { Problem, Algorithm, Theme } from '@/types/firestore';

const PLATFORM_DISPLAY: Record<string, string> = {
  baekjoon: '백준',
  programmers: '프로그래머스',
  leetcode: 'LeetCode',
};

function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'baekjoon':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'programmers':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'leetcode':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

const ITEMS_PER_PAGE = 10;

export function ProblemsClient({
  problems,
  algorithms,
  themes,
}: {
  problems: Problem[];
  algorithms: Algorithm[];
  themes: Theme[];
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [algorithmFilter, setAlgorithmFilter] = React.useState('all');
  const [themeFilter, setThemeFilter] = React.useState('all');
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [difficultyFilter, setDifficultyFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);

  const availableThemes = React.useMemo(
    () =>
      algorithmFilter !== 'all'
        ? themes.filter((t) => t.algorithmSlug === algorithmFilter)
        : [],
    [algorithmFilter, themes],
  );

  React.useEffect(() => {
    setThemeFilter('all');
  }, [algorithmFilter]);

  const filteredProblems = React.useMemo(
    () =>
      problems.filter((p) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const match =
            p.title.toLowerCase().includes(q) ||
            p.titleEn.toLowerCase().includes(q) ||
            p.tags.some((tag) => tag.toLowerCase().includes(q));
          if (!match) return false;
        }
        if (algorithmFilter !== 'all' && p.algorithmSlug !== algorithmFilter) return false;
        if (themeFilter !== 'all' && p.themeSlug !== themeFilter) return false;
        if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
        if (difficultyFilter !== 'all' && String(p.difficulty) !== difficultyFilter) return false;
        return true;
      }),
    [problems, searchQuery, algorithmFilter, themeFilter, platformFilter, difficultyFilter],
  );

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, algorithmFilter, themeFilter, platformFilter, difficultyFilter]);

  const activeFilters = [
    algorithmFilter !== 'all' && {
      key: 'algorithm',
      label: algorithms.find((a) => a.slug === algorithmFilter)?.name,
    },
    themeFilter !== 'all' && {
      key: 'theme',
      label: availableThemes.find((t) => t.slug === themeFilter)?.name,
    },
    platformFilter !== 'all' && { key: 'platform', label: PLATFORM_DISPLAY[platformFilter] ?? platformFilter },
    difficultyFilter !== 'all' && { key: 'difficulty', label: `난이도 ${difficultyFilter}` },
  ].filter(Boolean) as { key: string; label: string }[];

  const clearFilter = (key: string) => {
    if (key === 'algorithm') setAlgorithmFilter('all');
    else if (key === 'theme') setThemeFilter('all');
    else if (key === 'platform') setPlatformFilter('all');
    else if (key === 'difficulty') setDifficultyFilter('all');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">문제 목록</h1>
            <p className="mt-1 text-muted-foreground">전체 {problems.length}개의 문제</p>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="문제명, 태그로 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
              <SelectTrigger className="w-[160px]">
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

            <Select
              value={themeFilter}
              onValueChange={setThemeFilter}
              disabled={algorithmFilter === 'all'}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="테마" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 테마</SelectItem>
                {availableThemes.map((t) => (
                  <SelectItem key={t.slug} value={t.slug}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              value={platformFilter}
              onValueChange={(v) => setPlatformFilter(v || 'all')}
              className="flex-wrap"
            >
              <ToggleGroupItem value="all" className="text-xs">전체</ToggleGroupItem>
              <ToggleGroupItem value="baekjoon" className="text-xs">백준</ToggleGroupItem>
              <ToggleGroupItem value="programmers" className="text-xs">프로그래머스</ToggleGroupItem>
              <ToggleGroupItem value="leetcode" className="text-xs">LeetCode</ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
              type="single"
              value={difficultyFilter}
              onValueChange={(v) => setDifficultyFilter(v || 'all')}
            >
              <ToggleGroupItem value="all" className="text-xs">전체</ToggleGroupItem>
              {['1', '2', '3', '4', '5'].map((d) => (
                <ToggleGroupItem key={d} value={d} className="text-xs">{d}</ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <Badge
                  key={f.key}
                  variant="secondary"
                  className="cursor-pointer gap-1 pr-1"
                  onClick={() => clearFilter(f.key)}
                >
                  {f.label}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-muted-foreground"
                onClick={() => {
                  setAlgorithmFilter('all');
                  setThemeFilter('all');
                  setPlatformFilter('all');
                  setDifficultyFilter('all');
                }}
              >
                전체 초기화
              </Button>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">검색 결과 {filteredProblems.length}개</p>
          </div>

          {/* Problem List */}
          <div className="space-y-3">
            {paginatedProblems.map((problem) => (
              <Link key={problem.id} href={`/problems/${problem.id}`} className="block">
                <div className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${getPlatformColor(problem.platform)} shrink-0 border`}
                      >
                        {PLATFORM_DISPLAY[problem.platform] ?? problem.platform}
                      </Badge>
                      <span className="font-medium">{problem.title}</span>
                      {problem.titleEn && (
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                          {problem.titleEn}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {problem.algorithmSlug} › {problem.themeSlug}
                      </Badge>
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${getDifficultyColor(problem.difficultyLabel)} border`}
                    >
                      {problem.difficultyLabel}
                    </Badge>
                    {problem.hasSolution && (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Check className="h-3 w-3" />
                        풀이
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">조건에 맞는 문제가 없습니다.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setAlgorithmFilter('all');
                  setThemeFilter('all');
                  setPlatformFilter('all');
                  setDifficultyFilter('all');
                }}
              >
                필터 초기화
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
