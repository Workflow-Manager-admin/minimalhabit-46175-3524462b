import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/**
 * PUBLIC_INTERFACE
 * ProgressRing displays an animated SVG progress ring for habit completion progress.
 * - Animates color smoothly from red to orange to green as progress increases (0→50→100).
 * - If incomplete, adds a pulsing glow effect by wrapping with a CSS-animated div.
 *
 * Props:
 *   value (number, required): Progress percentage (0-100)
 *   size (number, optional): Width/height in px (default 56)
 *   showText (bool): Show percentage text inside ring (default false)
 *   pulse (bool): If true, will show a pulsing glow around the ring
 *   ariaLabel (string): For accessibility, describes the ring purpose
 */
function getInterpolatedColor(percent) {
  // Map: 0% = red (#f2463a), 50% = orange (#fbad26), 100% = green (#61c471)
  if (percent <= 50) {
    // Interpolate red → orange
    // Red:   #f2463a (242,70,58)
    // Orange:#fbad26 (251,173,38)
    const t = percent / 50;
    const r = Math.round(242 + (251 - 242) * t);
    const g = Math.round(70 + (173 - 70) * t);
    const b = Math.round(58 + (38 - 58) * t);
    return `rgb(${r},${g},${b})`;
  } else {
    // Interpolate orange → green
    // Orange:#fbad26 (251,173,38)
    // Green: #61c471 (97,196,113)
    const t = (percent - 50) / 50;
    const r = Math.round(251 + (97 - 251) * t);
    const g = Math.round(173 + (196 - 173) * t);
    const b = Math.round(38 + (113 - 38) * t);
    return `rgb(${r},${g},${b})`;
  }
}

function ProgressRing({ value, size = 56, showText = false, pulse = false, ariaLabel = "Progress ring" }) {
  const color = getInterpolatedColor(value || 0);
  const glowClass = pulse && value < 100 ? "progress-ring-glow-animate" : "";
  return (
    <div
      className={`progress-ring-outer ${glowClass}`}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle"
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={showText ? `${Math.round(value)}%` : ""}
        strokeWidth={9}
        styles={buildStyles({
          // Trail (background)
          trailColor: "#E4ECF7",
          pathColor: color,
          pathTransition: "stroke-dashoffset 0.6s cubic-bezier(.47,0,.38,1), stroke 0.6s",
          strokeLinecap: "round",
          textColor: color,
          textSize: "1.4em",
        })}
      />
    </div>
  );
}

export default ProgressRing;
