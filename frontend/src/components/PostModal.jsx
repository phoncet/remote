import { useState } from "react";
import { CATEGORIES, REGIONS, DISTRICTS, EMOJI_MAP, nextId } from "../data/kazi";

export default function PostModal({ onClose, onSave }) {
  const [step, setStep] = useState("payment"); // "payment" -> "verify" -> "form"
  const [token, setToken] = useState("");
  const [tokenErr, setTokenErr] = useState("");
  const [form, setForm] = useState({ title: "", cat: "nyumbani", region: "dar", wilaya: "kinondoni", eneo: "Kinondoni", malipo: "", kip: "/siku", aina: "Muda kamili", desc: "", phone: "" });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const currentDistricts = form.region ? DISTRICTS[form.region] : [];

  const verifyToken = () => {
    if (!token.trim()) {
      setTokenErr("Tafadhali weka token yako.");
      return;
    }
    if (token.length < 4) {
      setTokenErr("Token si sahihi.");
      return;
    }
    setTokenErr("");
    setStep("form");
  };

  const submit = () => {
    if (!form.title.trim() || !form.malipo.trim() || !form.desc.trim() || !form.phone.trim() || !form.region || !form.wilaya) {
      setErr("Tafadhali jaza sehemu zote zinazohitajika (*).");
      return;
    }
    const job = {
      id: nextId(),
      title: form.title, cat: form.cat, region: form.region, wilaya: form.wilaya, eneo: form.eneo,
      desc: form.desc,
      malipo: form.malipo.startsWith("Tsh") ? form.malipo : "Tsh " + form.malipo,
      kip: form.kip, icon: EMOJI_MAP[form.cat] || "💼",
      bg: "#FEF3DC", aina: form.aina, haraka: false, user: true,
      createdAt: new Date().toISOString(),
    };
    onSave(job);
    setSuccess(true);
    setTimeout(onClose, 2800);
  };

  return (
    <div className="kn-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="kn-modal">
        <button className="kn-modal-close" onClick={onClose}><i className="ti ti-x" /></button>

        {success ? (
          <div className="kn-success">
            <i className="ti ti-circle-check kn-success-icon" />
            <div className="kn-success-title">Kazi imechapishwa!</div>
            <p className="kn-success-sub">
              Tangazo lako la <strong>"{form.title}"</strong> limeongezwa kwenye orodha ya kazi sasa hivi.
            </p>
          </div>
        ) : step === "payment" ? (
          // STEP 1: PAYMENT SCREEN
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💳</div>
            <div className="kn-modal-title">Lipa Kufanya Tangazo</div>
            <p className="kn-modal-sub">Gharama ya kupost kazi ni TSH 200 tu</p>
            
            <div style={{ 
              background: "rgba(19, 138, 95, 0.05)", 
              border: "2px solid rgba(19, 138, 95, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              margin: "24px 0",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--g700)", marginBottom: "8px" }}>
                TSH 200
              </div>
              <p style={{ fontSize: "13px", color: "var(--ink2)" }}>
                Mtalipwa mara moja kwa kazi unayopost
              </p>
            </div>

            {/* PAYMENT METHODS */}
            <div style={{ 
              background: "#f8f9fa", 
              border: "1px solid var(--card-border)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "20px",
              textAlign: "left"
            }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink1)", marginBottom: "12px" }}>
                <i className="ti ti-credit-card" style={{ marginRight: "6px" }} />
                Njia za Kulipa:
              </div>

              {/* PHONE PAYMENT */}
              <div style={{ 
                background: "#fff",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px"
              }}>
                <div style={{ fontSize: "13px", color: "var(--ink2)", marginBottom: "6px" }}>
                  <strong>📱 Simu (Vodacom M-Pesa):</strong>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: "bold", 
                  color: "var(--g700)",
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                  userSelect: "all"
                }}>
                  0748714091
                </div>
                <div style={{ fontSize: "12px", color: "var(--ink3)", marginTop: "4px" }}>
                  Tumia *150# au aplikeseni ya Vodacom
                </div>
              </div>

              {/* BANK PAYMENT */}
              <div style={{ 
                background: "#fff",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                padding: "12px"
              }}>
                <div style={{ fontSize: "13px", color: "var(--ink2)", marginBottom: "6px" }}>
                  <strong>🏦 Akaunti ya Benki (CRDB):</strong>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: "bold", 
                  color: "var(--g700)",
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                  userSelect: "all"
                }}>
                  0152702858700
                </div>
                <div style={{ fontSize: "12px", color: "var(--ink3)", marginTop: "4px" }}>
                  Jina: KaziNzuri Business Account
                </div>
              </div>
            </div>

            <button 
              className="kn-modal-submit" 
              onClick={() => setStep("verify")}
              style={{ marginBottom: "12px" }}
            >
              <i className="ti ti-check" /> Nimepay - Endelea
            </button>
            <button 
              className="kn-modal-submit" 
              style={{ background: "var(--ink4)", marginTop: "8px" }}
              onClick={onClose}
            >
              <i className="ti ti-x" /> Geuza
            </button>
          </div>
        ) : step === "verify" ? (
          // STEP 2: TOKEN VERIFICATION
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
            <div className="kn-modal-title">Thibitisha Malipo</div>
            <p className="kn-modal-sub">Weka token uliyopata kutoka kwa simu au benki</p>

            {tokenErr && <div className="kn-modal-err"><i className="ti ti-alert-circle" /> {tokenErr}</div>}

            <label className="kn-modal-lbl">Token ya Malipo *</label>
            <input 
              className="kn-modal-input" 
              value={token} 
              onChange={e => { setToken(e.target.value); setTokenErr(""); }} 
              placeholder="Mfano: 12345 au ABC123DEF"
              type="text"
              maxLength="20"
            />

            <p style={{ fontSize: "12px", color: "var(--ink3)", marginTop: "12px", marginBottom: "20px" }}>
              Token itatumwa kwa simu yako baada ya kulipa. Angalia ujumbe wa SMS.
            </p>

            <button 
              className="kn-modal-submit" 
              onClick={verifyToken}
              style={{ marginBottom: "12px" }}
            >
              <i className="ti ti-shield-check" /> Thibitisha Token
            </button>
            <button 
              className="kn-modal-submit" 
              style={{ background: "var(--ink4)", marginTop: "8px" }}
              onClick={() => setStep("payment")}
            >
              <i className="ti ti-arrow-left" /> Rudi
            </button>
          </div>
        ) : (
          // STEP 3: JOB POSTING FORM (after payment verified)
          <>
            <div className="kn-modal-title">Tangaza Kazi Yako</div>
            <div className="kn-modal-sub">
              <i className="ti ti-circle-check" style={{ color: "var(--g600)", marginRight: "6px" }} />
              Malipo yamekubali — sasa jaza maelezo ya kazi
            </div>

            {err && <div className="kn-modal-err"><i className="ti ti-alert-circle" /> {err}</div>}

            <label className="kn-modal-lbl">Jina la kazi *</label>
            <input className="kn-modal-input" value={form.title} onChange={e => { set("title", e.target.value); setErr(""); }} placeholder="Mfano: Mpishi wa nyumba, Fundi wa bomba..." />

            <div className="kn-modal-2col">
              <div>
                <label className="kn-modal-lbl">Aina ya kazi *</label>
                <select className="kn-modal-input" value={form.cat} onChange={e => set("cat", e.target.value)}>
                  {CATEGORIES.filter(c => c.id !== "zote").map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="kn-modal-lbl">Mkoa *</label>
                <select className="kn-modal-input" value={form.region} onChange={e => { set("region", e.target.value); set("wilaya", ""); }}>
                  {REGIONS.map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="kn-modal-2col">
              <div>
                <label className="kn-modal-lbl">Wilaya *</label>
                <select className="kn-modal-input" value={form.wilaya} onChange={e => set("wilaya", e.target.value)}>
                  <option value="">Chagua wilaya</option>
                  {currentDistricts.map(d => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="kn-modal-lbl">Eneo (Jina la mahali)</label>
                <input className="kn-modal-input" value={form.eneo} onChange={e => set("eneo", e.target.value)} placeholder="Mfano: Kariakoo, Upanga..." />
              </div>
            </div>

            <div className="kn-modal-2col">
              <div>
                <label className="kn-modal-lbl">Malipo *</label>
                <input className="kn-modal-input" value={form.malipo} onChange={e => { set("malipo", e.target.value); setErr(""); }} placeholder="Tsh 15,000" />
              </div>
              <div>
                <label className="kn-modal-lbl">Kipindi</label>
                <select className="kn-modal-input" value={form.kip} onChange={e => set("kip", e.target.value)}>
                  {["/siku", "/mwezi", "/kazi"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <label className="kn-modal-lbl">Aina ya muda</label>
            <select className="kn-modal-input" value={form.aina} onChange={e => set("aina", e.target.value)}>
              {["Muda kamili", "Sehemu", "Mara moja"].map(v => <option key={v}>{v}</option>)}
            </select>

            <label className="kn-modal-lbl">Maelezo ya kazi *</label>
            <textarea className="kn-modal-input kn-modal-textarea" value={form.desc} onChange={e => { set("desc", e.target.value); setErr(""); }} placeholder="Eleza kazi, masaa ya kufanya kazi, mahitaji..." />

            <label className="kn-modal-lbl">Nambari ya mawasiliano *</label>
            <input className="kn-modal-input" type="tel" value={form.phone} onChange={e => { set("phone", e.target.value); setErr(""); }} placeholder="0712 345 678" />

            <button className="kn-modal-submit" onClick={submit}>
              <i className="ti ti-plus" /> Chapisha Tangazo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
