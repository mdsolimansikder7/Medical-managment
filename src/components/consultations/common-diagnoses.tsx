import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const diagnoses = [
  { name: "Hypertension", count: 186, share: 28, color: "bg-teal-500" },
  { name: "Type 2 diabetes", count: 146, share: 22, color: "bg-violet-500" },
  { name: "Migraine", count: 106, share: 16, color: "bg-sky-500" },
  { name: "Asthma", count: 80, share: 12, color: "bg-emerald-500" },
  { name: "Dermatitis", count: 60, share: 9, color: "bg-amber-500" },
];

export function CommonDiagnoses() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Common diagnoses
        </CardTitle>
        <CardDescription className="text-[12px]">
          Across 664 consultations this month
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-5 py-4">
        {diagnoses.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`size-1.5 rounded-full ${item.color}`} />
              <span className="text-[11.5px] font-medium">{item.name}</span>
              <span className="tabular ml-auto text-[10.5px] text-muted-foreground">
                {item.count} cases
              </span>
              <span className="tabular w-7 text-right text-[10.5px] font-semibold">
                {item.share}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.share / 28) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
