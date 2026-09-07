import { useBGM } from "../../hooks/useBGM";

export function MButton({ bgmSrc }) {
  const { muted } = useBGM(bgmSrc);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}>
      <span style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 3,
        padding: "1px 5px",
        fontSize: 10,
      }}>
        M
      </span>
      <span style={{
        color: muted ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)",
        fontSize: 11,
        letterSpacing: 2,
      }}>
        {muted ? "MUTED" : "♪ ON"}
      </span>
    </div>
  );
}
