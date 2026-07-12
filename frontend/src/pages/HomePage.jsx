import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import SideMenu from "../components/SideMenu";
import { Stats, TrustBar, FilterPills, RegionFilter } from "../components/Sections";
import { CardsList } from "../components/JobCard";
import ApplyModal from "../components/ApplyModal";
import PostModal from "../components/PostModal";
import Footer from "../components/Footer";
import { apiFetch } from "../api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [userKazi, setUserKazi] = useState([]);
  const [cat, setCat] = useState("zote");
  const [query, setQuery] = useState("");
  const [eneofil, setEneofil] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [applyJob, setApplyJob] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const { postedJobs } = useUser();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiFetch('/jobs');
        if (!mounted) return;
        setFetchedJobs(data.jobs || []);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const backendMapped = fetchedJobs.map(j => ({
    id: j.id,
    title: j.title,
    desc: j.description,
    eneo: j.location_name || j.location || '',
    malipo: j.salary ? `Tsh ${j.salary}` : 'Tsh 0',
    kip: j.salary_period || '',
    aina: j.job_type || (j.category || ''),
    icon: '💼',
    bg: '#FEF3DC',
    user: !!j.user_id,
    createdAt: j.created_at,
  }));

  const allKazi = [...backendMapped, ...postedJobs, ...userKazi];

  const filtered = allKazi.filter(k => {
    const mc = cat === "zote" || k.cat === cat;
    const q = query.toLowerCase();
    const mq = !q || k.title.toLowerCase().includes(q) || k.desc.toLowerCase().includes(q) || k.eneo.toLowerCase().includes(q);
    const me = !eneofil || k.eneo === eneofil;
    const mr = !region || k.region === region;
    const md = !district || k.wilaya === district;
    return mc && mq && me && mr && md;
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

  const handlePostClick = () => {
    if (currentUser) setPostOpen(true);
    else navigate('/login');
  };

  const handleApplyClick = (job) => {
    if (currentUser) setApplyJob(job);
    else navigate('/login');
  };

  return (
    <>
      <Navbar onPost={handlePostClick} onMenu={() => setSideOpen(true)} />

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

          <RegionFilter 
            activeRegion={region} 
            activeDistrict={district}
            onRegionChange={setRegion}
            onDistrictChange={setDistrict}
          />

          <div className="kn-sec-head">
            <div className="kn-sec-title">Kazi Zinapatikana</div>
            <div className="kn-sec-count">{filtered.length} kazi zinaonyeshwa</div>
          </div>

          <CardsList jobs={filtered} onApply={handleApplyClick} />

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
