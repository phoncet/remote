import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErr("Tafadhali jaza jina, barua pepe na ujumbe.");
      return;
    }
    setErr("");

    // Open user's mail client with prefilled content as a simple fallback
    const to = "hello@kazinzuri.example";
    const subject = encodeURIComponent(`KaziNzuri Contact: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="kn-page kn-contact">
      <div className="kn-container">
        <h1>Contact Us</h1>
        <p>Una swali au unataka msaada? Tuma ujumbe kupitia fomu hapa au tumia barua pepe yetu.</p>

        {err && <div className="kn-auth-err"><i className="ti ti-alert-circle" /> {err}</div>}
        {success && <div className="kn-success"><i className="ti ti-circle-check" /> Ujumbe umefungwa kwenye mtumiaji wako wa barua pepe.</div>}

        <form className="kn-form" onSubmit={submit} style={{ maxWidth: 720 }}>
          <div className="kn-field">
            <label className="kn-field-lbl">Jina</label>
            <input className="kn-field-input" value={name} onChange={e => setName(e.target.value)} placeholder="Jina lako kamili" />
          </div>

          <div className="kn-field">
            <label className="kn-field-lbl">Barua pepe</label>
            <input className="kn-field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
          </div>

          <div className="kn-field">
            <label className="kn-field-lbl">Ujumbe</label>
            <textarea className="kn-field-input kn-modal-textarea" value={message} onChange={e => setMessage(e.target.value)} placeholder="Andika ujumbe wako hapa..." />
          </div>

          <button className="kn-btn kn-btn-solid" type="submit">Tuma Ujumbe</button>
        </form>
      </div>
    </div>
  );
}
