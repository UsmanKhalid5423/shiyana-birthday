import React, { useState } from "react";
import { content } from "../content.js";

const hues = [265, 190, 330, 40, 210, 290, 160, 350, 230, 20, 300, 120];

/* Renders a photo from public/photos; if the file is missing it shows a labelled placeholder. */
export default function Photo({ photo, index, className = "", style, onClick }) {
  const [missing, setMissing] = useState(false);
  const i = index ?? content.photos.indexOf(photo);
  const src = `${import.meta.env.BASE_URL}photos/${photo.file}`;
  const h = hues[(i + hues.length) % hues.length];

  if (missing) {
    return (
      <div
        className={`ph-placeholder ${className}`}
        style={{ ...style, "--h": h }}
        onClick={onClick}
        role={onClick ? "button" : undefined}
      >
        <span className="ph-num">{String(i + 1).padStart(2, "0")}</span>
        <span className="ph-ico">📷</span>
        <span className="ph-file">photos/{photo.file}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={photo.caption}
      className={className}
      style={style}
      onClick={onClick}
      onError={() => setMissing(true)}
      draggable={false}
      loading="lazy"
    />
  );
}
