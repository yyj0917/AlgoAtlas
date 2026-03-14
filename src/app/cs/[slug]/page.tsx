import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, BookOpen, FileQuestion } from 'lucide-react';

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
import { getCSCategoryBySlug, getCSTopicsByCategorySlug } from '@/lib/firestore';
import { getIcon } from '@/lib/icon-map';
import { getThemeDifficultyColor } from '@/lib/utils';

export const revalidate = 3600;

export default async function CSCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, topics] = await Promise.all([
    getCSCategoryBySlug(slug),
    getCSTopicsByCategorySlug(slug),
  ]);

  if (!category) notFound();

  const Icon = getIcon(category.icon);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto flex items-center gap-2 px-4 py-3 text-sm lg:px-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground">홈</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/cs" className="text-muted-foreground hover:text-foreground">CS 지식</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{category.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{category.name}</h1>
                <p className="mt-1 text-muted-foreground">{category.nameEn}</p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
            <div className="mt-4 flex gap-3">
              <Badge variant="secondary" className="text-sm">
                <BookOpen className="mr-1 h-3 w-3" />
                {topics.length} 토픽
              </Badge>
              <Badge variant="outline" className="text-sm">
                <FileQuestion className="mr-1 h-3 w-3" />
                {topics.reduce((sum, t) => sum + (t.questionCount ?? 0), 0)} 문항
              </Badge>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold">토픽 목록</h2>
          {topics.length === 0 ? (
            <p className="text-sm text-muted-foreground">등록된 토픽이 없습니다.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => (
                <Link key={topic.id} href={`/cs/${slug}/${topic.slug}`}>
                  <Card className="group h-full transition-all hover:border-secondary/50 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Badge
                          variant="outline"
                          className={`${getThemeDifficultyColor(topic.difficulty)} border`}
                        >
                          {topic.difficulty}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <CardTitle className="mt-2 text-lg">{topic.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{topic.nameEn}</p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-3 line-clamp-2">
                        {topic.description}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {topic.questionCount} 문항
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
