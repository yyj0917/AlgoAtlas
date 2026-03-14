'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, MessageSquare, Filter, Copy, Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { getDifficultyColor, getProblemUrl } from '@/lib/utils';
import type { Problem, Concept } from '@/types/firestore';

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

function ConceptContent({ concept }: { concept: Concept | null }) {
  const [copied, setCopied] = React.useState(false);

  if (!concept) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        아직 개념 설명이 준비되지 않았습니다.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="prose prose-gray max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
          {concept.content}
        </pre>
      </div>
      {(concept.timeComplexity || concept.spaceComplexity) && (
        <div className="flex flex-wrap gap-3 text-sm">
          {concept.timeComplexity && (
            <span className="rounded bg-muted px-2 py-1 font-mono">
              시간: {concept.timeComplexity}
            </span>
          )}
          {concept.spaceComplexity && (
            <span className="rounded bg-muted px-2 py-1 font-mono">
              공간: {concept.spaceComplexity}
            </span>
          )}
        </div>
      )}
      <div className="border-t pt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              내용에 오류가 있나요?
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>피드백 보내기</DialogTitle>
              <DialogDescription>오류나 개선 사항을 알려주세요. 검토 후 반영하겠습니다.</DialogDescription>
            </DialogHeader>
            <Textarea placeholder="피드백 내용을 입력해주세요..." className="min-h-[120px]" />
            <div className="flex justify-end">
              <Button>제출하기</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export function ThemeDetailClient({
  problems,
  concept,
}: {
  problems: Problem[];
  concept: Concept | null;
}) {
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [difficultyFilter, setDifficultyFilter] = React.useState('all');

  const filteredProblems = problems.filter((p) => {
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
    if (difficultyFilter !== 'all' && String(p.difficulty) !== difficultyFilter) return false;
    return true;
  });

  return (
    <Tabs defaultValue="concept" className="space-y-6">
      <TabsList>
        <TabsTrigger value="concept">개념 설명</TabsTrigger>
        <TabsTrigger value="problems">문제 목록 ({problems.length})</TabsTrigger>
      </TabsList>

      {/* 개념 설명 탭 */}
      <TabsContent value="concept" className="space-y-8">
        <ConceptContent concept={concept} />
      </TabsContent>

      {/* 문제 목록 탭 */}
      <TabsContent value="problems" className="space-y-6">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">필터:</span>
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="플랫폼" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 플랫폼</SelectItem>
              <SelectItem value="baekjoon">백준</SelectItem>
              <SelectItem value="programmers">프로그래머스</SelectItem>
              <SelectItem value="leetcode">LeetCode</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="난이도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 난이도</SelectItem>
              <SelectItem value="1">1 (쉬움)</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5 (어려움)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problem List */}
        <div className="space-y-3">
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <Badge
                  variant="outline"
                  className={`${getPlatformColor(problem.platform)} shrink-0 border`}
                >
                  {PLATFORM_DISPLAY[problem.platform] ?? problem.platform}
                </Badge>
                <div>
                  <Link
                    href={`/problems/${problem.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {problem.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={`${getDifficultyColor(problem.difficultyLabel)} border`}
                >
                  {problem.difficultyLabel}
                </Badge>
                {problem.hasSolution ? (
                  <Link href={`/problems/${problem.id}`}>
                    <Button variant="outline" size="sm">풀이 보기</Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled>풀이 없음</Button>
                )}
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={problem.url || getProblemUrl(problem.platform, problem.platformId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="원본 문제 보기"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            조건에 맞는 문제가 없습니다.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
