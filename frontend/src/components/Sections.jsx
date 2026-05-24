import { CATEGORIES } from "../data/kazi";

export function Stats({ count }) {
  return (
    <div className="kn-stats">
      {[
        { n: count, l: "Kazi leo" },
        { n: "500+", l: "Wafanyakazi" },
        { n: "6", l: "Maeneo" },
        { n: "✓", l: "Salama & Halisi", accent: true },
      ].map((s, i) => (
        <div className="kn-stat" key={i}>
          <div className="kn-stat-n" style={s.accent ? { color: "var(--g400)" } : {}}>{s.n}</div>
          <div className="kn-stat-l">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

export function TrustBar() {
  const items = [
    { icon: "ti-shield-check", t: "Waajiri waliothibitishwa" },
    { icon: "ti-clock", t: "Malipo ya haraka" },
    { icon: "ti-star", t: "Tathmini za kweli" },
    { icon: "ti-headset", t: "Msaada 24/7" },
  ];
  return (
    <div className="kn-trust">
      {items.map((it, i) => (
        <div className="kn-trust-item" key={i}>
          <i className={`ti ${it.icon}`} /> {it.t}
        </div>
      ))}
    </div>
  );
}

export function FilterPills({ active, onChange }) {
  return (
    <div className="kn-pills">
      {CATEGORIES.map(c => (
        <button
          key={c.id}
          className={`kn-pill${active === c.id ? " active" : ""}`}
          onClick={() => onChange(c.id)}
        >
          <i className={`ti ${c.icon}`} /> {c.label}
        </button>
      ))}
    </div>
  );
}
