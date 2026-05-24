import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import SideMenu from "../components/SideMenu";
import { Stats, TrustBar, FilterPills } from "../components/Sections";
import { CardsList } from "../components/JobCard";
import ApplyModal from "../components/ApplyModal";
import PostModal from "../components/PostModal";
import Footer from "../components/Footer";
import { BASE_KAZI } from "../data/kazi";

export default function HomePage() {
  const [userKazi, setUserKazi] = useState([]);
  const [cat, setCat] = useState("zote");
  const [query, setQuery] = useState("");
  const [eneofil, setEneofil] = useState("");
  const [applyJob, setApplyJob] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  const allKazi = [...BASE_KAZI, ...userKazi];

  const filtered = allKazi.filter(k => {
    const mc = cat === "zote" || k.cat === cat;
    const q = query.toLowerCase();
    const mq = !q || k.title.toLowerCase().includes(q) || k.desc.toLowerCase().includes(q) || k.eneo.toLowerCase().includes(q);
    const me = !eneofil || k.eneo === eneofil;
    return mc && mq && me;
  });

  const handleSearch = (q, e) => {
    setQuery(q);
    setEneofil(e);
    document.getElementById("kazi-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCatJump = (c) => {
    setCat(c);
    document.getElementById("kazi-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSaveJob = (job) => {
    setUserKazi(prev => [job, ...prev]);
  };

  return (
    <>
      <Navbar onPost={() => setPostOpen(true)} onMenu={() => setSideOpen(true)} />

      <SideMenu
        open={sideOpen}
        onClose={() => setSideOpen(false)}
        onSearch={handleSearch}
        onCatJump={handleCatJump}
      />

      <div className="kn-main-content">
        <HeroSlider onSearch={handleSearch} onCatJump={handleCatJump} />

        <main className="kn-main" id="kazi-section">
          <Stats count={filtered.length} />
          <TrustBar />

          <FilterPills active={cat} onChange={setCat} />

          <div className="kn-sec-head">
            <div className="kn-sec-title">Kazi Zinapatikana</div>
            <div className="kn-sec-count">{filtered.length} kazi zinaonyeshwa</div>
          </div>

          <CardsList jobs={filtered} onApply={setApplyJob} />

          <div className="kn-cta" id="cta-section">
            <div>
              <div className="kn-cta-title">Una kazi ya kutoa?</div>
              <div className="kn-cta-sub">Tangaza bure — kazi yako itaonekana mara moja kwenye orodha</div>
            </div>
            <button className="kn-cta-btn" onClick={() => setPostOpen(true)}>
              <i className="ti ti-plus" /> Tangaza Kazi Yako
            </button>
          </div>
        </main>
      </div>

      <Footer />

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      {postOpen && <PostModal onClose={() => setPostOpen(false)} onSave={handleSaveJob} />}
    </>
  );
}
