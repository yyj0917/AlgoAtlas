'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
} from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getThemeDifficultyColor } from '@/lib/utils';

const topicData = {
  categorySlug: 'operating-system',
  categoryName: '운영체제',
  slug: 'process-thread',
  name: '프로세스와 스레드',
  englishName: 'Process & Thread',
  difficulty: '기초',
  description: '프로세스와 스레드의 개념, 차이점, 생명주기를 학습합니다.',
  content: `## 프로세스 (Process)

프로세스는 **실행 중인 프로그램**을 의미합니다. 운영체제로부터 자원을 할당받아 동작하는 작업의 단위입니다.

### 프로세스의 특징
- 독립된 메모리 공간 (Code, Data, Stack, Heap)
- 최소 1개의 스레드(메인 스레드)를 포함
- 프로세스 간 통신(IPC)이 필요

### 프로세스 상태

\`\`\`
New → Ready → Running → Waiting → Terminated
\`\`\`

| 상태 | 설명 |
|------|------|
| New | 프로세스 생성 중 |
| Ready | CPU 할당 대기 |
| Running | 실행 중 |
| Waiting | I/O 완료 대기 |
| Terminated | 실행 완료 |

## 스레드 (Thread)

스레드는 프로세스 내에서 실행되는 **실행 흐름의 단위**입니다.

### 스레드의 특징
- 프로세스의 자원을 공유 (Code, Data, Heap)
- 독립적인 Stack과 PC(Program Counter)
- 컨텍스트 스위칭 비용이 프로세스보다 적음

## 프로세스 vs 스레드

| 구분 | 프로세스 | 스레드 |
|------|----------|--------|
| 메모리 | 독립적 | 공유 |
| 통신 | IPC 필요 | 전역 변수 |
| 생성 비용 | 높음 | 낮음 |
| 안정성 | 높음 | 낮음 |`,
  questions: [
    {
      id: 'q1',
      question: '프로세스와 스레드의 가장 큰 차이점은 무엇인가요?',
      answer:
        '프로세스는 독립된 메모리 공간을 가지지만, 스레드는 프로세스 내에서 Code, Data, Heap 영역을 공유하고 Stack만 독립적으로 가집니다. 이로 인해 스레드 간 통신이 빠르지만 동기화 문제가 발생할 수 있습니다.',
      difficulty: '기초',
      tags: ['프로세스', '스레드', '메모리'],
      completed: true,
    },
    {
      id: 'q2',
      question:
        '컨텍스트 스위칭이란 무엇이며, 프로세스와 스레드에서 어떤 차이가 있나요?',
      answer:
        '컨텍스트 스위칭은 CPU가 현재 실행 중인 작업을 중단하고 다른 작업으로 전환하는 과정입니다. 프로세스 컨텍스트 스위칭은 전체 메모리 공간과 PCB를 저장/복원해야 하므로 비용이 높습니다. 반면 스레드는 Stack과 레지스터만 전환하면 되어 상대적으로 가볍습니다.',
      difficulty: '중급',
      tags: ['컨텍스트 스위칭', 'PCB', 'TCB'],
      completed: true,
    },
    {
      id: 'q3',
      question: 'PCB(Process Control Block)에는 어떤 정보가 저장되나요?',
      answer:
        'PCB에는 프로세스 상태, 프로그램 카운터(PC), CPU 레지스터, 스케줄링 정보(우선순위), 메모리 관리 정보(페이지 테이블), 입출력 상태 정보, 계정 정보 등이 저장됩니다.',
      difficulty: '기초',
      tags: ['PCB', '프로세스 관리'],
      completed: false,
    },
    {
      id: 'q4',
      question: '멀티스레드 환경에서 발생할 수 있는 동기화 문제와 해결 방법은?',
      answer:
        'Race Condition, Deadlock, Starvation 등의 문제가 발생할 수 있습니다. 해결 방법으로는 Mutex(상호 배제), Semaphore(세마포어), Monitor, Atomic 연산 등을 사용할 수 있습니다. 또한 임계 영역(Critical Section)을 최소화하고 적절한 락 순서를 정하는 것이 중요합니다.',
      difficulty: '중급',
      tags: ['동기화', 'Race Condition', 'Mutex'],
      completed: false,
    },
    {
      id: 'q5',
      question: '사용자 수준 스레드와 커널 수준 스레드의 차이점은 무엇인가요?',
      answer:
        '사용자 수준 스레드는 라이브러리에서 관리되어 커널이 인식하지 못하고, 컨텍스트 스위칭이 빠르지만 하나의 스레드가 블록되면 전체 프로세스가 블록됩니다. 커널 수준 스레드는 OS가 직접 관리하여 멀티프로세서 활용이 가능하고 하나가 블록되어도 다른 스레드가 실행될 수 있지만, 생성/관리 오버헤드가 큽니다.',
      difficulty: '심화',
      tags: ['사용자 스레드', '커널 스레드'],
      completed: false,
    },
  ],
  relatedTopics: [
    {
      slug: 'cpu-scheduling',
      name: 'CPU 스케줄링',
      categorySlug: 'operating-system',
    },
    {
      slug: 'synchronization',
      name: '동기화',
      categorySlug: 'operating-system',
    },
    { slug: 'deadlock', name: '데드락', categorySlug: 'operating-system' },
  ],
  references: [
    {
      title: 'Operating System Concepts (공룡책)',
      url: 'https://www.os-book.com/',
    },
    { title: 'KOCW 운영체제 강의', url: 'http://www.kocw.net/' },
  ],
};

