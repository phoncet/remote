import { useNavigate } from "react-router-dom";

export default function Logo({ light = false, onClick }) {
  const navigate = useNavigate();
  const handleClick = onClick || (() => navigate("/"));

  return (
    <button className="kn-logo" onClick={handleClick}>
      <div className="kn-logo-mark">
        <i className="ti ti-briefcase" />
      </div>
      <div className="kn-logo-name" style={light ? { color: "var(--g200)" } : {}}>
        Kazi<span>Nzuri</span>
      </div>
    </button>
  );
}
