'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const navLinks = [
  { href: '/algorithms', label: '알고리즘' },
  { href: '/cs', label: 'CS 지식' },
  { href: '/problems', label: '문제' },
  { href: '/search', label: '검색' },
];

export function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleCommandSelect = (href: string) => {
    setCommandOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">
            Algo<span className="text-primary">Atlas</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Search Trigger */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <Button
            variant="outline"
            className="relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="h-4 w-4 xl:mr-2" />
            <span className="hidden text-muted-foreground xl:inline-flex">
              검색...
            </span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCommandOpen(true)}
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="font-bold tracking-tight">
                    Algo<span className="text-primary">Atlas</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="알고리즘, CS 개념, 문제를 검색하세요..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="바로가기">
            <CommandItem onSelect={() => handleCommandSelect('/')}>
              홈
            </CommandItem>
            <CommandItem
              onSelect={() => handleCommandSelect('/algorithms')}
            >
              알고리즘 목록
            </CommandItem>
            <CommandItem onSelect={() => handleCommandSelect('/cs')}>
              CS 지식
            </CommandItem>
            <CommandItem
              onSelect={() => handleCommandSelect('/problems')}
            >
              문제 목록
            </CommandItem>
            <CommandItem onSelect={() => handleCommandSelect('/search')}>
              통합 검색
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="인기 알고리즘">
            <CommandItem
              onSelect={() => handleCommandSelect('/algorithms/dp')}
            >
              다이나믹 프로그래밍
            </CommandItem>
            <CommandItem
              onSelect={() => handleCommandSelect('/algorithms/graph')}
            >
              그래프
            </CommandItem>
            <CommandItem
              onSelect={() => handleCommandSelect('/algorithms/sorting')}
            >
              정렬
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="인기 CS 토픽">
            <CommandItem
              onSelect={() =>
                handleCommandSelect('/cs/operating-system')
              }
            >
              운영체제
            </CommandItem>
            <CommandItem
              onSelect={() => handleCommandSelect('/cs/network')}
            >
              네트워크
            </CommandItem>
            <CommandItem
              onSelect={() => handleCommandSelect('/cs/database')}
            >
              데이터베이스
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
