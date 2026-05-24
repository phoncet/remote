import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="kn-main" style={{ paddingTop: "4rem" }}>
        <div className="kn-sec-head">
          <div className="kn-sec-title">Kuhusu KaziNzuri</div>
          <div className="kn-sec-count">Jifunze zaidi kuhusu huduma yetu.</div>
        </div>

        <section className="kn-about">
          <p>
            KaziNzuri ni jukwaa la kuboresha uhusiano kati ya waajiri na wachapishi kazi nchini.
            Tunaweka kazi karibu na wateja kupitia orodha rahisi, utaftaji wa haraka, na suluhisho safi za matangazo.
          </p>

          <div className="kn-about-grid">
            <div className="kn-about-card">
              <h3>Malengo Yetu</h3>
              <p>Kuunganisha kazi nzuri na watendaji wenye ujuzi kwa urahisi na usalama.</p>
            </div>
            <div className="kn-about-card">
              <h3>Jinsi Tunavyofanya</h3>
              <p>Tunatoa orodha za kazi zinazowezesha wachapishi kupata nafasi kwa haraka na kwa ufanisi.</p>
            </div>
            <div className="kn-about-card">
              <h3>Kwa Nani</h3>
              <p>Waajiri, wahitimu, wataalamu wa mikataba ya muda, na kila mtu anayehitaji kazi ya kuaminika.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
