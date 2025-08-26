import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import TSParticles from "react-tsparticles";
import { motion } from "framer-motion";

const ParticleBackground = ({ density = 80 }) => {
    const particlesInit = useCallback(async (engine) => {
      await loadSlim(engine);
    }, []);
  
    const options = {
      particles: {
        number: {
          value: density,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ["#a855f7", "#ec4899", "#3b82f6"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
        },
        size: {
          value: { min: 1, max: 6 },
        },
        move: {
          enable: true,
          speed: { min: 0.5, max: 2 },
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
          attract: {
            enable: true,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    };
  
    return (
      <TSParticles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="absolute inset-0 pointer-events-none"
      />
    );
  };
  export default ParticleBackground