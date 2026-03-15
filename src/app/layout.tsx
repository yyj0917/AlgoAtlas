import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://algoatlas.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AlgoAtlas - 알고리즘, 체계적으로 정리하다',
    template: '%s | AlgoAtlas',
  },
  description:
    '백준, 프로그래머스, LeetCode 문제를 유형별로 분류하고, 개념과 풀이를 한 곳에서 학습하세요. 알고리즘 유형별 테마와 CS 지식을 체계적으로 정리했습니다.',
  keywords: [
    '알고리즘',
    '코딩테스트',
    '백준',
    '프로그래머스',
    'LeetCode',
    'CS 지식',
    '자료구조',
    '동적 프로그래밍',
    '그래프',
    '코딩 공부',
    '개발자 취업',
    '알고리즘 풀이',
  ],
  authors: [{ name: 'AlgoAtlas' }],
  creator: 'AlgoAtlas',
  publisher: 'AlgoAtlas',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AlgoAtlas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: 'AlgoAtlas',
    title: 'AlgoAtlas - 알고리즘, 체계적으로 정리하다',
    description:
      '백준, 프로그래머스, LeetCode 문제를 유형별로 분류하고, 개념과 풀이를 한 곳에서 학습하세요.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoAtlas - 알고리즘, 체계적으로 정리하다',
    description:
      '백준, 프로그래머스, LeetCode 문제를 유형별로 분류하고, 개념과 풀이를 한 곳에서 학습하세요.',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#09090b" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
