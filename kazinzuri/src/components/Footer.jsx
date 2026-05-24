import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="kn-footer">
      <div className="kn-footer-inner">
        <div className="kn-footer-top">
          <div>
            <Logo light />
            <p className="kn-footer-tagline" style={{ marginTop: 10 }}>
              Tunakuleta karibu na fursa za kazi za kawaida Tanzania.<br />Salama, rahisi, na ya kuaminika.
            </p>
            <div className="kn-footer-social">
              {["ti-brand-facebook", "ti-brand-instagram", "ti-brand-whatsapp", "ti-brand-twitter"].map(ic => (
                <button key={ic} className="kn-soc-btn"><i className={`ti ${ic}`} /></button>
              ))}
            </div>
          </div>
          <div className="kn-footer-col">
            <h4>Viungo vya Haraka</h4>
            <ul>
              {["Nyumbani", "Tafuta Kazi", "Tangaza Kazi", "Wasifu Wangu", "Jinsi Inavyofanya Kazi"].map(l => (
                <li key={l}><a>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="kn-footer-col">
            <h4>Msaada</h4>
            <ul>
              {["Maswali Yanayoulizwa", "Wasiliana Nasi", "Usalama & Faragha", "Masharti ya Matumizi"].map(l => (
                <li key={l}><a>{l}</a></li>
              ))}
              <li><a><i className="ti ti-phone" style={{ fontSize: 12, verticalAlign: -1, marginRight: 4 }} />+255 712 345 678</a></li>
            </ul>
          </div>
        </div>
        <hr className="kn-footer-hr" />
        <div className="kn-footer-bottom">
          <div className="kn-footer-copy">© 2025 <span>KaziNzuri</span>. Haki zote zimehifadhiwa. Imetengenezwa kwa ❤ Tanzania</div>
          <div className="kn-footer-badges">
            <div className="kn-footer-badge"><i className="ti ti-shield-check" /> Salama</div>
            <div className="kn-footer-badge"><i className="ti ti-certificate" /> Imehakikiwa</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
