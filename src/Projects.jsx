import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectsCardList } from "./components/projects/ProjectsCardList";
import { ProjectsDetailPanel } from "./components/projects/ProjectsDetailPanel";
import "./styles/projects/Projects.css";


const PROJECTS_DATA = [
  {
    badge: "I",
    title: "NOCTRA",
    subtitle: "AUDIO / MUSIC PLATFORM",
    rank: 5,
    noctraUrl: "https://noctra-music.vercel.app/",
    rows: [
      { index: "01", title: "Autonomous Audiophile Music Platform", status: "Live" },
      { index: "02", title: "Lossless Hi-Res FLAC Streaming", status: "Live" },
      { index: "03", title: "Real-time Bilingual Lyrics (AksharaEngine)", status: "Live" },
      { index: "04", title: "IEM DSP Tuning & Triple Noir Design", status: "Live" },
    ],
    bullets: [
      "- Autonomous privacy-sovereign music platform",
      "- Lossless Hi-Res FLAC streaming on Android, Windows, Linux & iOS",
      "- AksharaEngine real-time bilingual lyrics subtitles",
      "- IEM DSP tuning with Triple Noir design language",
    ],
  },
  {
    badge: "II",
    title: "PORTFOLIO",
    subtitle: "REACT + VITE + FRAMER",
    rank: 5,
    rows: [
      { index: "01", title: "React 19 + Vite + React Router v7", status: "Live" },
      { index: "02", title: "Framer Motion Page Transitions", status: "Live" },
      { index: "03", title: "Persona 3 Aesthetic UI Design", status: "Live" },
      { index: "04", title: "GitHub API Repo Integration", status: "Live" },
    ],
    bullets: [
      "- React 19 with Vite and React Router v7",
      "- Framer Motion animated page transitions",
      "- Persona 3 inspired UI with custom card designs",
      "- Live GitHub repos fetched from API",
    ],
  },
];

export default function Projects({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(PROJECTS_DATA.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline preload="metadata" />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline preload="metadata" />
      </div>
      <div className="resume-overlay">
        <ProjectsCardList
          data={PROJECTS_DATA}
          active={active}
          mounted={mounted}
          onSelect={setActive}
        />
        {PROJECTS_DATA.map((proj, idx) => (
          active === idx && <ProjectsDetailPanel key={proj.title} data={PROJECTS_DATA} active={active} index={idx} />
        ))}
        <div className={`resume-hints${mounted ? "" : " muted"}`}>
          <div className="resume-hints-row">
            <span className="resume-hints-key">↑↓</span>
            <span>SELECT</span>
          </div>
          <div className="resume-hints-row">
            <span className="resume-hints-key">↵</span>
            <span>CONFIRM</span>
          </div>
          <div className="resume-hints-row">
            <span className="resume-hints-key m">M</span>
            <span className="resume-hints-label m">♪ ON</span>
          </div>
        </div>
      </div>
    </div>
  );
}
