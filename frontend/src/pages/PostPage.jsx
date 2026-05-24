import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import PostModal from "../components/PostModal";

export default function PostPage() {
  const navigate = useNavigate();
  const { currentUser, addPostedJob } = useUser();
  const [postOpen, setPostOpen] = useState(true);
  const [sideOpen, setSideOpen] = useState(false);

  const handleSaveJob = (job) => {
    // Ikiwa user ameingia, save kwenye UserContext
    if (currentUser) {
      addPostedJob(job);
      setPostOpen(false);
      setTimeout(() => navigate("/profile"), 2800);
    } else {
      // Ikiwa user hajaingia, go to login
      navigate("/login");
    }
  };

  const handleClosePost = () => {
    setPostOpen(false);
    navigate("/");
  };

  return (
    <>
      <Navbar onPost={() => setPostOpen(true)} onMenu={() => setSideOpen(true)} />

      <SideMenu
        open={sideOpen}
        onClose={() => setSideOpen(false)}
      />

      <div className="kn-main-content">
        <main className="kn-main">
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h2>Tangaza Kazi Yako</h2>
            <p>Kazi yako itaonekana mara moja kwenye orodha — bure kabisa</p>
          </div>
        </main>
      </div>

      <Footer />

      {postOpen && (
        <PostModal 
          onClose={handleClosePost} 
          onSave={handleSaveJob}
        />
      )}
    </>
  );
}
