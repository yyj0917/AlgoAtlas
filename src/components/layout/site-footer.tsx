import Link from 'next/link';
import { Github } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AlgoAtlas. All rights reserved.
        </p>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}
