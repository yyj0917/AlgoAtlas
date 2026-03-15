import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getCSCategories,
  getCSCategoryBySlug,
  getCSTopicById,
  getCSQuestionsByTopicId,
  getCSTopicsByCategorySlug,
} from '@/lib/firestore';
import { getThemeDifficultyColor } from '@/lib/utils';
import { CSTopicClient } from './cs-topic-client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCSCategories();
  const paramsList = await Promise.all(
    categories.map(async (cat) => {
      const topics = await getCSTopicsByCategorySlug(cat.slug);
      return topics.map((topic) => ({ slug: cat.slug, topic: topic.slug }));
    }),
  );
  return paramsList.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; topic: string }>;
}): Promise<Metadata> {
  const { slug: categorySlug, topic: topicSlug } = await params;
  const topicId = `${categorySlug}-${topicSlug}`;

  const [category, topic] = await Promise.all([
    getCSCategoryBySlug(categorySlug),
    getCSTopicById(topicId),
  ]);

  if (!category || !topic) {
    return { title: 'CS 토픽을 찾을 수 없습니다' };
  }

  const title = `${topic.name} (${topic.nameEn})`;
  const description =
    topic.description ||
    `${category.name} > ${topic.name} - CS 핵심 개념과 면접 예상 질문을 학습하세요.`;

  return {
    title,
    description,
    alternates: { canonical: `/cs/${categorySlug}/${topicSlug}` },
    openGraph: {
      title: `${title} | AlgoAtlas`,
      description,
      url: `/cs/${categorySlug}/${topicSlug}`,
    },
  };
}

export default async function CSTopicPage({
  params,
}: {
  params: Promise<{ slug: string; topic: string }>;
}) {
  const { slug: categorySlug, topic: topicSlug } = await params;
  const topicId = `${categorySlug}-${topicSlug}`;

  const [category, topic, questions, siblingTopics] = await Promise.all([
    getCSCategoryBySlug(categorySlug),
    getCSTopicById(topicId),
    getCSQuestionsByTopicId(topicId),
    getCSTopicsByCategorySlug(categorySlug),
  ]);

  if (!category || !topic) notFound();

  const relatedTopics = siblingTopics.filter((t) => t.id !== topicId).slice(0, 5);

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
            <Link href={`/cs/${categorySlug}`} className="text-muted-foreground hover:text-foreground">
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{topic.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={`${getThemeDifficultyColor(topic.difficulty)} border`}
              >
                {topic.difficulty}
              </Badge>
              <Badge variant="secondary">{category.name}</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">{topic.name}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{topic.nameEn}</p>
            <p className="mt-3 text-muted-foreground">{topic.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <CSTopicClient topic={topic} questions={questions} />

            {/* Sidebar */}
            <aside className="space-y-6">
              {relatedTopics.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">관련 토픽</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {relatedTopics.map((rt) => (
                      <Link
                        key={rt.id}
                        href={`/cs/${categorySlug}/${rt.slug}`}
                        className="flex items-center justify-between rounded-lg p-2 text-sm transition-colors hover:bg-accent"
                      >
                        <span>{rt.name}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/cs/${categorySlug}`}>목록으로 돌아가기</Link>
              </Button>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
