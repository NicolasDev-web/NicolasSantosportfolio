import { useCallback, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [, setInit] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    setInit(true);
  }, []);

  const particlesLoaded = useCallback(async (_container?: Container) => {
    // particles loaded
  }, []);

  return (
    // @ts-ignore - tsparticles init prop typing mismatch
    <Particles
      id="tsparticles"
      // @ts-ignore
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: { enable: true },
          },
          color: { value: ["#7c3aed", "#06b6d4", "#a78bfa"] },
          links: {
            enable: true,
            color: "#7c3aed",
            distance: 150,
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          shape: { type: "circle" },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.35,
                color: "#06b6d4",
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
