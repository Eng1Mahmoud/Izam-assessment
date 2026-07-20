import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import StatBar from "../../components/StatBar";

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-slate-300 text-slate-800",
  fire: "bg-orange-400 text-white",
  water: "bg-blue-400 text-white",
  electric: "bg-yellow-300 text-yellow-900",
  grass: "bg-green-400 text-white",
  ice: "bg-cyan-300 text-cyan-900",
  fighting: "bg-red-500 text-white",
  poison: "bg-purple-400 text-white",
  ground: "bg-amber-500 text-white",
  flying: "bg-indigo-300 text-indigo-900",
  psychic: "bg-pink-400 text-white",
  bug: "bg-lime-400 text-lime-900",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-violet-600 text-white",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-slate-700 text-white",
  steel: "bg-slate-400 text-white",
  fairy: "bg-pink-300 text-pink-900",
};

export default function DetailContent({ id }: { id: string }) {
  const { data } = usePokemonDetail(id);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-5 text-white text-center">
        <p className="text-lg font-semibold">⚡ {capitalize(data.name)}</p>
        <p className="text-sm opacity-80">#{String(data.id).padStart(3, "0")}</p>
      </div>

      {/* Two-column body: sprite/types/height/weight on the left,
          stats/abilities/xp on the right (matches reference design). */}
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col items-center">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-50">
            <img
              src={data.sprite}
              alt={data.name}
              className="h-32 w-32 object-contain"
            />
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {data.types.map((t) => (
              <span
                key={t}
                className={`rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${
                  TYPE_COLORS[t] ?? "bg-slate-300 text-slate-800"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-slate-50 py-3">
              <p className="text-xs text-slate-400">📏 Height</p>
              <p className="text-sm font-semibold text-slate-700">
                {(data.height / 10).toFixed(1)} m
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 py-3">
              <p className="text-xs text-slate-400">⚖️ Weight</p>
              <p className="text-sm font-semibold text-slate-700">
                {(data.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="mb-6">
            <p className="mb-3 text-sm font-bold text-slate-800">Base Stats</p>
            <div className="space-y-2.5">
              {data.stats.map((s) => (
                <StatBar key={s.name} label={s.name} value={s.value} />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-sm font-bold text-slate-800">Abilities</p>
            <div className="flex flex-wrap gap-1.5">
              {data.abilities.map((a) => (
                <span
                  key={a.name}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs capitalize text-slate-600"
                >
                  {a.name.replace(/-/g, " ")}
                  {a.isHidden && <span className="ml-1 text-slate-400">(Hidden)</span>}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800">Base Experience</p>
            <p className="text-2xl font-bold text-violet-500">{data.baseExperience} XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
