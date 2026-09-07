import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeCardList } from "./components/resume/ResumeCardList";
import { ResumeDetailPanel } from "./components/resume/ResumeDetailPanel";
import BgVideo from "./components/shared/BgVideo";
import "./styles/resume/ResumePage.css";
import "./styles/shared/DetailPanel.css";

const SKILL_DATA = [
  {
    id: "i", badge: "I", title: "FLUTTER", subtitle: "DART / APP DEV", rank: 5,
    rows: [
      { index: "01", title: "Dart Fundamentals", status: "Expert" },
      { index: "02", title: "Flutter Widgets", status: "Expert" },
      { index: "03", title: "State Management", status: "Advanced" },
      { index: "04", title: "Platform Channels", status: "Intermediate" },
    ],
    bullets: [
      "- Built cross-platform mobile apps with Flutter & Dart",
      "- Custom animations, gestures, and reactive UI flows",
      "- Firebase / REST integrations and offline-first patterns",
    ],
  },
  {
    id: "ii", badge: "II", title: "ML / DEEP LEARNING", subtitle: "PYTORCH / TENSORFLOW", rank: 4,
    rows: [
      { index: "01", title: "Neural Networks", status: "Advanced" },
      { index: "02", title: "Computer Vision", status: "Advanced" },
      { index: "03", title: "NLP / Transformers", status: "Intermediate" },
      { index: "04", title: "Model Deployment", status: "Intermediate" },
    ],
    bullets: [
      "- Trained custom models for classification and vision tasks",
      "- Worked with CNNs, RNNs, and transformer-based architectures",
      "- Experimented with fine-tuning pretrained models",
    ],
  },
  {
    id: "iii", badge: "III", title: "AI / ML AGENTS", subtitle: "AGENTIC ENGINEERING", rank: 5,
    rows: [
      { index: "01", title: "LLM Integration", status: "Advanced" },
      { index: "02", title: "Agent Orchestration", status: "Advanced" },
      { index: "03", title: "Tool Use / Functions", status: "Intermediate" },
      { index: "04", title: "RAG Pipelines", status: "Intermediate" },
    ],
    bullets: [
      "- Designed agentic workflows with LLMs and tool calling",
      "- Built retrieval-augmented generation pipelines",
      "- Explored autonomous agent planning and memory patterns",
    ],
  },
  {
    id: "iv", badge: "IV", title: "BACKEND", subtitle: "API / SERVICES / DB", rank: 2,
    rows: [
      { index: "01", title: "REST APIs", status: "Expert" },
      { index: "02", title: "Databases / SQL", status: "Advanced" },
      { index: "03", title: "Auth / Security", status: "Intermediate" },
      { index: "04", title: "DevOps / Deploy", status: "Intermediate" },
    ],
    bullets: [
      "- Designed and shipped backend services and REST APIs",
      "- Modeled data with SQL and NoSQL stores",
      "- Containerized services and set up CI/CD flows",
    ],
  },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  const unpin = () => {
    setPinned(false);
    setHovered(false);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") { setPinned(true); setActive((i) => Math.max(0, i - 1)); }
      if (e.key === "ArrowDown") { setPinned(true); setActive((i) => Math.min(SKILL_DATA.length - 1, i + 1)); }
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen" onClickCapture={(e) => {
      if (!e.target.closest(".resume-stack") && !e.target.closest(".resume-detail-panel")) unpin();
    }}>
      <BgVideo src={src} />
      <div className="resume-entry-mask" aria-hidden="true">
        <BgVideo src={src} className="resume-entry-video" />
      </div>
      <div className="resume-overlay">
        <ResumeCardList
          data={SKILL_DATA}
          active={active}
          mounted={mounted}
          onSelect={setActive}
          onHoverChange={setHovered}
          onPin={setPinned}
        />
        {(hovered || pinned) && SKILL_DATA.map((skill, idx) => (
          active === idx && <ResumeDetailPanel key={skill.id} data={SKILL_DATA} active={active} index={idx} />
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