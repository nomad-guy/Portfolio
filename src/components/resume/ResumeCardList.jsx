export function ResumeCardList({ data, active, mounted, onSelect, onHoverChange, onPin }) {
  return (
    <div
      className="resume-stack"
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
          style={{ transitionDelay: `${index * 55}ms` }}
          onMouseEnter={() => {
            onSelect(index);
            onHoverChange?.(true);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
            onHoverChange?.(true);
            onPin?.(true);
          }}
        >
          <div className="resume-card">
            <div className="resume-badge">
              <div className="resume-badge-text">{item.badge}</div>
            </div>
            <div className="resume-card-inner">
              <div className="resume-title">{item.title}</div>
              <div className="resume-rank">
                <div className="resume-rank-label">RANK</div>
                <div className="resume-rank-number">{item.rank}</div>
              </div>
            </div>
            <div className="resume-subtitle-bar">
              <div className="resume-subtitle">{item.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
