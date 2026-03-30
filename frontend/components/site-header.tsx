"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, HomeIcon, LayoffIcon, MenuIcon, NotesIcon, SearchIcon, TrendsIcon, WorkIcon } from "@/components/site-icons";
import { SearchCommand } from "@/components/search-command";

const desktopItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/layoffs", label: "Layoffs" },
  { href: "/trends", label: "Trends" },
  { href: "/research", label: "Research" },
  { href: "/career-notes", label: "Career Guides" },
  { href: "/about", label: "About" }
];

const mobileItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/jobs", label: "Jobs", icon: WorkIcon },
  { href: "/research", label: "Research", icon: NotesIcon }
];

const menuItems = [
  { href: "/layoffs", label: "Layoffs", icon: LayoffIcon },
  { href: "/trends", label: "Trends", icon: TrendsIcon },
  { href: "/career-notes", label: "Career Guides", icon: NotesIcon },
  { href: "/companies", label: "Companies", icon: WorkIcon },
  { href: "/about", label: "About", icon: NotesIcon },
  { href: "/check-your-occupation", label: "Occupation check", icon: SearchIcon },
  { href: "/newsletter", label: "Newsletter", icon: SearchIcon },
  { href: "/methodology", label: "Methodology", icon: NotesIcon },
  { href: "/press", label: "Press", icon: NotesIcon },
  { href: "/api", label: "API", icon: NotesIcon },
  { href: "/corrections", label: "Corrections", icon: NotesIcon }
];

const matchesPath = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [showHeader, setShowHeader] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (!menuOpen) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--ja-fog)] bg-[var(--ja-paper)] text-[var(--ja-ink)] transition-transform duration-300 ease-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-16 w-[min(var(--max-w-page),calc(100vw-2rem))] items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="inline-flex items-baseline gap-0.5" aria-label="JobAnxiety.ai home">
              <span className="font-[var(--ja-font-editorial)] text-[1.35rem] tracking-[-0.02em] text-[var(--ja-ink)]">JobAnxiety</span>
              <span className="font-[var(--ja-font-editorial)] text-[1.35rem] tracking-[-0.02em] text-[var(--ja-teal)]">.ai</span>
            </Link>
            <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
              {desktopItems.map((item) => {
                const active = matchesPath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-5 text-[0.92rem] font-medium tracking-[0.01em] text-[var(--ja-slate)] transition-colors hover:text-[var(--ja-ink)] ${
                      active ? "font-semibold text-[var(--ja-ink)]" : ""
                    }`}
                  >
                    {item.label}
                    {active ? <span className="absolute inset-x-0 bottom-3 h-[2px] bg-[var(--ja-ink)]" aria-hidden="true" /> : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="inline-flex min-h-[2.6rem] items-center gap-2 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-3 text-[0.88rem] text-[var(--ja-slate)] transition hover:border-[var(--ja-teal)] hover:text-[var(--ja-ink)]"
              aria-label="Open search"
              aria-haspopup="dialog"
              aria-expanded={commandOpen}
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search</span>
            </button>
            <Link
              href="/newsletter"
              className="hidden min-h-[2.6rem] items-center rounded-[var(--ja-radius-md)] border border-transparent px-1 text-[0.88rem] font-medium text-[var(--ja-slate)] transition hover:text-[var(--ja-ink)] sm:inline-flex"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </header>

      <nav aria-label="Mobile navigation" className="mobile-only fixed inset-x-3 bottom-3 z-50 md:hidden">
        <div className="rounded-[var(--ja-radius-xl)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-2 py-1.5 shadow-[var(--ja-shadow-md)]">
          <ul className="grid grid-cols-4 gap-1">
            {mobileItems.map((item) => {
              const active = matchesPath(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center gap-1.5 rounded-[var(--ja-radius-md)] py-2 text-[0.7rem] ${
                      active ? "text-[var(--ja-ink)]" : "text-[var(--ja-slate)]"
                    }`}
                  >
                    <Icon />
                    <span className={active ? "font-semibold" : ""}>{item.label}</span>
                    <span aria-hidden="true" className={`h-1 w-1 rounded-full ${active ? "bg-[var(--ja-ink)]" : "bg-transparent"}`} />
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex w-full flex-col items-center gap-1.5 rounded-[var(--ja-radius-md)] py-2 text-[0.7rem] text-[var(--ja-slate)]"
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
              >
                <MenuIcon />
                <span>Menu</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-transparent" />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] bg-[rgba(26,29,35,0.2)]" role="presentation" onClick={() => setMenuOpen(false)}>
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[1.5rem] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-5 shadow-[var(--ja-shadow-xl)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Menu</p>
                <p className="fine-print mt-2">Site sections and reference pages</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ja-fog)] bg-[var(--ja-paper)] text-[var(--ja-slate)]"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <MenuGroup title="Navigation" links={menuItems.slice(0, 6)} onNavigate={() => setMenuOpen(false)} />
              <MenuGroup title="Resources" links={menuItems.slice(6)} onNavigate={() => setMenuOpen(false)} />
            </div>

            <div className="mt-6 border-t border-[var(--ja-fog)] pt-4">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setCommandOpen(true);
                }}
                className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-[var(--ja-ink)]"
              >
                <SearchIcon />
                Search the site
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      <SearchCommand open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}

function MenuGroup({
  title,
  links,
  onNavigate
}: {
  title: string;
  links: Array<{ href: string; label: string; icon?: typeof HomeIcon }>;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--ja-steel)]">{title}</p>
      <ul className="mt-3 grid gap-1">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-[var(--ja-radius-md)] px-3 py-3 text-[0.95rem] text-[var(--ja-ink)] transition hover:bg-[var(--ja-cloud)]"
            >
              {item.icon ? <item.icon /> : null}
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <span className="text-[var(--ja-steel)]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
