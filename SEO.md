# AlgoAtlas SEO 최적화 보고서

## 개요

AlgoAtlas 프로젝트의 검색 엔진 최적화(SEO)를 전면 적용했습니다. Next.js 16 App Router의 Metadata API를 활용하여 정적/동적 메타데이터, Sitemap, robots.txt, JSON-LD 구조화 데이터, 보안 헤더를 포함한 종합 SEO 최적화를 완료했습니다.

---

## 변경 파일 목록

| 파일 | 유형 | 작업 내용 |
|------|------|----------|
| `src/app/layout.tsx` | 수정 | 루트 메타데이터 전면 강화 |
| `src/app/page.tsx` | 수정 | 홈 메타데이터 + JSON-LD WebSite 스키마 |
| `src/app/robots.ts` | 신규 | robots.txt 동적 생성 |
| `src/app/sitemap.ts` | 신규 | 사이트맵 동적 생성 |
| `src/app/algorithms/page.tsx` | 수정 | 알고리즘 목록 페이지 metadata |
| `src/app/algorithms/[slug]/page.tsx` | 수정 | 알고리즘 상세 generateMetadata |
| `src/app/problems/page.tsx` | 수정 | 문제 목록 페이지 metadata |
| `src/app/problems/[id]/page.tsx` | 수정 | 문제 상세 generateMetadata + generateStaticParams |
| `src/app/cs/page.tsx` | 수정 | CS 지식 목록 metadata |
| `src/app/cs/[slug]/page.tsx` | 수정 | CS 카테고리 generateMetadata + generateStaticParams |
| `src/app/cs/[slug]/[topic]/page.tsx` | 수정 | CS 토픽 generateMetadata + generateStaticParams |
| `src/app/themes/[slug]/page.tsx` | 수정 | 테마 상세 generateMetadata + generateStaticParams |
| `src/app/search/page.tsx` | 수정 | Server Component 분리 + metadata |
| `src/app/search/search-content.tsx` | 신규 | Client Component 분리 |
| `next.config.ts` | 수정 | 보안 HTTP 헤더 추가 |

---

## 세부 내용

### 1. 루트 레이아웃 메타데이터 (`src/app/layout.tsx`)

**변경 전**: title + description만 존재

**변경 후** - 다음 항목 추가:
- `metadataBase`: 모든 상대 URL의 기준 도메인 (`NEXT_PUBLIC_SITE_URL` 환경변수)
- `title.template`: 하위 페이지에 `%s | AlgoAtlas` 형식 자동 적용
- `keywords`: 알고리즘, 코딩테스트, 백준, 프로그래머스, LeetCode 등 핵심 키워드 12개
- `robots`: Googlebot 크롤링 최적화 (max-snippet, max-image-preview 등)
- `openGraph`: og:type, og:locale(ko_KR), og:siteName 등
- `twitter`: Twitter Card 메타 (summary_large_image)
- `alternates.canonical`: 정식 URL 설정

### 2. 동적 Sitemap (`src/app/sitemap.ts`)

Firestore에서 실시간으로 모든 콘텐츠 URL을 가져와 sitemap.xml을 생성합니다.

**포함 URL 및 우선순위**:
| 페이지 | changeFrequency | priority |
|--------|----------------|----------|
| 홈(`/`) | daily | 1.0 |
| 알고리즘/문제/CS 목록 | weekly | 0.9 |
| 알고리즘/CS 카테고리 상세 | weekly | 0.8 |
| 테마/CS 토픽 상세 | weekly | 0.7 |
| 문제 상세 | monthly | 0.6 |

- ISR 1시간 revalidation (`export const revalidate = 3600`)
- `/admin/*` 경로는 sitemap에서 제외