function QuestionCard({
  question,
  index,
}: {
  question: (typeof topicData.questions)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer transition-colors hover:bg-muted/50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-0.5">
                {question.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-base font-medium">
                    Q{index + 1}. {question.question}
                  </CardTitle>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={`${getThemeDifficultyColor(question.difficulty)} border text-xs`}
                  >
                    {question.difficulty}
                  </Badge>
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="border-t bg-muted/30 pt-4">
            <p className="text-sm leading-relaxed text-foreground/90">
              {question.answer}
            </p>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default function CSTopicPage() {
  const totalCount = topicData.questions.length;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto flex items-center gap-2 px-4 py-3 text-sm lg:px-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              홈
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/cs" className="text-muted-foreground hover:text-foreground">
              CS 지식
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href={`/cs/${topicData.categorySlug}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {topicData.categoryName}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{topicData.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={`${getThemeDifficultyColor(topicData.difficulty)} border`}
              >
                {topicData.difficulty}
              </Badge>
              <Badge variant="secondary">{topicData.categoryName}</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
              {topicData.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {topicData.englishName}
            </p>
            <p className="mt-3 text-muted-foreground">{topicData.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <Tabs defaultValue="concept" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2 lg:inline-grid lg:w-auto">
                  <TabsTrigger value="concept" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    개념 정리
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="gap-2">
                    면접 문항
                    <Badge
                      variant="secondary"
                      className="ml-1 px-1.5 py-0 text-xs"
                    >
                      {totalCount}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="concept" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose prose-sm max-w-none dark:prose-invert [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-1 [&_p]:my-3 [&_p]:leading-relaxed [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_ul]:my-3">
                        <pre className="whitespace-pre-wrap font-sans text-sm">
                          {topicData.content}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="questions" className="mt-0">
                  <div className="space-y-4">
                    {topicData.questions.map((question, index) => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">관련 토픽</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {topicData.relatedTopics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/cs/${topic.categorySlug}/${topic.slug}`}
                      className="flex items-center justify-between rounded-lg p-2 text-sm transition-colors hover:bg-accent"
                    >
                      <span>{topic.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">참고 자료</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {topicData.references.map((ref) => (
                    <a
                      key={ref.url}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg p-2 text-sm transition-colors hover:bg-accent"
                    >
                      <span className="truncate">{ref.title}</span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </a>
                  ))}
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/cs/${topicData.categorySlug}`}>
                  목록으로 돌아가기
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
