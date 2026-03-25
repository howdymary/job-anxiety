type SalaryRangeProps = {
  min: number;
  max: number;
};

const compactCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0
  }).format(value);

export function SalaryRange({ min, max }: SalaryRangeProps) {
  return <span>{compactCurrency(min)} – {compactCurrency(max)}</span>;
}
