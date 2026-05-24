import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ jina: "", phone: "", password: "", confirm: "", role: "mtafuta" });
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErr(""); };

  const submit = (e) => {
    e.preventDefault();
    if (!form.jina.trim() || !form.phone.trim() || !form.password.trim()) {
      setErr("Tafadhali jaza sehemu zote zinazohitajika.");
      return;
    }
    if (form.password.length < 6) {
      setErr("Nenosiri liwe na herufi 6 au zaidi.");
      return;
    }
    if (form.password !== form.confirm) {
      setErr("Manenosiri hayalingani.");
      return;
    }
    if (!agree) {
      setErr("Tafadhali kubali masharti ya matumizi.");
      return;
    }
    setErr("");
    setLoading(true);
    // Hapa ungeweka mawasiliano na seva (API) ya kweli.
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="kn-auth">
      {/* Upande wa picha */}
      <div className="kn-auth-visual">
        <div className="kn-auth-visual-inner">
          <Logo light />
          <h1 className="kn-auth-vh">
            Jiunge na <em>KaziNzuri</em> leo
          </h1>
          <p className="kn-auth-vp">
            Tengeneza akaunti bure na anza kupata fursa za kazi au kutangaza kazi zako kwa wafanyakazi waaminifu wa Dar es Salaam.
          </p>
          <div className="kn-auth-feats">
            <div className="kn-auth-feat"><i className="ti ti-user-check" /> Usajili wa bure kabisa</div>
            <div className="kn-auth-feat"><i className="ti ti-clock" /> Inachukua dakika moja tu</div>
            <div className="kn-auth-feat"><i className="ti ti-heart-handshake" /> Unganisha na waajiri halisi</div>
          </div>
        </div>
      </div>

      {/* Fomu ya kujisajili */}
      <div className="kn-auth-form-wrap">
        <div className="kn-auth-card">
          <button className="kn-auth-back" onClick={() => navigate("/")}>
            <i className="ti ti-arrow-left" /> Rudi nyumbani
          </button>

          <h2 className="kn-auth-title">Jisajili</h2>
          <p className="kn-auth-sub">
            Tayari una akaunti? <Link to="/login">Ingia hapa</Link>
          </p>

          {err && <div className="kn-auth-err"><i className="ti ti-alert-circle" /> {err}</div>}

          <form onSubmit={submit}>
            <div className="kn-field">
              <label className="kn-field-lbl">Jina kamili</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-user" />
                <input
                  className="kn-field-input" value={form.jina}
                  onChange={e => set("jina", e.target.value)}
                  placeholder="Mfano: Amina Hassan"
                />
              </div>
            </div>

            <div className="kn-field">
              <label className="kn-field-lbl">Nambari ya simu</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-phone" />
                <input
                  className="kn-field-input" type="tel" value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="0712 345 678"
                />
              </div>
            </div>

            <div className="kn-field">
              <label className="kn-field-lbl">Nataka...</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-briefcase" />
                <select
                  className="kn-field-input" value={form.role}
                  onChange={e => set("role", e.target.value)}
                  style={{ paddingLeft: 40, appearance: "auto" }}
                >
                  <option value="mtafuta">Kutafuta kazi</option>
                  <option value="mwajiri">Kutangaza kazi (mwajiri)</option>
                </select>
              </div>
            </div>

            <div className="kn-field">
              <label className="kn-field-lbl">Nenosiri</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-lock" />
                <input
                  className="kn-field-input" type={showPass ? "text" : "password"} value={form.password}
                  onChange={e => set("password", e.target.value)}
                  placeholder="Herufi 6 au zaidi"
                />
                <button type="button" className="kn-field-toggle" onClick={() => setShowPass(s => !s)}>
                  <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`} />
                </button>
              </div>
            </div>

            <div className="kn-field">
              <label className="kn-field-lbl">Thibitisha nenosiri</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-lock-check" />
                <input
                  className="kn-field-input" type={showPass ? "text" : "password"} value={form.confirm}
                  onChange={e => set("confirm", e.target.value)}
                  placeholder="Andika nenosiri tena"
                />
              </div>
            </div>

            <div className="kn-auth-row">
              <label className="kn-checkbox">
                <input type="checkbox" checked={agree} onChange={e => { setAgree(e.target.checked); setErr(""); }} />
                Nakubali masharti ya matumizi
              </label>
            </div>

            <button type="submit" className="kn-auth-submit" disabled={loading}>
              {loading ? <><i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} /> Inasajili...</> : <><i className="ti ti-user-plus" /> Tengeneza Akaunti</>}
            </button>
          </form>

          <div className="kn-auth-divider">au endelea na</div>

          <div className="kn-auth-social">
            <button className="kn-auth-soc-btn"><i className="ti ti-brand-google" /> Google</button>
            <button className="kn-auth-soc-btn"><i className="ti ti-brand-facebook" /> Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
}
