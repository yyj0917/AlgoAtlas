'use client';

import Link from 'next/link';
import { Layers, BookOpen, FileCode2, Plus, Clock, Monitor, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Problem } from '@/types/firestore';

interface Stats {
  algorithmCount: number;
  themeCount: number;
  problemCount: number;
  csCategoryCount: number;
  csTopicCount: number;
}

export function AdminDashboardClient({
  stats,
  recentProblems,
}: {
  stats: Stats;
  recentProblems: Problem[];
}) {
  const statCards = [
    { label: '전체 알고리즘', value: stats.algorithmCount, icon: Layers, href: '/admin/algorithms', color: 'text-primary' },
    { label: '전체 테마', value: stats.themeCount, icon: BookOpen, href: '/admin/themes', color: 'text-primary' },
    { label: '전체 문제', value: stats.problemCount, icon: FileCode2, href: '/admin/problems', color: 'text-green-600' },
    { label: 'CS 카테고리', value: stats.csCategoryCount, icon: Monitor, href: '/admin/cs-categories', color: 'text-secondary' },
    { label: 'CS 토픽', value: stats.csTopicCount, icon: GraduationCap, href: '/admin/cs-topics', color: 'text-secondary' },
  ];

  const quickActions = [
    { label: '새 알고리즘 추가', href: '/admin/algorithms/new', icon: Layers },
    { label: '새 테마 추가', href: '/admin/themes/new', icon: BookOpen },
    { label: '새 문제 추가', href: '/admin/problems/new', icon: FileCode2 },
    { label: '새 CS 카테고리 추가', href: '/admin/cs-categories/new', icon: Monitor },
    { label: '새 CS 토픽 추가', href: '/admin/cs-topics/new', icon: GraduationCap },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">대시보드</h1>
        <p className="mt-1 text-muted-foreground">AlgoAtlas 콘텐츠를 관리합니다.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition-colors hover:bg-accent/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className={cn('h-5 w-5', stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              빠른 작업
            </CardTitle>
            <CardDescription>새 콘텐츠를 추가합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto justify-start gap-3 px-4 py-3"
                    asChild
                  >
                    <Link href={action.href}>
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span>{action.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              최근 등록된 문제
            </CardTitle>
            <CardDescription>최근에 추가된 문제들입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentProblems.length === 0 ? (
              <p className="text-sm text-muted-foreground">등록된 문제가 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {recentProblems.map((problem) => (
                  <Link
                    key={problem.id}
                    href={`/admin/problems/${problem.id}/edit`}
                    className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{problem.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {problem.algorithmSlug} / {problem.themeSlug}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{problem.platform}</span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
