import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logo from "../components/Logo";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      setErr("Tafadhali jaza nambari ya simu na nenosiri.");
      return;
    }
    setErr("");
    setLoading(true);
    (async () => {
      try {
        await login(phone, password);
        navigate("/profile");
      } catch (err) {
        setErr(err.message || 'Haikuwezekana kuingia');
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="kn-auth">
      {/* Upande wa picha (huonekana kwenye skrini kubwa) */}
      <div className="kn-auth-visual">
        <div className="kn-auth-visual-inner">
          <Logo light />
          <h1 className="kn-auth-vh">
            Karibu tena <em>KaziNzuri</em>
          </h1>
          <p className="kn-auth-vp">
            Ingia ili kuomba kazi, kufuatilia maombi yako, na kupokea fursa mpya za kazi karibu nawe Dar es Salaam.
          </p>
          <div className="kn-auth-feats">
            <div className="kn-auth-feat"><i className="ti ti-briefcase" /> Kazi mpya kila siku</div>
            <div className="kn-auth-feat"><i className="ti ti-shield-check" /> Waajiri waliothibitishwa</div>
            <div className="kn-auth-feat"><i className="ti ti-bolt" /> Omba kazi kwa dakika moja</div>
          </div>
        </div>
      </div>

      {/* Fomu ya kuingia */}
      <div className="kn-auth-form-wrap">
        <div className="kn-auth-card">
          <button className="kn-auth-back" onClick={() => navigate("/")}>
            <i className="ti ti-arrow-left" /> Rudi nyumbani
          </button>

          <h2 className="kn-auth-title">Ingia</h2>
          <p className="kn-auth-sub">
            Huna akaunti? <Link to="/register">Jisajili hapa</Link>
          </p>

          {err && <div className="kn-auth-err"><i className="ti ti-alert-circle" /> {err}</div>}

          <form onSubmit={submit}>
            <div className="kn-field">
              <label className="kn-field-lbl">Nambari ya simu</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-phone" />
                <input
                  className="kn-field-input" type="tel" value={phone}
                  onChange={e => { setPhone(e.target.value); setErr(""); }}
                  placeholder="0712 345 678"
                />
              </div>
            </div>

            <div className="kn-field">
              <label className="kn-field-lbl">Nenosiri</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-lock" />
                <input
                  className="kn-field-input" type={showPass ? "text" : "password"} value={password}
                  onChange={e => { setPassword(e.target.value); setErr(""); }}
                  placeholder="Weka nenosiri lako"
                />
                <button type="button" className="kn-field-toggle" onClick={() => setShowPass(s => !s)}>
                  <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`} />
                </button>
              </div>
            </div>

            <div className="kn-auth-row">
              <label className="kn-checkbox">
                <input type="checkbox" /> Nikumbuke
              </label>
              <button type="button" className="kn-auth-link">Umesahau nenosiri?</button>
            </div>

            <button type="submit" className="kn-auth-submit" disabled={loading}>
              {loading ? <><i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} /> Inaingia...</> : <><i className="ti ti-login" /> Ingia</>}
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
