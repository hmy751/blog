import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import "./Shell.module.css";

export type NavKey = "home" | "articles" | "note" | "about";

type ShellProps = Readonly<{
  children: ReactNode;
  current?: NavKey;
  footerExtra?: ReactNode;
  shellClassName?: string;
}>;

const navItems: Array<{ href: string; label: string; key: NavKey }> = [
  { href: "/articles/", label: "Articles", key: "articles" },
  { href: "/note/", label: "Note", key: "note" },
  { href: "/about/", label: "About", key: "about" }
];

const footerLinks = siteConfig.about.links;

export function Shell({ children, current = "home", footerExtra, shellClassName }: ShellProps) {
  const year = new Date().getFullYear();
  const footerContent = footerExtra ?? (
    <>
      {footerLinks.map((link) => {
        const isExternal = link.href.startsWith("http");

        return (
          <a
            href={link.href}
            key={link.label}
            rel={isExternal ? "noreferrer" : undefined}
            target={isExternal ? "_blank" : undefined}
          >
            {link.label}
          </a>
        );
      })}
    </>
  );

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
        <span className="links">{footerContent}</span>
      </footer>
    </div>
  );
}
