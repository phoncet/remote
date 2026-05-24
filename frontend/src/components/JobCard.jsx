export function JobCard({ job, onApply, style }) {
  let cls = "kn-card";
  if (job.haraka) cls += " urgent";
  if (job.user) cls += " user-posted";

  return (
    <div className={cls} style={style}>
      {job.user && (
        <div className="kn-card-mine-badge">
          <i className="ti ti-star-filled" style={{ color: "var(--amber)" }} /> Tangazo Lako
        </div>
      )}
      <div className="kn-card-head">
        <div className="kn-avatar-wrap">
          <div className="kn-avatar-ring" />
          <div className="kn-avatar" style={{ background: job.bg }}>{job.icon}</div>
        </div>
        <div className="kn-card-info">
          <div className="kn-card-name">{job.title}</div>
          <div className="kn-card-loc">
            <i className="ti ti-map-pin" style={{ fontSize: 12 }} />
            {job.eneo}, Dar es Salaam
          </div>
        </div>
        <div className="kn-card-badges">
          {job.haraka && <span className="kn-badge kn-badge-green">Haraka</span>}
          {job.user && <span className="kn-badge kn-badge-amber">Yako</span>}
          <span className="kn-badge kn-badge-blue">{job.aina}</span>
        </div>
      </div>
      <p className="kn-card-desc">{job.desc}</p>
      <div className="kn-card-foot">
        <div className="kn-card-pay">
          {job.malipo} <span>{job.kip}</span>
        </div>
        <button className="kn-apply-btn" onClick={() => onApply(job)}>
          <i className="ti ti-send" style={{ fontSize: 13 }} /> Omba kazi
        </button>
      </div>
    </div>
  );
}

export function CardsList({ jobs, onApply }) {
  if (!jobs.length) {
    return (
      <div className="kn-empty">
        <i className="ti ti-search" />
        <p>Hakuna kazi zilizopatikana.<br />Jaribu maneno tofauti au chagua eneo lingine.</p>
      </div>
    );
  }
  return (
    <div className="kn-cards">
      {jobs.map((j, i) => (
        <JobCard key={j.id} job={j} onApply={onApply} style={{ animationDelay: `${i * 0.045}s` }} />
      ))}
    </div>
  );
}
