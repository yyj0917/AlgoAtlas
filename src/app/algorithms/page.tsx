import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAlgorithms } from '@/lib/firestore';
import { getIcon } from '@/lib/icon-map';

export const revalidate = 3600; // 1시간 캐시

export default async function AlgorithmsPage() {
  const algorithms = await getAlgorithms();

  const totalThemes = algorithms.reduce((acc, a) => acc + (a.themeCount ?? 0), 0);
  const totalProblems = algorithms.reduce((acc, a) => acc + (a.problemCount ?? 0), 0);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">알고리즘</h1>
            <p className="mt-1 text-muted-foreground">
              {algorithms.length}개 카테고리 · {totalThemes}개 테마 · {totalProblems}개 문제
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {algorithms.map((algorithm) => {
              const Icon = getIcon(algorithm.icon);
              return (
                <Link key={algorithm.slug} href={`/algorithms/${algorithm.slug}`}>
                  <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <CardTitle className="mt-3 text-lg">{algorithm.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{algorithm.nameEn}</p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-3 line-clamp-2">
                        {algorithm.description}
                      </CardDescription>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {algorithm.themeCount} 테마
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {algorithm.problemCount} 문제
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
