import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logo from "./Logo";

export default function Navbar({ onPost, onMenu }) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  return (
    <nav className="kn-nav">
      <Logo onClick={onMenu} />
      <div className="kn-nav-actions">
        <button className="kn-btn kn-btn-ghost" onClick={() => navigate("/about") }>
          About
        </button>
        <button className="kn-btn kn-btn-ghost" onClick={() => navigate("/contact") }>
          Contact
        </button>
        
        {/* Admin User */}
        {currentUser?.role === "admin" ? (
          <>
            <button className="kn-btn kn-btn-ghost" onClick={() => navigate("/admin")}>
              <i className="ti ti-shield-check" /> Admin Panel
            </button>
            <button className="kn-btn kn-btn-solid" onClick={() => navigate("/profile")}>
              <i className="ti ti-user" /> Admin
            </button>
          </>
        ) : (
          <>
            {/* Regular User */}
            {currentUser && (
              <button className="kn-btn kn-btn-ghost" onClick={() => navigate("/post-job")}>
                <i className="ti ti-plus" /> Tangaza Kazi
              </button>
            )}
            {currentUser ? (
              <button className="kn-btn kn-btn-solid" onClick={() => navigate("/profile")}>
                <i className="ti ti-user" /> {currentUser.name}
              </button>
            ) : (
              <>
                {onPost && (
                  <button className="kn-btn kn-btn-ghost" onClick={onPost}>
                    <i className="ti ti-plus" /> Tangaza Kazi
                  </button>
                )}
                <button className="kn-btn kn-btn-solid" onClick={() => navigate("/login")}>
                  <i className="ti ti-user" /> Ingia
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
