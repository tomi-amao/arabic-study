import type { Col, Section } from "@/lib/types";
import Ar from "./Ar";
import Rich from "./Rich";
import Speak from "./Speak";

export const sectionId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

function Cell({ col, value }: { col: Col; value: string }) {
  if (value === "—" || value === "") return <td className="muted">{value}</td>;
  switch (col.kind) {
    case "ar":
      return (
        <td className="c-ar">
          <Ar>{value}</Ar>
          {value.length > 1 && !value.startsWith("ـ") && <Speak text={value} />}
        </td>
      );
    case "artr": {
      const [a, t] = value.split("|");
      if (a === "—") return <td className="muted">same</td>;
      return (
        <td className="c-artr">
          <Ar>{a}</Ar>
          {t && <span className="tr">{t}</span>}
        </td>
      );
    }
    case "tr":
      return (
        <td>
          <span className="tr">{value}</span>
        </td>
      );
    default:
      return (
        <td className="c-text">
          <Rich text={value} />
        </td>
      );
  }
}

export function SectionView({ s }: { s: Section }) {
  if (s.kind === "note")
    return (
      <aside className={`callout${s.tone === "fix" ? " fix" : ""}`} aria-label={s.title}>
        <h3>
          {s.tone === "fix" && <span aria-hidden="true">✎ </span>}
          <Rich text={s.title} />
        </h3>
        <p>
          <Rich text={s.text} />
        </p>
      </aside>
    );
  if (s.kind === "tips")
    return (
      <section className="section" id="tips">
        <h2>{s.title ?? "Quick tips"}</h2>
        <ul className="tips">
          {s.items.map((t, i) => (
            <li key={i}>
              <Rich text={t} />
            </li>
          ))}
        </ul>
      </section>
    );
  return (
    <section className="section" id={sectionId(s.title)}>
      <h2>
        <Rich text={s.title} />
      </h2>
      {s.intro && (
        <p className="intro">
          <Rich text={s.intro} />
        </p>
      )}
      {s.kind === "table" && (
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                {s.cols.map((c, i) => (
                  <th key={i} scope="col">
                    <Rich text={c.label} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => (
                <tr key={i} className={s.highlight?.includes(i) ? "hl" : undefined}>
                  {r.map((v, j) => (
                    <Cell key={j} col={s.cols[j]} value={v} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.kind === "phrases" && (
        <ul className="phrases">
          {s.items.map((p, i) => (
            <li key={i}>
              <span className="en">{p.en}</span>
              <span className="arside">
                <Ar>{p.ar}</Ar>
                <Speak text={p.ar} />
                {p.tr && <span className="tr" style={{ display: "block" }}>{p.tr}</span>}
                {p.fusha && (
                  <span className="fusha" style={{ display: "block" }}>
                    <span className="tag">Fusha</span>
                    <Ar>{p.fusha}</Ar>
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      {s.kind === "days" && (
        <div className="days">
          {s.items.map((d) => (
            <div className="day" key={d.ar}>
              <Ar>{d.ar}</Ar>
              <span className="tr">{d.tr}</span>
              <div className="small">
                {d.en} <Speak text={d.ar} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
