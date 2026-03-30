import type { ReactNode } from "react";

type ContextPanelProps = {
  title: string;
  body: ReactNode;
  footer?: ReactNode;
};

export function ContextPanel({ title, body, footer }: ContextPanelProps) {
  return (
    <aside className="editorial-card p-5">
      <p className="eyebrow">Context</p>
      <h2 className="section-title mt-3 text-[1.35rem]">{title}</h2>
      <div className="body-copy muted-copy mt-4 grid gap-4">{body}</div>
      {footer ? <div className="mt-5 border-t border-[var(--color-border)] pt-4">{footer}</div> : null}
    </aside>
  );
}
