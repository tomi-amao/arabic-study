"use client";

export type UnitOpt = { id: string; title: string; tone: string };

export function readQuery() {
  const q = new URLSearchParams(window.location.search);
  return { unit: q.get("unit"), from: q.get("from") };
}

export function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** Topic filter chips. An empty selection means "all topics". */
export function UnitPicker({ units, picked, setPicked }: { units: UnitOpt[]; picked: string[]; setPicked: (p: string[]) => void }) {
  return (
    <div>
      <div className="label" id="topics-label">
        Topics
      </div>
      <div className="row" role="group" aria-labelledby="topics-label" style={{ marginTop: 6 }}>
        <button type="button" className="chip" aria-pressed={picked.length === 0} onClick={() => setPicked([])}>
          All
        </button>
        {units.map((u) => (
          <button
            key={u.id}
            type="button"
            className={`chip tone-${u.tone}`}
            aria-pressed={picked.includes(u.id)}
            onClick={() => setPicked(picked.includes(u.id) ? picked.filter((x) => x !== u.id) : [...picked, u.id])}
          >
            {u.title}
          </button>
        ))}
      </div>
    </div>
  );
}
