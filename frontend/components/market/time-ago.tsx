type TimeAgoProps = {
  value: string;
};

export function TimeAgo({ value }: TimeAgoProps) {
  const target = new Date(value);
  const diffHours = Math.max(1, Math.round((Date.now() - target.getTime()) / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return <span>{diffHours}h ago</span>;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) {
    return <span>{diffDays}d ago</span>;
  }

  const diffWeeks = Math.round(diffDays / 7);
  return <span>{diffWeeks}w ago</span>;
}
