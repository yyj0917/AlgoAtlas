import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getAlgorithms, getAlgorithmBySlug, getThemesByAlgorithmSlug } from '@/lib/firestore';
import { getIcon } from '@/lib/icon-map';
import { getThemeDifficultyColor } from '@/lib/utils';

export const revalidate = 3600;

export async function generateStaticParams() {
  const algorithms = await getAlgorithms();
  return algorithms.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const algorithm = await getAlgorithmBySlug(slug);

  if (!algorithm) {
    return { title: '알고리즘을 찾을 수 없습니다' };
  }

  const title = `${algorithm.name} (${algorithm.nameEn})`;
  const description =
    algorithm.description ||
    `${algorithm.name} 알고리즘의 개념과 유형별 풀이를 학습하세요. ${algorithm.themeCount}개 테마, ${algorithm.problemCount}개 문제가 준비되어 있습니다.`;

  return {
    title,
    description,
    alternates: { canonical: `/algorithms/${slug}` },
    openGraph: {
      title: `${title} | AlgoAtlas`,
      description,
      url: `/algorithms/${slug}`,
    },
  };
}

export default async function AlgorithmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [algorithm, themes] = await Promise.all([
    getAlgorithmBySlug(slug),
    getThemesByAlgorithmSlug(slug),
  ]);

  if (!algorithm) notFound();

  const allAlgorithms = await getAlgorithms();
  const Icon = getIcon(algorithm.icon);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">홈</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/algorithms">알고리즘</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{algorithm.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-20">
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground">알고리즘 목록</h3>
                <nav className="flex flex-col gap-1">
                  {allAlgorithms.map((algo) => (
                    <Link
                      key={algo.slug}
                      href={`/algorithms/${algo.slug}`}
                      className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                        algo.slug === slug
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {algo.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                      {algorithm.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">{algorithm.nameEn}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">{algorithm.description}</p>
                <div className="mt-4 flex gap-3">
                  <Badge variant="secondary">{algorithm.themeCount} 테마</Badge>
                  <Badge variant="outline">{algorithm.problemCount} 문제</Badge>
                </div>
              </div>

              {/* Theme List */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">테마 목록</h2>
                {themes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">등록된 테마가 없습니다.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {themes.map((theme) => (
                      <Link key={theme.id} href={`/themes/${theme.slug}`}>
                        <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-base">{theme.name}</CardTitle>
                                <p className="text-xs text-muted-foreground">{theme.nameEn}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`${getThemeDifficultyColor(theme.difficulty)} border text-xs`}
                              >
                                {theme.difficulty}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-3 line-clamp-2 text-sm">
                              {theme.description}
                            </CardDescription>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap gap-1">
                                {theme.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>{theme.problemCount} 문제</span>
                                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
