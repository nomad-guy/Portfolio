export function ProjectsDetailPanel({ data, index }) {
  const proj = data[index];
  if (!proj) return null;

  return (
    <div className="resume-detail-panel" key={proj.title}>
      <div className="resume-detail-top">
        <div className="resume-detail-top-index">0{index + 1}</div>
        <div className="resume-detail-top-title">{proj.title}</div>
        <div className="resume-detail-top-progress">{proj.progress}</div>
      </div>

      <div className="resume-detail-list">
        {proj.rows.map((row) => (
          <div className="resume-detail-row" key={row.index}>
            <div className="resume-detail-row-index">{row.index}</div>
            <div className="resume-detail-row-title">{row.title}</div>
            <div className="resume-detail-status">{row.status}</div>
          </div>
        ))}
      </div>

      <div className="resume-detail-bottom">
        <div className="resume-detail-bottom-title">DETAILS</div>
        <div className="resume-detail-bullets">
          {proj.bullets.map((b, i) => (
            <div className="resume-detail-bullet" key={i}>{b}</div>
          ))}
        </div>
        {proj.noctraUrl && (
          <div className="resume-detail-repo">
            → <a href={proj.noctraUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#4298f5" }}>{proj.noctraUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}
