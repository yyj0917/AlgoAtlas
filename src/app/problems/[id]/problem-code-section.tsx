'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Solution } from '@/types/firestore';

const LANG_LABELS: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  rust: 'Rust',
  go: 'Go',
};

export function ProblemCodeSection({ solutions }: { solutions: Solution[] }) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  if (solutions.length === 0) return null;

  const current = solutions[activeIdx]!;

  const copyCode = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <div className="flex">
          {solutions.map((sol, idx) => (
            <button
              key={sol.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                idx === activeIdx
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {LANG_LABELS[sol.language] ?? sol.language}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-zinc-400 hover:text-zinc-100"
          onClick={copyCode}
        >
          {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
          {copied ? '복사됨' : '복사'}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm text-zinc-100">{current.code}</code>
      </pre>
    </div>
  );
}
