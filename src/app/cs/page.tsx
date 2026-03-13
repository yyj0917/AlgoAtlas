import Link from 'next/link';
import {
  ArrowRight,
  Cpu,
  Network,
  Database,
  Boxes,
  HardDrive,
  Cog,
  Brain,
  Server,
  Shield,
  Cloud,
} from 'lucide-react';

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

const csCategories = [
  {
    slug: 'operating-system',
    name: '운영체제',
    englishName: 'Operating System',
    description: '프로세스, 메모리, 스케줄링 등 OS의 핵심 개념',
    icon: Cpu,
    topicCount: 15,
    questionCount: 120,
  },
  {
    slug: 'network',
    name: '네트워크',
    englishName: 'Network',
    description: 'TCP/IP, HTTP, DNS 등 네트워크 프로토콜과 통신',
    icon: Network,
    topicCount: 12,
    questionCount: 95,
  },
  {
    slug: 'database',
    name: '데이터베이스',
    englishName: 'Database',
    description: 'SQL, 트랜잭션, 인덱싱 등 DB 설계와 최적화',
    icon: Database,
    topicCount: 10,
    questionCount: 85,
  },
  {
    slug: 'data-structure',
    name: '자료구조',
    englishName: 'Data Structure',
    description: '배열, 링크드 리스트, 트리, 그래프 등 기본 자료구조',
    icon: Boxes,
    topicCount: 14,
    questionCount: 110,
  },
  {
    slug: 'computer-architecture',
    name: '컴퓨터 구조',
    englishName: 'Computer Architecture',
    description: 'CPU, 메모리 계층, 캐시, 파이프라이닝',
    icon: HardDrive,
    topicCount: 8,
    questionCount: 60,
  },
  {
    slug: 'compiler',
    name: '컴파일러',
    englishName: 'Compiler',
    description: '렉싱, 파싱, AST, 코드 생성 등 컴파일 과정',
    icon: Cog,
    topicCount: 7,
    questionCount: 45,
  },
  {
    slug: 'machine-learning',
    name: '머신러닝',
    englishName: 'Machine Learning',
    description: '지도/비지도 학습, 딥러닝, 모델 최적화',
    icon: Brain,
    topicCount: 11,
    questionCount: 90,
  },
  {
    slug: 'system-design',
    name: '시스템 설계',
    englishName: 'System Design',
    description: '대규모 시스템 설계, 확장성, 가용성',
    icon: Server,
    topicCount: 9,
    questionCount: 70,
  },
  {
    slug: 'security',
    name: '보안',
    englishName: 'Security',
    description: '암호화, 인증, 취약점 분석 등 보안 기초',
    icon: Shield,
    topicCount: 8,
    questionCount: 55,
  },
  {
    slug: 'distributed-system',
    name: '분산 시스템',
    englishName: 'Distributed System',
    description: 'CAP 정리, 합의 알고리즘, 분산 트랜잭션',
    icon: Cloud,
    topicCount: 6,
    questionCount: 48,
  },
];

export default function CSPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              CS 지식
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              개발자 면접에 필수적인 컴퓨터 과학 핵심 개념을 학습하세요.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {csCategories.map((category) => {
              const Icon = category.icon;
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
                      <CardTitle className="mt-3 text-lg">
                        {category.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {category.englishName}
                      </p>
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
