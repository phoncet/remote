import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logo from "../components/Logo";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useUser();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErr("Tafadhali weka nenosiri.");
      return;
    }
    setErr("");
    setLoading(true);
    
    try {
      setTimeout(() => {
        try {
          adminLogin(password);
          setLoading(false);
          navigate("/admin");
        } catch (error) {
          setErr(error.message);
          setLoading(false);
        }
      }, 800);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="kn-auth">
      {/* Upande wa picha (huonekana kwenye skrini kubwa) */}
      <div className="kn-auth-visual">
        <div className="kn-auth-visual-inner">
          <Logo light />
          <h1 className="kn-auth-vh">
            Karibu <em>Admin Panel</em>
          </h1>
          <p className="kn-auth-vp">
            Kuzamata na kusimamia kazi, watumiaji, na mifumo ya KaziNzuri.
          </p>
          <div className="kn-auth-feats">
            <div className="kn-auth-feat"><i className="ti ti-shield-check" /> Hadiminu ya KaziNzuri</div>
            <div className="kn-auth-feat"><i className="ti ti-chart-bar" /> Takwimu kamili</div>
            <div className="kn-auth-feat"><i className="ti ti-user-check" /> Simamia watumiaji</div>
          </div>
        </div>
      </div>

      {/* Fomu ya kuingia */}
      <div className="kn-auth-form-wrap">
        <div className="kn-auth-card">
          <button className="kn-auth-back" onClick={() => navigate("/")}>
            <i className="ti ti-arrow-left" /> Rudi nyumbani
          </button>

          <h2 className="kn-auth-title">Admin Ingia</h2>
          <p className="kn-auth-sub">
            Hii ni sehemu ya ADMIN pekee. <button onClick={() => navigate("/login")} style={{background:"none", border:"none", color:"var(--g600)", cursor:"pointer", textDecoration:"underline"}}>Ingia kama mtumiaji</button>
          </p>

          {err && <div className="kn-auth-err"><i className="ti ti-alert-circle" /> {err}</div>}

          <form onSubmit={submit}>
            <div className="kn-field">
              <label className="kn-field-lbl">Nenosiri la Admin</label>
              <div className="kn-field-input-wrap">
                <i className="ti ti-lock" />
                <input
                  className="kn-field-input" type={showPass ? "text" : "password"} value={password}
                  onChange={e => { setPassword(e.target.value); setErr(""); }}
                  placeholder="Weka nenosiri la admin"
                />
                <button type="button" className="kn-field-toggle" onClick={() => setShowPass(s => !s)}>
                  <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`} />
                </button>
              </div>
            </div>

            <button type="submit" className="kn-auth-submit" disabled={loading}>
              {loading ? <><i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} /> Inaingia...</> : <><i className="ti ti-login" /> Ingia</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
