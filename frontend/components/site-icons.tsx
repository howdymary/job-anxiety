import type { PropsWithChildren } from "react";

type IconProps = {
  className?: string;
};

function BaseIcon({ children, className }: PropsWithChildren<IconProps>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className={className ?? "h-5 w-5"}
    >
      {children}
    </svg>
  );
}

export function HomeIcon() {
  return (
    <BaseIcon>
      <path d="M4.5 10.75 12 4.75l7.5 6" />
      <path d="M6.75 9.75v9h10.5v-9" />
    </BaseIcon>
  );
}

export function WorkIcon() {
  return (
    <BaseIcon>
      <rect x="4.5" y="7" width="15" height="11.5" rx="1.5" />
      <path d="M9 7V5.75h6V7" />
      <path d="M4.5 11.5h15" />
    </BaseIcon>
  );
}

export function NotesIcon() {
  return (
    <BaseIcon>
      <path d="M6 4.75h9.75l2.25 2.25V19.25H6Z" />
      <path d="M15.75 4.75v3h3" />
      <path d="M9 10.25h6" />
      <path d="M9 13.25h6" />
    </BaseIcon>
  );
}

export function BuildingIcon() {
  return (
    <BaseIcon>
      <path d="M6 19.25V5.75l6-2v15.5" />
      <path d="M12 8.25h6v11" />
      <path d="M8.5 8.75h1" />
      <path d="M8.5 11.75h1" />
      <path d="M8.5 14.75h1" />
      <path d="M14.5 11.75h1" />
      <path d="M14.5 14.75h1" />
    </BaseIcon>
  );
}

export function TrendsIcon() {
  return (
    <BaseIcon>
      <path d="M5.5 18.5h13" />
      <path d="m7.5 15 3-4 3 2.5 3-5" />
      <path d="M16.5 8.5h3v3" />
    </BaseIcon>
  );
}

export function SearchIcon() {
  return (
    <BaseIcon>
      <circle cx="10.5" cy="10.5" r="4.75" />
      <path d="m14 14 4.25 4.25" />
    </BaseIcon>
  );
}
