import { notFound } from 'next/navigation';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import {
  getThemeBySlug,
  getAlgorithmBySlug,
  getProblemsByThemeSlug,
  getConceptByThemeSlug,
} from '@/lib/firestore';
import { getThemeDifficultyColor } from '@/lib/utils';
import { ThemeDetailClient } from './theme-detail-client';

export const revalidate = 3600;

export default async function ThemeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [theme, problems, concept] = await Promise.all([
    getThemeBySlug(slug),
    getProblemsByThemeSlug(slug),
    getConceptByThemeSlug(slug),
  ]);

  if (!theme) notFound();

  const algorithm = await getAlgorithmBySlug(theme.algorithmSlug);

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
                <BreadcrumbLink href={`/algorithms/${theme.algorithmSlug}`}>
                  {algorithm?.name ?? theme.algorithmSlug}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{theme.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{theme.name}</h1>
              <span className="text-lg text-muted-foreground">{theme.nameEn}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{algorithm?.name ?? theme.algorithmSlug}</Badge>
              <Badge
                variant="outline"
                className={`${getThemeDifficultyColor(theme.difficulty)} border`}
              >
                {theme.difficulty}
              </Badge>
            </div>
            <p className="mt-3 text-muted-foreground">{theme.description}</p>
          </div>

          <ThemeDetailClient
            problems={problems}
            concept={concept}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