### 3. robots.txt (`src/app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://algoatlas.vercel.app/sitemap.xml
```

관리자 페이지를 크롤러로부터 차단합니다.

### 4. 동적 메타데이터 (`generateMetadata`)

각 동적 라우트에 `generateMetadata` 함수를 추가했습니다. Firestore에서 실제 콘텐츠를 조회하여 페이지별 고유한 title/description/OG를 생성합니다.

**예시 - 알고리즘 상세**:
```
title: "다이나믹 프로그래밍 (Dynamic Programming) | AlgoAtlas"
description: "[알고리즘 설명] - N개 테마, M개 문제가 준비되어 있습니다."
og:url: "https://algoatlas.vercel.app/algorithms/dp"
```

**예시 - 문제 상세**:
```
title: "평범한 배낭 | AlgoAtlas"
description: "[백준 골드 IV] 평범한 배낭 - 풀이 접근법과 코드, 복잡도 분석을 확인하세요. 태그: DP, 배낭"
```

### 5. generateStaticParams 추가

기존에 없던 페이지들에 `generateStaticParams`를 추가해 빌드 시 정적으로 사전 생성합니다:

| 라우트 | 기존 | 변경 후 |
|--------|------|---------|
| `/algorithms/[slug]` | ✅ 있음 | 유지 |
| `/problems/[id]` | ❌ 없음 | ✅ 추가 |
| `/cs/[slug]` | ❌ 없음 | ✅ 추가 |
| `/cs/[slug]/[topic]` | ❌ 없음 | ✅ 추가 |
| `/themes/[slug]` | ❌ 없음 | ✅ 추가 |

빌드 결과 `●(SSG)` 심볼로 사전 렌더링 확인:
```
● /algorithms/[slug]   → /algorithms/dp, /algorithms/graph, ...
● /problems/[id]       → /problems/baekjoon-12865, ...
● /cs/[slug]/[topic]   → /cs/operating-system/process-thread, ... (30개+)
● /themes/[slug]       → /themes/stack, /themes/heap, ... (47개+)
```

### 6. canonical URL

모든 페이지에 `alternates.canonical`을 추가해 중복 콘텐츠 문제를 방지합니다.

### 7. JSON-LD 구조화 데이터 (`src/app/page.tsx`)

홈 페이지에 **WebSite** 스키마 + **SearchAction** (사이트 내 검색 기능)을 추가했습니다:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AlgoAtlas",
  "url": "https://algoatlas.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://algoatlas.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

Google 검색 결과에서 사이트링크 검색창(Sitelinks Search Box)이 표시될 수 있습니다.

### 8. Search 페이지 Server Component 분리

기존 `search/page.tsx`는 전체가 `"use client"` 파일이어서 metadata export가 불가능했습니다.

**분리 구조**:
- `search/page.tsx` → Server Component (metadata export + `<SearchContent />` 렌더링)
- `search/search-content.tsx` → Client Component (`useSearchParams`, `useRouter` 사용)

### 9. 보안 HTTP 헤더 (`next.config.ts`)

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

MIME 스니핑 방지, 클릭재킹 방지, 리퍼러 정보 보호 헤더를 추가했습니다.

---

## 환경변수 설정

`.env.local`에 다음 변수를 추가해주세요:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

미설정 시 `https://algoatlas.vercel.app`이 기본값으로 사용됩니다.

---

## 빌드 결과

```
○ /robots.txt          (Static)
○ /sitemap.xml         1h cache (ISR)
○ /algorithms          1h cache
● /algorithms/[slug]   SSG (10개 경로)
○ /problems            1h cache
● /problems/[id]       SSG (6개 경로)
○ /cs                  1h cache
● /cs/[slug]           SSG (8개 경로)
● /cs/[slug]/[topic]   SSG (30개+ 경로)
● /themes/[slug]       SSG (47개+ 경로)
○ /search              Static
```

---

## 추가 권장 사항

다음 항목들은 향후 적용을 권장합니다:

1. **OG 이미지** (`src/app/opengraph-image.tsx`): Next.js ImageResponse로 동적 OG 이미지 생성
2. **Google Search Console 연동**: 사이트맵 제출 및 색인 요청
3. **Naver Webmaster Tools 연동**: 국내 검색 최적화
4. **구조화 데이터 확장**: 알고리즘/문제 상세 페이지에 `LearningResource`, `BreadcrumbList` 스키마 추가
5. **내부 링크 전략**: 관련 문제/테마 간 내부 링크 강화
6. **Core Web Vitals**: LCP, CLS, FID 측정 및 최적화
