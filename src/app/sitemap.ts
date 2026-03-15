import { MetadataRoute } from 'next';
import {
  getAlgorithms,
  getAllThemes,
  getAllProblems,
  getCSCategories,
  getCSTopicsByCategorySlug,
} from '@/lib/firestore';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://algoatlas.vercel.app';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [algorithms, themes, problems, csCategories] = await Promise.all([
    getAlgorithms(),
    getAllThemes(),
    getAllProblems(),
    getCSCategories(),
  ]);

  // CS 토픽 수집
  const csTopicsPerCategory = await Promise.all(
    csCategories.map((cat) => getCSTopicsByCategorySlug(cat.slug)),
  );

  const now = new Date();

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/algorithms`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/problems`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/cs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 알고리즘 상세 페이지
  const algorithmPages: MetadataRoute.Sitemap = algorithms.map((algo) => ({
    url: `${siteUrl}/algorithms/${algo.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 테마 상세 페이지
  const themePages: MetadataRoute.Sitemap = themes.map((theme) => ({
    url: `${siteUrl}/themes/${theme.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 문제 상세 페이지
  const problemPages: MetadataRoute.Sitemap = problems.map((problem) => ({
    url: `${siteUrl}/problems/${problem.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // CS 카테고리 페이지
  const csCategoryPages: MetadataRoute.Sitemap = csCategories.map((cat) => ({
    url: `${siteUrl}/cs/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // CS 토픽 페이지
  const csTopicPages: MetadataRoute.Sitemap = csCategories.flatMap((cat, i) =>
    csTopicsPerCategory[i].map((topic) => ({
      url: `${siteUrl}/cs/${cat.slug}/${topic.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  );

  return [
    ...staticPages,
    ...algorithmPages,
    ...themePages,
    ...problemPages,
    ...csCategoryPages,
    ...csTopicPages,
  ];
}
