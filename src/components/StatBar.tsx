interface Props {
  label: string;
  value: number;
  max?: number;
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

export default function StatBar({ label, value, max = 150 }: Props) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-24 shrink-0 text-slate-500">
        {STAT_LABELS[label] ?? label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 shrink-0 text-right font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
}
