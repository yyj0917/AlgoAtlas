import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Clock, HardDrive } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { getProblemById, getSolutionsByProblemId, getProblemsByThemeSlug } from '@/lib/firestore';
import { getDifficultyColor, getProblemUrl } from '@/lib/utils';
import { ProblemCodeSection } from './problem-code-section';

export const revalidate = 3600;

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

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = await getProblemById(id);

  if (!problem) notFound();

  const [solutions, relatedRaw] = await Promise.all([
    getSolutionsByProblemId(problem.id),
    getProblemsByThemeSlug(problem.themeSlug),
  ]);

  const relatedProblems = relatedRaw.filter((p) => p.id !== problem.id).slice(0, 5);
  const primarySolution = solutions[0] ?? null;
  const platformUrl = problem.url || getProblemUrl(problem.platform, problem.platformId);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">홈</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/algorithms/${problem.algorithmSlug}`}>
                      {problem.algorithmSlug}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/themes/${problem.themeSlug}`}>
                      {problem.themeSlug}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{problem.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Problem Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                    {problem.title}
                  </h1>
                  {problem.titleEn && (
                    <span className="text-lg text-muted-foreground">{problem.titleEn}</span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${getPlatformColor(problem.platform)} border`}
                  >
                    {PLATFORM_DISPLAY[problem.platform] ?? problem.platform}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${getDifficultyColor(problem.difficultyLabel)} border`}
                  >
                    {problem.difficultyLabel}
                  </Badge>
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild>
                    <a href={platformUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      원본 문제 보기
                    </a>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">피드백</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>피드백 보내기</DialogTitle>
                        <DialogDescription>오류나 개선 사항을 알려주세요.</DialogDescription>
                      </DialogHeader>
                      <Textarea placeholder="피드백 내용을 입력해주세요..." className="min-h-[120px]" />
                      <div className="flex justify-end">
                        <Button>제출하기</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Solution Section */}
              {primarySolution ? (
                <div className="space-y-8">
                  {/* Approach */}
                  {primarySolution.approach && (
                    <section>
                      <h2 className="mb-4 text-xl font-semibold">접근 방식</h2>
                      <div className="prose prose-gray max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                          {primarySolution.approach}
                        </pre>
                      </div>
                    </section>
                  )}

                  {/* Code */}
                  <section>
                    <h2 className="mb-4 text-xl font-semibold">풀이 코드</h2>
                    <ProblemCodeSection solutions={solutions} />
                  </section>

                  {/* Explanation */}
                  {primarySolution.explanation && (
                    <section>
                      <h2 className="mb-4 text-xl font-semibold">코드 설명</h2>
                      <div className="prose prose-gray max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                          {primarySolution.explanation}
                        </pre>
                      </div>
                    </section>
                  )}

                  {/* Complexity */}
                  {(primarySolution.timeComplexity || primarySolution.spaceComplexity) && (
                    <section>
                      <h2 className="mb-4 text-xl font-semibold">복잡도 분석</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {primarySolution.timeComplexity && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center gap-2 text-base">
                                <Clock className="h-4 w-4 text-primary" />
                                시간 복잡도
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                {primarySolution.timeComplexity}
                              </code>
                            </CardContent>
                          </Card>
                        )}
                        {primarySolution.spaceComplexity && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center gap-2 text-base">
                                <HardDrive className="h-4 w-4 text-primary" />
                                공간 복잡도
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                {primarySolution.spaceComplexity}
                              </code>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                  아직 풀이가 등록되지 않았습니다.
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-20 space-y-6">
                {relatedProblems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">같은 테마 문제</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {relatedProblems.map((rp) => (
                        <Link
                          key={rp.id}
                          href={`/problems/${rp.id}`}
                          className="block rounded-md p-2 transition-colors hover:bg-accent"
                        >
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`${getPlatformColor(rp.platform)} border text-xs`}
                            >
                              {PLATFORM_DISPLAY[rp.platform] ?? rp.platform}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`${getDifficultyColor(rp.difficultyLabel)} border text-xs`}
                            >
                              {rp.difficultyLabel}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm font-medium">{rp.title}</p>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">테마 바로가기</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/themes/${problem.themeSlug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {problem.themeSlug} 문제 목록 보기 →
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
