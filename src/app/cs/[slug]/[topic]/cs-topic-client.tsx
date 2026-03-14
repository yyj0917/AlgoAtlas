'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getThemeDifficultyColor } from '@/lib/utils';
import type { CSTopic, CSQuestion } from '@/types/firestore';

function QuestionCard({ question, index }: { question: CSQuestion; index: number }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer transition-colors hover:bg-muted/50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-0.5">
                <Circle className="h-5 w-5 text-muted-foreground" />
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
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-headings:font-semibold prose-h2:text-base prose-h3:text-sm prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-table:text-xs prose-td:py-1.5 prose-th:py-1.5 prose-li:my-0.5">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.answer}</ReactMarkdown>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export function CSTopicClient({
  topic,
  questions,
}: {
  topic: CSTopic;
  questions: CSQuestion[];
}) {
  return (
    <Tabs defaultValue="concept" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2 lg:inline-grid lg:w-auto">
        <TabsTrigger value="concept" className="gap-2">
          <BookOpen className="h-4 w-4" />
          개념 정리
        </TabsTrigger>
        <TabsTrigger value="questions" className="gap-2">
          면접 문항
          <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
            {questions.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="concept" className="mt-0">
        <Card>
          <CardContent className="pt-6">
            {topic.content ? (
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-headings:font-semibold prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-table:text-xs prose-li:my-0.5">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">아직 개념 설명이 준비되지 않았습니다.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="questions" className="mt-0">
        {questions.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            등록된 문항이 없습니다.
          </p>
        ) : (
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <QuestionCard key={q.id} question={q} index={idx} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
