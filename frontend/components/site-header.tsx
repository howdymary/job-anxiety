"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { HomeIcon, LayoffIcon, NotesIcon, SearchIcon, TrendsIcon, WorkIcon } from "@/components/site-icons";
import { SearchCommand } from "@/components/search-command";

const desktopItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/layoffs", label: "Layoffs" },
  { href: "/trends", label: "Trends" },
  { href: "/career-notes", label: "Career Guides" }
];

const mobileItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/jobs", label: "Jobs", icon: WorkIcon },
  { href: "/layoffs", label: "Layoffs", icon: LayoffIcon },
  { href: "/trends", label: "Trends", icon: TrendsIcon },
  { href: "/career-notes", label: "Guides", icon: NotesIcon }
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
      `fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(45,48,57,0.94)] text-white backdrop-blur transition-transform duration-200 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`,
    [showHeader]
  );

  return (
    <>
      <header className={headerClassName}>
        <div className="mx-auto flex h-16 w-[min(var(--max-w-page),calc(100vw-2rem))] items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="inline-flex items-baseline gap-0.5" aria-label="JobAnxiety.ai home">
              <span className="font-[var(--ja-font-editorial)] text-[1.35rem] tracking-[-0.02em] text-white">JobAnxiety</span>
              <span className="font-[var(--ja-font-editorial)] text-[1.35rem] tracking-[-0.02em] text-[var(--ja-teal-light)]">.ai</span>
            </Link>
            <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
              {desktopItems.map((item) => {
                const active = matchesPath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-5 text-[0.92rem] font-medium tracking-[0.02em] text-white/70 transition-colors hover:text-white ${
                      active ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span className="absolute inset-x-0 bottom-3 h-[2px] bg-[var(--ja-teal)]" aria-hidden="true" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 rounded-[var(--ja-radius-md)] border border-white/12 bg-white/6 px-3 py-2 text-[0.85rem] text-white/70 transition hover:border-white/24 hover:text-white"
              aria-label="Open search"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search</span>
              <span className="data-copy hidden text-[0.72rem] sm:inline">⌘K</span>
            </button>
            <Link
              href="/newsletter"
              className="hidden min-h-[2.75rem] items-center rounded-[var(--ja-radius-md)] bg-[var(--ja-teal)] px-4 text-[0.9rem] font-semibold text-white transition hover:bg-[var(--ja-teal-dark)] sm:inline-flex"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="mobile-only fixed inset-x-3 bottom-3 z-50 rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[rgba(250,250,249,0.96)] px-2 py-1.5 shadow-[var(--ja-shadow-lg)] backdrop-blur"
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
                    active ? "text-[var(--ja-teal)]" : "text-[var(--ja-slate)]"
                  }`}
                >
                  <Icon />
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full ${active ? "bg-[var(--ja-teal)]" : "bg-transparent"}`}
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
