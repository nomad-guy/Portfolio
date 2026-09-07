import { useState, useEffect } from "react";
import "./styles/menu/P3Menu.css";

const ITEMS = [
  { id: "about",   label: "ABOUT ME",      page: "about",   fontSize: 80, offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 10  },
  { id: "resume",  label: "RESUME",        page: "resume",  fontSize: 66, offsetX: 20, offsetY: 8,  skew: -11, skewY: -10 },
  { id: "github",  label: "GITHUB LINK",   page: "github",  fontSize: 68, offsetX: 8, offsetY: 6,  skew: 0, skewY: -4, external: true  },
  { id: "socials", label: "SOCIALS",       page: "socials", fontSize: 74, offsetX: 16, offsetY: 8,  skew: -3,  skewY: 5   },
  { id: "sideproj",label: "PROJECTS", page: "sideproj",fontSize: 56, offsetX: 10, offsetY: 6,  skew: -4,  skewY: 7   },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function P3Menu({ onNavigate }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const activate = (idx) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     onNavigate?.(ITEMS[active].page);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="p3-overlay">
        <div className="p3-name-tag">
          <span>nomad-guy's</span>
          <span>persona</span>
        </div>
        <div className="p3-stripe" />
        <div className="p3-stripe2" />

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];            return (
              <div
                key={item.id}
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginRight: item.offsetX,
                  marginTop: item.offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  if (e.target.closest(".p3-label-wrap")) return; // label handler does it
                  if (isActive) {
                    if (item.external) window.open("https://github.com/nomad-guy", "_blank");
                    else onNavigate?.(item.page);
                  } else {
                    activate(i);
                  }
                }}
                onMouseEnter={() => activate(i)}
                role="button"
                tabIndex={0}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className="p3-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`p3-shadow-tri${isActive ? ' pop' : ''}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="p3-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />                <div
                  className="p3-label-wrap"
                  style={{ opacity }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.external) {
                      window.open('https://github.com/nomad-guy', '_blank');
                    } else {
                      onNavigate?.(item.page);
                    }
                  }}
                >
                  <span className="p3-label-base p3-label-dark" style={{ fontSize: item.fontSize }}>
                    {item.label}
                  </span>
                  <span
                    className="p3-label-base p3-label-bright"
                    style={{
                      fontSize: item.fontSize,
                      clipPath: clipFn(estW, estH),
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                </div>
                <div className="p3-glow" />
              </div>
            );
          })}
        </nav>

        <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key p3-hint-key-m">M</span><span className="p3-hint-label-m">♪ ON</span></div>
        </div>
      </div>
    </>
  );
}
