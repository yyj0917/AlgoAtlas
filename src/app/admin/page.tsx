'use client';

import Link from 'next/link';
import {
  Layers,
  BookOpen,
  FileCode2,
  Plus,
  Clock,
  Monitor,
  GraduationCap,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  {
    label: '전체 알고리즘',
    value: 10,
    icon: Layers,
    href: '/admin/algorithms',
    color: 'text-primary',
  },
  {
    label: '전체 테마',
    value: 70,
    icon: BookOpen,
    href: '/admin/themes',
    color: 'text-primary',
  },
  {
    label: '전체 문제',
    value: 506,
    icon: FileCode2,
    href: '/admin/problems',
    color: 'text-green-600',
  },
  {
    label: 'CS 카테고리',
    value: 10,
    icon: Monitor,
    href: '/admin/cs-categories',
    color: 'text-secondary',
  },
  {
    label: 'CS 토픽',
    value: 95,
    icon: GraduationCap,
    href: '/admin/cs-topics',
    color: 'text-secondary',
  },
];

const recentProblems = [
  {
    id: '12865',
    title: '평범한 배낭',
    algorithm: '다이나믹 프로그래밍',
    theme: '배낭 문제',
    createdAt: '2시간 전',
  },
  {
    id: '1916',
    title: '최소비용 구하기',
    algorithm: '그래프',
    theme: '다익스트라',
    createdAt: '5시간 전',
  },
  {
    id: '11053',
    title: '가장 긴 증가하는 부분 수열',
    algorithm: '다이나믹 프로그래밍',
    theme: 'LIS',
    createdAt: '1일 전',
  },
  {
    id: '2206',
    title: '벽 부수고 이동하기',
    algorithm: '그래프',
    theme: 'BFS',
    createdAt: '2일 전',
  },
  {
    id: '9251',
    title: 'LCS',
    algorithm: '다이나믹 프로그래밍',
    theme: 'LCS',
    createdAt: '3일 전',
  },
];

const quickActions = [
  { label: '새 알고리즘 추가', href: '/admin/algorithms/new', icon: Layers },
  { label: '새 테마 추가', href: '/admin/themes/new', icon: BookOpen },
  { label: '새 문제 추가', href: '/admin/problems/new', icon: FileCode2 },
  {
    label: '새 CS 카테고리 추가',
    href: '/admin/cs-categories/new',
    icon: Monitor,
  },
  {
    label: '새 CS 토픽 추가',
    href: '/admin/cs-topics/new',
    icon: GraduationCap,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          대시보드
        </h1>
        <p className="mt-1 text-muted-foreground">
          AlgoAtlas 콘텐츠를 관리합니다.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
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

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
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

        {/* Recent Problems */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              최근 등록된 문제
            </CardTitle>
            <CardDescription>최근에 추가된 문제들입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProblems.map((problem) => (
                <Link
                  key={problem.id}
                  href={`/admin/problems/${problem.id}/edit`}
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {problem.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {problem.algorithm} / {problem.theme}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {problem.createdAt}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
