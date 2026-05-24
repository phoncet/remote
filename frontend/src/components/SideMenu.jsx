import { useNavigate } from "react-router-dom";

export default function SideMenu({ open, onClose, onSearch, onCatJump }) {
  const navigate = useNavigate();
  const sections = [
    { id: "top-hero", label: "Nyumbani", icon: "ti-home" },
    { id: "kazi-section", label: "Tafuta kazi", icon: "ti-search" },
    { id: "kazi-section", label: "Kazi zote", icon: "ti-list" },
    { id: "cta-section", label: "Tangaza kazi", icon: "ti-bell" },
    { path: "/about", label: "About", icon: "ti-info-circle" },
  ];

  const handleScroll = (item) => {
    if (item.path) {
      navigate(item.path);
      onClose();
      return;
    }

    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      onClose();
    }
  };

  return (
    <div className={`kn-side-drawer${open ? " open" : ""}`}>
      <div className="kn-side-backdrop" onClick={onClose} />
      <aside className="kn-side">
        <div className="kn-side-drawer-head">
          <div>
            <div className="kn-side-title">KaziNzuri</div>
            <div className="kn-side-sub">Chagua sehemu.</div>
          </div>
        </div>

        <div className="kn-side-list">
          {sections.map((item) => (
            <button
              key={(item.id || item.path) + item.label}
              type="button"
              className="kn-side-link"
              onClick={() => handleScroll(item)}
            >
              <span className="kn-side-icon">
                <i className={`ti ${item.icon}`} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="kn-side-footer">© 2026 KaziNzuri</div>
      </aside>
    </div>
  );
}
