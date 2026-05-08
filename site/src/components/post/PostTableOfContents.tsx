"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./PostTableOfContents.module.css";

type TocItem = {
  id: string;
  level: 2 | 3;
  text: string;
};

const tocViewportQuery = "(min-width: 1264px)";

export function PostTableOfContents() {
  const pathname = usePathname();
  const [canShowToc, setCanShowToc] = useState(false);
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const headingsRef = useRef<HTMLElement[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(tocViewportQuery);
    const updateViewportState = () => {
      setCanShowToc(mediaQuery.matches);
    };

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => {
      mediaQuery.removeEventListener("change", updateViewportState);
    };
  }, []);

  useEffect(() => {
    if (!canShowToc) {
      setItems([]);
      setActiveId("");
      headingsRef.current = [];
      return undefined;
    }

    const headings = [...document.querySelectorAll<HTMLElement>(".prose h2[id], .prose h3[id]")];
    const nextItems = headings
      .map((heading) => ({
        id: heading.id,
        level: Number(heading.tagName.slice(1)) as 2 | 3,
        text: heading.textContent?.trim() ?? ""
      }))
      .filter((item) => item.id && item.text);
    const nextItemIds = new Set(nextItems.map((item) => item.id));

    headingsRef.current = headings.filter((heading) => {
      return nextItemIds.has(heading.id);
    });
    setItems(nextItems);

    const updateActiveHeading = () => {
      frameRef.current = null;

      const headings = headingsRef.current;
      if (!headings.length) {
        setActiveId("");
        return;
      }

      const threshold = Math.min(360, window.innerHeight * 0.4);
      const currentHeading = headings.reduce<HTMLElement | undefined>((current, heading) => {
        return heading.getBoundingClientRect().top <= threshold ? heading : current;
      }, headings[0]);

      setActiveId((previous) => {
        const nextId = currentHeading?.id ?? "";
        return previous === nextId ? previous : nextId;
      });
    };

    const scheduleActiveHeadingUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener("scroll", scheduleActiveHeadingUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveHeadingUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleActiveHeadingUpdate);
      window.removeEventListener("resize", scheduleActiveHeadingUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [canShowToc, pathname]);

  const handleItemClick = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || document.body.dataset.motion === "off";

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}#${encodeURIComponent(id)}`);
    setActiveId(id);
  }, []);

  if (!canShowToc || items.length < 2) {
    return null;
  }

  return (
    <aside className={styles.rail} aria-label="Article table of contents">
      <nav className={styles.toc}>
        <div className={styles.label}>Contents</div>
        <ol className={styles.list}>
          {items.map((item) => (
            <li className={item.level === 3 ? styles.subItem : undefined} key={item.id}>
              <a
                className={activeId === item.id ? styles.active : undefined}
                href={`#${encodeURIComponent(item.id)}`}
                aria-current={activeId === item.id ? "location" : undefined}
                onClick={(event) => handleItemClick(event, item.id)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
