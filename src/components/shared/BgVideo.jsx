import { useState } from "react";

export default function BgVideo({ src, className, ...rest }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <div className="bg-video-loader" aria-hidden="true" />}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setReady(true)}
        className={className}
        {...rest}
      />
    </>
  );
}