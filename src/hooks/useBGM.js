import { useRef, useEffect, useState, useCallback } from "react";

export function useBGM(src) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const start = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("click", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (audioRef.current) audioRef.current.muted = !m;
      return !m;
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleMute]);

  return { audioRef, muted, toggleMute };
}
