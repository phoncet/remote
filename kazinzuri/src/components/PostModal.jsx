import { useState } from "react";
import { CATEGORIES, EMOJI_MAP, nextId } from "../data/kazi";

export default function PostModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: "", cat: "nyumbani", eneo: "Kinondoni", malipo: "", kip: "/siku", aina: "Muda kamili", desc: "", phone: "" });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.title.trim() || !form.malipo.trim() || !form.desc.trim() || !form.phone.trim()) {
      setErr("Tafadhali jaza sehemu zote zinazohitajika (*).");
      return;
    }
    const job = {
      id: nextId(),
      title: form.title, cat: form.cat, eneo: form.eneo,
      desc: form.desc,
      malipo: form.malipo.startsWith("Tsh") ? form.malipo : "Tsh " + form.malipo,
      kip: form.kip, icon: EMOJI_MAP[form.cat] || "💼",
      bg: "#FEF3DC", aina: form.aina, haraka: false, user: true,
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
        ) : (
          <>
            <div className="kn-modal-title">Tangaza Kazi Yako</div>
            <div className="kn-modal-sub">Kazi yako itaonekana mara moja kwenye orodha — bure kabisa</div>

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
                <label className="kn-modal-lbl">Eneo *</label>
                <select className="kn-modal-input" value={form.eneo} onChange={e => set("eneo", e.target.value)}>
                  {["Kinondoni", "Ilala", "Temeke", "Ubungo", "Kigamboni"].map(v => <option key={v}>{v}</option>)}
                </select>
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
              <i className="ti ti-plus" /> Chapisha Tangazo — Bure
            </button>
          </>
        )}
      </div>
    </div>
  );
}
