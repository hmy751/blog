import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Shell.module.css";

export type NavKey = "home" | "articles" | "note" | "about";

type ShellProps = Readonly<{
  children: ReactNode;
  current?: NavKey;
  footerExtra?: ReactNode;
  shellClassName?: string;
}>;

const navItems: Array<{ href: string; label: string; key: NavKey }> = [
  { href: "/articles/", label: "Articles", key: "articles" },
  { href: "/note/", label: "Note", key: "note" }
];

export function Shell({ children, current = "home", footerExtra, shellClassName }: ShellProps) {
  const year = new Date().getFullYear();

  return (
    <div className={`shell${shellClassName ? ` ${shellClassName}` : ""}`}>
      <header className="top">
        <Link className="brand" href="/" aria-label="myeongyeon ham home">
          <span className="dot" aria-hidden="true" />
          <span>myeongyeon ham</span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} aria-current={current === item.key ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="foot">
        <span>Blog / {year}</span>
        <span className="links">
          {footerExtra}
          <Link href="/articles/">Archive</Link>
        </span>
      </footer>
    </div>
  );
}
