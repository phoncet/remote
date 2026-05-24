import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function ApplyModal({ job, onClose, onSave }) {
  const { currentUser, addAppliedJob } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const submit = () => {
    if (!name.trim() || !phone.trim()) { 
      setErr("Tafadhali jaza jina na nambari ya simu."); 
      return; 
    }
    
    const applicationData = { name, phone, bio };
    
    // Ikiwa user ameingia, save kwenye UserContext
    if (currentUser) {
      addAppliedJob(job, applicationData);
    }
    
    // Call onSave ikiwa ipo (kwa HomePage compatibility)
    if (onSave) {
      onSave({ ...job, applicationData });
    }
    
    setSuccess(true);
    setTimeout(onClose, 3200);
  };

  return (
    <div className="kn-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="kn-modal">
        <button className="kn-modal-close" onClick={onClose}><i className="ti ti-x" /></button>

        {success ? (
          <div className="kn-success">
            <i className="ti ti-circle-check kn-success-icon" />
            <div className="kn-success-title">Ombi limetumwa!</div>
            <p className="kn-success-sub">
              Ombi lako la kazi ya <strong>"{job.title}"</strong> limetumwa.<br />
              Mwajiri atawasiliana nawe hivi karibuni.
            </p>
          </div>
        ) : (
          <>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: job.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 12 }}>
              {job.icon}
            </div>
            <div className="kn-modal-title">{job.title}</div>
            <div className="kn-modal-sub">
              <i className="ti ti-map-pin" style={{ fontSize: 12 }} /> {job.eneo}, Dar es Salaam
            </div>
            <p style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.68, marginBottom: "1.25rem" }}>{job.desc}</p>
            <div className="kn-modal-info-row">
              <div className="kn-modal-info-box">
                <div className="kn-modal-info-lbl">Malipo</div>
                <div className="kn-modal-info-val">{job.malipo} <span style={{ fontSize: 12, fontWeight: 400, color: "var(--ink4)" }}>{job.kip}</span></div>
              </div>
              <div className="kn-modal-info-box">
                <div className="kn-modal-info-lbl">Aina</div>
                <div className="kn-modal-info-val">{job.aina}</div>
              </div>
            </div>

            {err && <div className="kn-modal-err"><i className="ti ti-alert-circle" />{err}</div>}

            <label className="kn-modal-lbl">Jina lako kamili *</label>
            <input className="kn-modal-input" value={name} onChange={e => { setName(e.target.value); setErr(""); }} placeholder="Mfano: Amina Hassan" />

            <label className="kn-modal-lbl">Nambari ya simu *</label>
            <input className="kn-modal-input" type="tel" value={phone} onChange={e => { setPhone(e.target.value); setErr(""); }} placeholder="0712 345 678" />

            <label className="kn-modal-lbl">Uzoefu wako (kwa ufupi)</label>
            <textarea className="kn-modal-input kn-modal-textarea" value={bio} onChange={e => setBio(e.target.value)} placeholder="Niambie kidogo kuhusu uzoefu wako..." />

            <button className="kn-modal-submit" onClick={submit}>
              <i className="ti ti-send" /> Tuma Ombi
            </button>
          </>
        )}
      </div>
    </div>
  );
}
