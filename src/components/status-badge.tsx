import { Badge } from "@/components/ui/badge";
import { cn, statusStyles } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
  dot = true,
}: {
  status: string;
  className?: string;
  dot?: boolean;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-md border px-2 py-0.5 text-[10.5px] font-semibold",
        statusStyles[status] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {status}
    </Badge>
  );
}
