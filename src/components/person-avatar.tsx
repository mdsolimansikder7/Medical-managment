import { avatarTints, cn, initials, type Accent } from "@/lib/utils";

const sizes = {
  xs: "size-7 text-[10px]",
  sm: "size-9 text-[11px]",
  md: "size-10 text-[12px]",
  lg: "size-12 text-[13px]",
  xl: "size-16 text-lg",
} as const;

export function PersonAvatar({
  name,
  accent = "teal",
  size = "md",
  className,
  ring = true,
}: {
  name: string;
  accent?: Accent;
  size?: keyof typeof sizes;
  className?: string;
  ring?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-semibold tracking-tight",
        avatarTints[accent],
        sizes[size],
        ring && "ring-1 ring-inset ring-border/60",
        className,
      )}
    >
      {initials(name)}
    </div>
  );
}
