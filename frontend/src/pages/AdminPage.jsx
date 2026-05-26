import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useState } from "react";

export default function AdminPage() {
  const navigate = useNavigate();
  const { currentUser, logout, allUsers, postedJobs, appliedJobs } = useUser();
  const [sideOpen, setSideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Check if user is admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/admin-login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = [
    { label: "Watumiaji", count: allUsers.length, icon: "ti-users", color: "#667eea" },
    { label: "Kazi Zilizotangaza", count: postedJobs.length, icon: "ti-briefcase", color: "#764ba2" },
    { label: "Kazi Zilizoomba", count: appliedJobs.length, icon: "ti-file-text", color: "#f093fb" },
    { label: "Maombi Yanayofanya Kazi", count: appliedJobs.filter(a => a.status !== "rejected").length, icon: "ti-check", color: "#4facfe" },
  ];

  return (
    <>
      <Navbar onMenu={() => setSideOpen(true)} />

      <SideMenu
        open={sideOpen}
        onClose={() => setSideOpen(false)}
      />

      <div className="kn-main-content" style={{ paddingBottom: "3rem" }}>
        <main className="kn-main" style={{ maxWidth: "1200px", paddingTop: "2rem" }}>
          {/* Admin Header */}
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
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🔐 Admin Dashboard</h1>
              <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>Karibu {currentUser.name} - Simamia KaziNzuri</p>
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

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                textAlign: "center"
              }}>
                <i className={`ti ${stat.icon}`} style={{ fontSize: "2rem", color: stat.color, marginBottom: "0.5rem", display: "block" }} />
                <div style={{ fontSize: "2rem", fontWeight: 800, color: stat.color, marginBottom: "0.5rem" }}>
                  {stat.count}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex",
            gap: "0.5rem",
            borderBottom: "2px solid #e0e0e0",
            marginBottom: "1.5rem",
            overflowX: "auto"
          }}>
            {[
              { id: "overview", label: "Muhtasari" },
              { id: "users", label: "Watumiaji", count: allUsers.length },
              { id: "jobs", label: "Kazi", count: postedJobs.length },
              { id: "applications", label: "Maombi", count: appliedJobs.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "1rem 1.5rem",
                  background: activeTab === tab.id ? "var(--g600)" : "transparent",
                  color: activeTab === tab.id ? "white" : "#666",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: activeTab === tab.id ? 700 : 600,
                  borderBottom: activeTab === tab.id ? "3px solid var(--g600)" : "none",
                  whiteSpace: "nowrap"
                }}
              >
                {tab.label} {tab.count !== undefined && <span style={{ marginLeft: "0.5rem", fontSize: "0.9rem", opacity: 0.8 }}>({tab.count})</span>}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div style={{ display: "grid", gap: "1.5rem" }}>
              <div style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>📊 Haraka Muhtasari</h3>
                <p style={{ color: "#666", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                  💼 Jumla ya kazi: <strong>{postedJobs.length}</strong>
                </p>
                <p style={{ color: "#666", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                  👥 Jumla ya watumiaji: <strong>{allUsers.length}</strong>
                </p>
                <p style={{ color: "#666", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                  📝 Jumla ya maombi: <strong>{appliedJobs.length}</strong>
                </p>
                <p style={{ color: "#666", lineHeight: 1.6 }}>
                  ✅ Maombi yanayofanya kazi: <strong>{appliedJobs.filter(a => a.status !== "rejected").length}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div style={{
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Watumiaji Wote</h3>
              {allUsers.length === 0 ? (
                <p style={{ color: "#999" }}>Hakuna watumiaji bado</p>
              ) : (
                <div style={{
                  overflowX: "auto"
                }}>
                  <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.9rem"
                  }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 700 }}>Simu</th>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 700 }}>Jina</th>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 700 }}>Kitambulisho</th>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 700 }}>Imesajiliwa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map(user => (
                        <tr key={user.id} style={{ borderBottom: "1px solid #e0e0e0" }}>
                          <td style={{ padding: "0.75rem" }}>{user.phone}</td>
                          <td style={{ padding: "0.75rem" }}>{user.name}</td>
                          <td style={{ padding: "0.75rem" }}>{user.id}</td>
                          <td style={{ padding: "0.75rem" }}>{new Date(user.id).toLocaleDateString("sw-TZ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div style={{
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Kazi Zilizotangaza</h3>
              {postedJobs.length === 0 ? (
                <p style={{ color: "#999" }}>Hakuna kazi iliyotangaza bado</p>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  {postedJobs.map(job => (
                    <div key={job.id} style={{
                      background: "#f9f9f9",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "1rem"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                        <h4 style={{ margin: 0 }}>{job.title}</h4>
                        <span style={{
                          background: "#e3f2fd",
                          color: "#1976d2",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.85rem"
                        }}>
                          {job.malipo}
                        </span>
                      </div>
                      <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#666" }}>
                        📍 {job.eneo} | 🏢 {job.aina}
                      </p>
                      <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#999" }}>
                        {new Date(job.createdAt || Date.now()).toLocaleDateString("sw-TZ")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div style={{
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Maombi ya Kazi</h3>
              {appliedJobs.length === 0 ? (
                <p style={{ color: "#999" }}>Hakuna maombi bado</p>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  {appliedJobs.map((app, idx) => (
                    <div key={idx} style={{
                      background: "#f9f9f9",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "1rem"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                        <h4 style={{ margin: 0 }}>{app.title}</h4>
                        <span style={{
                          background: "#f3e5f5",
                          color: "#7b1fa2",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.85rem"
                        }}>
                          Kuombwa
                        </span>
                      </div>
                      <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#666" }}>
                        👤 {app.applicantData?.name} | 📱 {app.applicantData?.phone}
                      </p>
                      <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#999" }}>
                        {new Date(app.appliedAt).toLocaleDateString("sw-TZ")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
