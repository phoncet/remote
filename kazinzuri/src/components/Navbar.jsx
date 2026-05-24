import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ onPost }) {
  const navigate = useNavigate();

  return (
    <nav className="kn-nav">
      <Logo />
      <div className="kn-nav-actions">
        <button className="kn-btn kn-btn-ghost" onClick={onPost}>
          <i className="ti ti-plus" /> Tangaza Kazi
        </button>
        <button className="kn-btn kn-btn-solid" onClick={() => navigate("/login")}>
          <i className="ti ti-user" /> Ingia
        </button>
      </div>
    </nav>
  );
}
