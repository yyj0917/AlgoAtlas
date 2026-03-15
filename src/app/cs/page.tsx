import type { Metadata } from 'next';
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
import { getCSCategories } from '@/lib/firestore';
import { getIcon } from '@/lib/icon-map';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'CS 지식',
  description:
    '운영체제, 네트워크, 데이터베이스, 자료구조 등 개발자 면접 필수 CS 지식을 체계적으로 학습하세요. 면접 예상 질문과 개념 설명을 한 곳에서 확인하세요.',
  alternates: { canonical: '/cs' },
  openGraph: {
    title: 'CS 지식 | AlgoAtlas',
    description:
      '운영체제, 네트워크, 데이터베이스 등 개발자 면접 필수 CS 개념을 학습하세요.',
    url: '/cs',
  },
};

export default async function CSPage() {
  const categories = await getCSCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">CS 지식</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              개발자 면접에 필수적인 컴퓨터 과학 핵심 개념을 학습하세요.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = getIcon(category.icon);
              return (
                <Link key={category.slug} href={`/cs/${category.slug}`}>
                  <Card className="group h-full transition-all hover:border-secondary/50 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <CardTitle className="mt-3 text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.nameEn}</p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-3 line-clamp-2">
                        {category.description}
                      </CardDescription>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {category.topicCount} 토픽
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {category.questionCount} 문항
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
