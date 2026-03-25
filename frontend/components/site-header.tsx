"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { BuildingIcon, HomeIcon, NotesIcon, SearchIcon, TrendsIcon, WorkIcon } from "@/components/site-icons";
import { SearchCommand } from "@/components/search-command";

const desktopItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/career-notes", label: "Career Notes" },
  { href: "/companies", label: "Companies" },
  { href: "/trends", label: "Trends" }
];

const mobileItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/jobs", label: "Jobs", icon: WorkIcon },
  { href: "/career-notes", label: "Notes", icon: NotesIcon },
  { href: "/companies", label: "Companies", icon: BuildingIcon },
  { href: "/trends", label: "Trends", icon: TrendsIcon }
];

const matchesPath = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const shouldShow = currentY < 72 || currentY < previousY;
      setShowHeader(shouldShow);
      previousY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const headerClassName = useMemo(
    () =>
      `fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(250,250,247,0.96)] backdrop-blur transition-transform duration-200 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`,
    [showHeader]
  );

  return (
    <>
      <header className={headerClassName}>
        <div className="mx-auto flex h-14 w-[min(var(--max-w-page),calc(100vw-2rem))] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-[var(--font-display)] text-[1.6rem] leading-none tracking-[-0.03em]">
              Reframe
            </Link>
            <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
              {desktopItems.map((item) => {
                const active = matchesPath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-5 text-[0.95rem] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] ${
                      active ? "text-[var(--color-text)]" : ""
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span className="absolute inset-x-0 bottom-3 h-[2px] bg-[var(--color-text)]" aria-hidden="true" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 border border-[var(--color-border)] px-3 py-2 text-[0.85rem] text-[var(--color-text-muted)] transition hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
            aria-label="Open search"
          >
            <SearchIcon />
            <span className="hidden sm:inline">Search</span>
            <span className="data-copy hidden text-[0.72rem] sm:inline">⌘K</span>
          </button>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="mobile-only fixed inset-x-3 bottom-3 z-50 border border-[var(--color-border)] bg-[rgba(255,255,255,0.96)] px-2 py-1.5 backdrop-blur"
      >
        <ul className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const active = matchesPath(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 py-2 text-[0.72rem] ${
                    active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  <Icon />
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full ${active ? "bg-[var(--color-accent)]" : "bg-transparent"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <SearchCommand open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
