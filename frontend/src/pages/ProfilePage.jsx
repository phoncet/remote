import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, logout, postedJobs, appliedJobs } = useUser();
  const [sideOpen, setSideOpen] = useState(false);

  // Redirect if user not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar onMenu={() => setSideOpen(true)} />

      <SideMenu
        open={sideOpen}
        onClose={() => setSideOpen(false)}
      />

      <div className="kn-main-content">
        <main className="kn-main" style={{ paddingTop: "2rem" }}>
          {/* Profile Header */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            padding: "2rem",
            color: "white",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{currentUser.name}</h1>
              <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>{currentUser.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "2px solid white",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <i className="ti ti-logout" /> Toka
            </button>
          </div>

          {/* Kazi Zilizotangaza */}
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="ti ti-briefcase" /> Kazi Zilizotangaza ({postedJobs.length})
            </h2>
            {postedJobs.length === 0 ? (
              <div style={{
                background: "#f5f5f5",
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                color: "#999"
              }}>
                <i className="ti ti-inbox" style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
                <p>Hauna kazi iliyotangaza bado</p>
                <button
                  onClick={() => navigate("/post-job")}
                  style={{
                    marginTop: "1rem",
                    background: "var(--primary, #667eea)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  <i className="ti ti-plus" /> Tangaza Kazi
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
                {postedJobs.map(job => (
                  <div
                    key={job.id}
                    style={{
                      background: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                  >
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{job.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
                      <i className="ti ti-map-pin" /> {job.eneo}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                      <span style={{
                        background: "#e3f2fd",
                        color: "#1976d2",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "6px",
                        fontSize: "0.85rem"
                      }}>
                        {job.malipo}
                      </span>
                      <span style={{
                        background: "#f3e5f5",
                        color: "#7b1fa2",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "6px",
                        fontSize: "0.85rem"
                      }}>
                        {job.aina}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#999" }}>
                      {new Date(job.createdAt || Date.now()).toLocaleDateString("sw-TZ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kazi Zilizoomba */}
          <div>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="ti ti-file-text" /> Kazi Zilizoomba ({appliedJobs.length})
            </h2>
            {appliedJobs.length === 0 ? (
              <div style={{
                background: "#f5f5f5",
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                color: "#999"
              }}>
                <i className="ti ti-inbox" style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
                <p>Hauna kazi iliyoomba bado</p>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    marginTop: "1rem",
                    background: "var(--primary, #667eea)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  <i className="ti ti-search" /> Tafuta Kazi
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
                {appliedJobs.map((job, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                  >
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{job.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
                      <i className="ti ti-map-pin" /> {job.eneo}
                    </p>
                    <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" }}>
                      <p style={{ margin: "0.5rem 0" }}><strong>Jina:</strong> {job.applicantData?.name}</p>
                      <p style={{ margin: "0.5rem 0" }}><strong>Simu:</strong> {job.applicantData?.phone}</p>
                      {job.applicantData?.bio && <p style={{ margin: "0.5rem 0" }}><strong>Bio:</strong> {job.applicantData.bio}</p>}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#999" }}>
                      Kuombwa: {new Date(job.appliedAt).toLocaleDateString("sw-TZ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
