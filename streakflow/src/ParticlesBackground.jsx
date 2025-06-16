import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

/**
 * PUBLIC_INTERFACE
 * ParticlesBackground renders a soft moving orbs (pastel, unobtrusive) effect beneath other content.
 * Pastel, very low opacity, blurred, non-distracting - fits a minimalist background aesthetic.
 * NOTE: Does not use PUBLIC_URL or assets/images, only built-in shapes/colors.
 */
function ParticlesBackground() {
  // Orbs config: Slow, floating, soft pastel, blurred/glossy on dark or light, very faint.
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Pastel palette, only solid color orbs; no image, no asset background, no PUBLIC_URL.
  const orbColors = [
    "#A8D5BA", // Green pastel
    "#A3D5FF", // Blue pastel
    "#F4C2C2", // Pink pastel
    "#F7E9E4", // Cream
    "#E4ECF7"  // Light blue
  ];

  return (
    <Particles
      id="background-orbs"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 }, // Ensure below app content
        fpsLimit: 40,
        particles: {
          number: {
            value: 16,
            density: { enable: true, area: 800 }
          },
          color: {
            value: orbColors
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.13,
            random: { enable: true, minimumValue: 0.09 }
          },
          size: {
            value: { min: 46, max: 100 },
            random: { enable: true, minimumValue: 28 },
            animation: { enable: true, speed: 5, minimumValue: 34, sync: false }
          },
          move: {
            enable: true,
            speed: 0.27,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
            // gentle floating
          }
        },
        detectRetina: true,
        background: { color: "transparent" }
        // style (css object) not needed in config (React prop below handles this)
      }}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}

export default ParticlesBackground;
