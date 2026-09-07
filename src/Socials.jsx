import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main3.mp4";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import "./styles/socials/Socials.css";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "github", label: "GITHUB", handle: "@nomad-guy", href: "https://github.com/nomad-guy", icon: "\uD83D\uDC1B", barIcon: icon1, bars: 0, newBars: [], counts: [],
    links: ["github.com/nomad-guy"],
    infoBarLabel: "REPOS",
    stats: [
      { tag: "REP", value: "120", color: "#6e40c9" },
      { tag: "STG", value: "34",  color: "#bf94ff" },
    ],
  },
  {
    id: "telegram", label: "TELEGRAM", handle: "@n0mad_guy", href: "https://t.me/n0mad_guy", icon: "\u2708\uFE0F", barIcon: icon2, bars: 3, newBars: [0, 2], counts: ["1.2K", "412", "89"],
    links: ["t.me/n0mad_guy", "t.me/n0mad_guy/updates", "t.me/n0mad_guy/contact"],
    infoBarLabel: "MEMBERS",
    stats: [
      { tag: "SUB", value: "1.2K", color: "#26a5e0" },
      { tag: "MSG", value: "342",  color: "#f77737" },
    ],
  },
  {
    id: "discord", label: "DISCORD", handle: "n0mad_guy", href: "https://discord.gg/n0mad_guy", icon: "\uD83C\uDFCB\uFE0F", barIcon: icon3, bars: 4, newBars: [0, 3], counts: ["5.1K", "2.8K", "1.2K", "412"],
    links: ["discord.gg/n0mad_guy", "discord.gg/n0mad_guy/events", "discord.gg/n0mad_guy/roles", "discord.gg/n0mad_guy/about"],
    infoBarLabel: "LINKS",
    stats: [
      { tag: "MEM", value: "5.1K", color: "#5865f2" },
      { tag: "ONL", value: "342",  color: "#5865f2" },
    ],
  },
];

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter")      window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp")   setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter")     window.open("https://" + ITEMS[active].links[activeInfoBar], "_blank");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank");
              else setActive(i);
            }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && Array.from({ length: ITEMS[active].bars }).map((_, i) => (
        <div
          className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
          key={`bar-${active}-${i}`}
          style={{ top: `${155 + i * 52}px`, animationDelay: `${i * 50}ms` }}
          onClick={() => setActiveInfoBar(i)}
          onMouseEnter={() => setActiveInfoBar(i)}
        >
          {ITEMS[active].newBars.includes(i) && (
            <img className="sc-info-bar-new" src={newsign} alt="" />
          )}
          <div className="sc-info-bar">
            <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} alt="" />
            <span className="sc-info-bar-text">{ITEMS[active].links[i].slice(0, 10)}...</span>
            <span className="sc-info-bar-box">{ITEMS[active].infoBarLabel || "VIEWS"}</span>
            <span className="sc-info-bar-count">{ITEMS[active].counts[i]}</span>
          </div>
        </div>
      ))}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key sc-footer-key-m">M</span><span className="sc-footer-label-m">♪ ON</span></div>
      </div>
    </div>
  );
}
