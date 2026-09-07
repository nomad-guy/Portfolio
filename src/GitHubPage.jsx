import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USER = "nomad-guy";

export default function GitHubPage({ src }) {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/users/${USER}/repos?per_page=20&sort=updated&type=owner`)
      .then((r) => r.json())
      .then((data) => {
        setMounted(true);
        const filtered = data
          .filter((r) => !r.fork && r.visibility === "public")
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .gh-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding-left: 0;
        }

        .gh-list {
          position: relative;
          width: min(70vw, 900px);
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: none;
          transform: scale(0.92);
          transform-origin: top left;
        }

        .gh-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 8px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .gh-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .gh-card {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
          width: 100%;
        }
        .gh-card.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .gh-card-inner {
          position: relative;
          height: 108px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px 0 62px;
        }
        .gh-card.mounted.active .gh-card-inner {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }
        .gh-card.mounted:not(.active) .gh-card-inner:hover {
          background: #1a2570;
        }

        .gh-title {
          font-family: 'Anton', sans-serif;
          font-size: 48px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gh-card.mounted.active .gh-title { color: #000; }
        .gh-card.mounted:not(.active) .gh-card-inner:hover .gh-title { color: #00d9ff; }

        .gh-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          flex-shrink: 0;
        }

        .gh-lang {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .gh-card.mounted.active .gh-lang { color: #000; }

        .gh-stats {
          display: flex;
          gap: 12px;
          align-items: baseline;
        }
        .gh-stat {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .gh-card.mounted.active .gh-stat { color: #000; }
        .gh-stat-val {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          line-height: 0.85;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .gh-card.mounted.active .gh-stat-val { color: #000; }

        .gh-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .gh-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .gh-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .gh-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .gh-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          line-height: 0.92;
          letter-spacing: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gh-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .gh-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .gh-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
          cursor: pointer;
        }
        .gh-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .gh-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .gh-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .gh-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .gh-detail-bottom {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          bottom: 0;
          width: min(39vw, 620px);
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .gh-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .gh-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gh-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }
        .gh-detail-repo {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #4298f5;
          margin-top: 14px;
        }
        .gh-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .gh-hint.mounted { opacity: 1; }
        .gh-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .gh-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="gh-root">
        <div className="gh-list">
          <div className={`gh-tag${mounted ? " mounted" : ""}`}>REPOS</div>
          {loading ? (
            <div style={{ color: '#3ce2ff', fontFamily: 'Anton', fontSize: 40, paddingLeft: 12 }}>
              LOADING...
            </div>
          ) : repos.length === 0 ? (
            <div style={{ color: '#ff2a2a', fontFamily: 'Anton', fontSize: 40, paddingLeft: 12 }}>
              NO REPOS
            </div>
          ) : (
            repos.map((repo, i) => (
              <div
                key={repo.name}
                className={`gh-card${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ transitionDelay: `${i * 50}ms` }}
                onMouseEnter={() => setActive(i)}
                onClick={() => window.open(repo.html_url, "_blank")}
              >
                <div className="gh-card-inner">
                  <div className="gh-title">{repo.name}</div>
                  <div className="gh-meta">
                    {repo.language && (
                      <div className="gh-lang">{repo.language}</div>
                    )}
                    <div className="gh-stats">
                      <span className="gh-stat">STAR</span>
                      <span className="gh-stat-val">{repo.stargazers_count}</span>
                      {repo.forks_count > 0 && (
                        <>
                          <span className="gh-stat" style={{ marginLeft: 8 }}>FORK</span>
                          <span className="gh-stat-val">{repo.forks_count}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {!loading && repos.length > 0 && active < repos.length && (
        <div className="gh-detail-panel">
          <div className="gh-detail-top">
            <div className="gh-detail-top-index">0{active + 1}</div>
            <div className="gh-detail-top-title">{repos[active].name}</div>
            <div className="gh-detail-top-progress">{repos[active].stargazers_count}</div>
          </div>

          <div className="gh-detail-list">
            <div className="gh-detail-row">
              <div className="gh-detail-row-index">01</div>
              <div className="gh-detail-row-title">LANGUAGE</div>
              <div className="gh-detail-status">{repos[active].language || "N/A"}</div>
            </div>
            <div className="gh-detail-row">
              <div className="gh-detail-row-index">02</div>
              <div className="gh-detail-row-title">STARRED</div>
              <div className="gh-detail-status">{repos[active].stargazers_count}</div>
            </div>
            {repos[active].forks_count > 0 && (
              <div className="gh-detail-row">
                <div className="gh-detail-row-index">03</div>
                <div className="gh-detail-row-title">FORKED</div>
                <div className="gh-detail-status">{repos[active].forks_count}</div>
              </div>
            )}
            <div className="gh-detail-row">
              <div className="gh-detail-row-index">04</div>
              <div className="gh-detail-row-title">UPDATED</div>
              <div className="gh-detail-status">
                {new Date(repos[active].updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </div>

          <div className="gh-detail-bottom">
            <div className="gh-detail-bottom-title">REPO INFO</div>
            <div className="gh-detail-bullets">
              {repos[active].description && (
                <div className="gh-detail-bullet">{repos[active].description}</div>
              )}
              {repos[active].topics.length > 0 && (
                <div className="gh-detail-bullet" style={{ color: '#91f5ff' }}>
                  {repos[active].topics.slice(0, 5).join(" · ")}
                </div>
              )}
            </div>
            <div className="gh-detail-repo">
              → {repos[active].html_url}
            </div>
          </div>
        </div>
      )}

      <div className={`gh-hint${mounted ? " mounted" : ""}`}>
        <div className="gh-hint-row"><span className="gh-hint-key">↑↓</span><span>SELECT</span></div>
        <div className="gh-hint-row"><span className="gh-hint-key">↵</span><span>OPEN</span></div>
        <div className="gh-hint-row"><span className="gh-hint-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
