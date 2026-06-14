import { translateNumber } from "@/utils/translateNumber";

type StatVariant = "open" | "in-progress" | "closed";

interface StatCardProps {
  variant: StatVariant;
  label: string;
  count: number;
}

export function StatCard({ variant, label, count }: StatCardProps) {
  
  const styles: Record<StatVariant, { container: string; dot: string; text: string }> = {
    open: {
      container: "bg-green-50/40 dark:bg-green-950/5 border-green-100/70 hover:border-green-300 dark:border-green-900/30 hover:bg-green-50/80 shadow-[0_4px_12px_-4px_rgba(34,197,94,0.08)] hover:shadow-[0_8px_20px_-4px_rgba(34,197,94,0.15)]",
      dot: "bg-green-500",
      text: "text-green-700 dark:text-green-400"
    },
    "in-progress": {
      container: "bg-yellow-50/40 dark:bg-yellow-950/5 border-yellow-100/70 hover:border-yellow-300 dark:border-yellow-900/30 hover:bg-yellow-50/80 shadow-[0_4px_12px_-4px_rgba(234,179,8,0.08)] hover:shadow-[0_8px_20px_-4px_rgba(234,179,8,0.15)]",
      dot: "bg-yellow-500",
      text: "text-yellow-700 dark:text-yellow-400"
    },
    closed: {
      container: "bg-red-50/40 dark:bg-red-950/5 border-red-100/70 hover:border-red-300 dark:border-red-900/30 hover:bg-red-50/80 shadow-[0_4px_12px_-4px_rgba(239,68,68,0.08)] hover:shadow-[0_8px_20px_-4px_rgba(239,68,68,0.15)]",
      dot: "bg-red-500",
      text: "text-red-700 dark:text-red-400"
    }
  }

  const currentStyle = styles[variant];

  return (
    <div 
      className={`
        flex flex-col items-center justify-between gap-1.5 
        rounded-2xl border p-3.5 
        transition-all duration-300 ease-out 
        hover:-translate-y-0.5 cursor-default
        ${currentStyle.container}
      `}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full animate-pulse-slow ${currentStyle.dot}`} />
        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 select-none">
          {label}
        </span>
      </div>

      <span className={`text-xl font-extrabold tracking-tight mt-0.5 ${currentStyle.text}`}>
        {translateNumber(count)}
      </span>
    </div>
  );
}