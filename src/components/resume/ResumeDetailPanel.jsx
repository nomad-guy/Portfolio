export function ResumeDetailPanel({ data, index }) {
  const skill = data[index];
  if (!skill) return null;

  return (
    <div className="resume-detail-panel" key={skill.id}>
      <div className="resume-detail-top">
        <div className="resume-detail-top-index">0{index + 1}</div>
        <div className="resume-detail-top-title">{skill.title}</div>
        <div className="resume-detail-top-progress">{skill.rank}/5</div>
      </div>

      <div className="resume-detail-list">
        {skill.rows.map((row) => (
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
          {skill.bullets.map((b, i) => (
            <div className="resume-detail-bullet" key={i}>{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
