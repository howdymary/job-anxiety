type MarketHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function MarketHeading({ eyebrow, title, description, align = "left" }: MarketHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--rf-muted)]">{eyebrow}</p>
      <h1
        className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--rf-foreground)] sm:text-5xl"
        style={{ fontFamily: "var(--rf-font-display)" }}
      >
        {title}
      </h1>
      <p className="mt-4 text-pretty text-sm leading-7 text-[color:var(--rf-muted)] sm:text-base">{description}</p>
    </div>
  );
}
