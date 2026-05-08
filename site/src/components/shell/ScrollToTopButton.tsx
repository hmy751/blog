"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ScrollToTopButton.module.css";

const revealOffset = 360;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const updateVisibility = useCallback(() => {
    frameRef.current = null;

    const nextIsVisible = window.scrollY > revealOffset;
    if (isVisibleRef.current === nextIsVisible) return;

    isVisibleRef.current = nextIsVisible;
    setIsVisible(nextIsVisible);
  }, []);

  const scheduleVisibilityUpdate = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(updateVisibility);
  }, [updateVisibility]);

  useEffect(() => {
    updateVisibility();
    window.addEventListener("scroll", scheduleVisibilityUpdate, { passive: true });
    window.addEventListener("resize", scheduleVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.removeEventListener("resize", scheduleVisibilityUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scheduleVisibilityUpdate, updateVisibility]);

  const handleClick = useCallback(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || document.body.dataset.motion === "off";

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="맨 위로 이동"
      title="맨 위로"
      onClick={handleClick}
    >
      <span className={styles.icon} aria-hidden="true">↑</span>
    </button>
  );
}
