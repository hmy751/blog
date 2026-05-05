import { MermaidRuntime } from "./MermaidRuntime";

type ProseProps = Readonly<{
  html: string;
  className?: string;
}>;

export function Prose({ html, className }: ProseProps) {
  return (
    <>
      <div className={`prose${className ? ` ${className}` : ""}`} dangerouslySetInnerHTML={{ __html: html }} />
      <MermaidRuntime />
    </>
  );
}
