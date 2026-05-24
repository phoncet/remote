import { useState, useEffect, useRef, useCallback } from "react";
import { SLIDES } from "../data/kazi";

export default function HeroSlider({ onSearch, onCatJump }) {
  const [cur, setCur] = useState(0);
  const [q, setQ] = useState("");
  const [eneo, setEneo] = useState("");
  const timerRef = useRef(null);

  const go = useCallback((n) => {
    setCur((n + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => go(cur + 1), 5200);
    return () => clearInterval(timerRef.current);
  }, [cur, go]);

  const reset = (n) => {
    clearInterval(timerRef.current);
    go(n);
    timerRef.current = setInterval(() => go(n + 1), 5200);
  };

  return (
    <section className="kn-hero" id="top-hero">
      <div className="kn-slides" style={{ transform: `translateX(-${cur * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div key={i} className={`kn-slide${i === cur ? " active" : ""}`}>
            <div className="kn-slide-bg" style={{ backgroundImage: `url('${s.img}')` }} />
            <div className="kn-slide-overlay" />
            <div className="kn-slide-content">
              <div className="kn-slide-tag">
                <i className={`ti ${s.icon}`} style={{ fontSize: 12 }} /> {s.tag}
              </div>
              <h1 className="kn-slide-h">
                {s.h1}<br /><em>{s.em}</em>
              </h1>
              <p className="kn-slide-p">{s.p}</p>
              <button className="kn-slide-cta" onClick={() => onCatJump(s.cat)}>
                <i className="ti ti-search" /> Tafuta Sasa
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="kn-slider-arrow prev" onClick={() => reset(cur - 1)}>
        <i className="ti ti-chevron-left" />
      </button>
      <button className="kn-slider-arrow next" onClick={() => reset(cur + 1)}>
        <i className="ti ti-chevron-right" />
      </button>

      <div className="kn-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`kn-dot${i === cur ? " active" : ""}`} onClick={() => reset(i)} />
        ))}
      </div>

      <div className="kn-search-float">
        <i className="ti ti-search" style={{ color: "var(--ink4)", fontSize: 18, flexShrink: 0 }} />
        <input
          value={q} onChange={e => setQ(e.target.value)}
          placeholder="Tafuta kazi: mpishi, fundi, mlinzi..."
          onKeyDown={e => e.key === "Enter" && onSearch(q, eneo)}
        />
        <div className="kn-sep" />
        <select className="kn-eneo-sel" value={eneo} onChange={e => setEneo(e.target.value)}>
          <option value="">Eneo lote</option>
          {["Kinondoni", "Ilala", "Temeke", "Ubungo", "Kigamboni"].map(v => (
            <option key={v}>{v}</option>
          ))}
        </select>
        <button className="kn-search-btn" onClick={() => onSearch(q, eneo)}>
          <i className="ti ti-search" /> Tafuta
        </button>
      </div>
    </section>
  );
}
