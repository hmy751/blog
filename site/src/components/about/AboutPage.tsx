import { Fragment } from "react";
import { Shell } from "@/components/shell/Shell";
import { siteConfig } from "@/lib/site-config";
import "@/app/note-about.module.css";

export default function AboutPage() {
  const { about } = siteConfig;

  return (
    <Shell current="about">
      <main className="view about-page">
        <article className="about-prose" aria-labelledby="about-title">
          <h1 className="about-title" id="about-title">About</h1>
          <div className="about-copy">
            {about.paragraphs.map((paragraph, index) => (
              <p className={index === 0 ? "lead" : undefined} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {about.links.length ? (
          <section className="about-section" aria-labelledby="about-elsewhere-title">
            <div className="about-section-label" id="about-elsewhere-title">Elsewhere</div>
            <dl className="about-grid">
              {about.links.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <Fragment key={link.label}>
                    <dt>{link.label}</dt>
                    <dd>
                      <a
                        className="link"
                        href={link.href}
                        rel={isExternal ? "noreferrer" : undefined}
                        target={isExternal ? "_blank" : undefined}
                      >
                        {link.text}
                      </a>
                    </dd>
                  </Fragment>
                );
              })}
            </dl>
          </section>
        ) : null}

      </main>
    </Shell>
  );
}
