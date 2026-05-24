import { CATEGORIES, REGIONS, DISTRICTS } from "../data/kazi";
import { useState } from "react";

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

export function RegionFilter({ activeRegion, activeDistrict, onRegionChange, onDistrictChange }) {
  const [showDistricts, setShowDistricts] = useState(false);
  
  const currentDistricts = activeRegion ? DISTRICTS[activeRegion] : [];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      padding: "1.5rem",
      background: "#f9f9f9",
      borderRadius: "12px",
      marginBottom: "1.5rem",
    }}>
      {/* Region Filter */}
      <div>
        <label style={{
          display: "block",
          fontSize: "0.9rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
          color: "var(--ink)",
        }}>
          <i className="ti ti-map-pin" style={{ marginRight: "0.5rem" }} />
          Mikoa
        </label>
        <select
          value={activeRegion}
          onChange={(e) => {
            onRegionChange(e.target.value);
            onDistrictChange("");
          }}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--card-border)",
            borderRadius: "8px",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            cursor: "pointer",
            background: "white",
          }}
        >
          <option value="">Mikoa yote</option>
          {REGIONS.map(r => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* District Filter */}
      <div>
        <label style={{
          display: "block",
          fontSize: "0.9rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
          color: "var(--ink)",
        }}>
          <i className="ti ti-location" style={{ marginRight: "0.5rem" }} />
          Wilaya
        </label>
        <select
          value={activeDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
          disabled={!activeRegion}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--card-border)",
            borderRadius: "8px",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            cursor: activeRegion ? "pointer" : "not-allowed",
            background: "white",
            opacity: activeRegion ? 1 : 0.6,
          }}
        >
          <option value="">Wilaya zote</option>
          {currentDistricts.map(d => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
