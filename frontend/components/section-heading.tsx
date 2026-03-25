type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div style={{ textAlign: align }} className={align === "center" ? "mx-auto max-w-[42rem]" : "max-w-[42rem]"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="section-title mt-3">{title}</h1>
      {description ? <p className="body-copy muted-copy mt-4">{description}</p> : null}
    </div>
  );
}
