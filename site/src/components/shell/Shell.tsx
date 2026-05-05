import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Shell.module.css";

export type NavKey = "home" | "articles" | "note" | "about" | "system";

type ShellProps = Readonly<{
  children: ReactNode;
  current?: NavKey;
  system?: boolean;
}>;

const navItems: Array<{ href: string; label: string; key: NavKey }> = [
  { href: "/articles/", label: "Articles", key: "articles" },
  { href: "/note/", label: "Note", key: "note" },
  { href: "/about/", label: "About", key: "about" }
];

export function Shell({ children, current = "home", system = false }: ShellProps) {
  const year = new Date().getFullYear();

  return (
    <div className={`shell${system ? ` ${styles.systemShell}` : ""}`}>
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
          <Link href="/system/">System</Link>
          <Link href="/articles/">Archive</Link>
        </span>
      </footer>
    </div>
  );
}
