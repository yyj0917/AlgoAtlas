'use client';

import Link from 'next/link';
import { Search, ArrowRight, Layers, Monitor } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getIcon } from '@/lib/icon-map';
import type { Algorithm, CSCategory } from '@/types/firestore';

interface Stats {
  problemCount: number;
  themeCount: number;
  csTopicCount: number;
}

export function HomeClient({
  algorithms,
  csCategories,
  stats,
}: {
  algorithms: Algorithm[];
  csCategories: CSCategory[];
  stats: Stats;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="container relative mx-auto px-4 py-16 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              {/* Platform badges */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500" />
                  백준
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                  프로그래머스
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-orange-500" />
                  LeetCode
                </span>
                <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-purple-500" />
                  CS 면접
                </span>
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                알고리즘 & CS 지식,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  체계적으로 정리하다
                </span>
              </h1>
              <p className="mt-4 text-pretty text-lg text-muted-foreground lg:text-xl">
                코딩 테스트 문제 풀이부터 CS 핵심 개념까지,
                <br className="hidden sm:inline" />
                개발자 면접 준비를 한 곳에서 완성하세요.
              </p>

              {/* Stats — real data */}
              <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    {stats.problemCount > 0 ? `${stats.problemCount}+` : '준비중'}
                  </span>
                  <span className="text-muted-foreground">문제 풀이</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    {stats.themeCount}+
                  </span>
                  <span className="text-muted-foreground">알고리즘 테마</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">
                    {stats.csTopicCount}+
                  </span>
                  <span className="text-muted-foreground">CS 토픽</span>
                </div>
              </div>

              {/* Hero Search Bar */}
              <div className="mt-8">
                <Link href="/search" className="block">
                  <div className="relative mx-auto max-w-xl">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      readOnly
                      placeholder="알고리즘, CS 개념, 문제를 검색하세요..."
                      className="h-12 cursor-pointer rounded-full border-muted-foreground/20 bg-background pl-12 text-base shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                    />
                    <kbd className="pointer-events-none absolute right-4 top-1/2 hidden h-6 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid with Tabs */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="algorithm" className="w-full">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight">카테고리</h2>
                <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                  <TabsTrigger value="algorithm" className="gap-2">
                    <Layers className="h-4 w-4" />
                    알고리즘
                  </TabsTrigger>
                  <TabsTrigger value="cs" className="gap-2">
                    <Monitor className="h-4 w-4" />
                    CS 지식
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="algorithm" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {algorithms.map((alg) => {
                    const Icon = getIcon(alg.icon);
                    return (
                      <Link key={alg.slug} href={`/algorithms/${alg.slug}`}>
                        <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <CardTitle className="mt-3 text-lg">{alg.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{alg.nameEn}</p>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-3 line-clamp-2">
                              {alg.description}
                            </CardDescription>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {alg.themeCount} 테마
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {alg.problemCount} 문제
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="cs" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {csCategories.map((cat) => {
                    const Icon = getIcon(cat.icon);
                    return (
                      <Link key={cat.slug} href={`/cs/${cat.slug}`}>
                        <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <CardTitle className="mt-3 text-lg">{cat.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{cat.nameEn}</p>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-3 line-clamp-2">
                              {cat.description}
                            </CardDescription>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {cat.topicCount} 토픽
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {cat.questionCount} 문항
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
