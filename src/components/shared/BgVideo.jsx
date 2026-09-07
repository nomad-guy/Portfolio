import { useEffect, useRef, useState } from "react";

export default function BgVideo({ src, className, ...rest }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Already buffered (e.g. browser cache) — canplay already fired.
    if (video.readyState >= 3) {
      const raf = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(raf);
    }

    const onReady = () => setReady(true);
    // Never let a broken/unreachable video block the page.
    const onError = () => setReady(true);

    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", onError);

    // Safety net: clear the loader no matter what.
    const timeout = setTimeout(() => setReady(true), 6000);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
    };
  }, [src]);

  return (
    <>
      {!ready && <div className="bg-video-loader" aria-hidden="true" />}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        {...rest}
      />
    </>
  );
}