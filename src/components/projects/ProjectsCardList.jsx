export function ProjectsCardList({ data, active, mounted, onSelect, onHoverChange }) {
  return (
    <div
      className="resume-stack"
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>PROJECTS</div>
      {data.map((proj, index) => (
        <div
          key={proj.title}
          className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
          style={{ transitionDelay: `${index * 55}ms` }}
          onMouseEnter={() => {
            onSelect(index);
            onHoverChange?.(true);
          }}
          onClick={() => onSelect(index)}
        >
          <div className="resume-card">
            <div className="resume-badge">
              <div className="resume-badge-text">{proj.badge}</div>
            </div>
            <div className="resume-card-inner">
              <div className="resume-title">{proj.title}</div>
              <div className="resume-rank">
                <div className="resume-rank-label">RANK</div>
                <div className="resume-rank-number">{proj.rank}</div>
              </div>
            </div>
            <div className="resume-subtitle-bar">
              <div className="resume-subtitle">{proj.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
