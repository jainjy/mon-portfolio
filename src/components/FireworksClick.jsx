// src/components/FireworksClick.jsx
import React from "react";
import confetti from "canvas-confetti";

const FireworksClick = () => {
  const handleClick = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    function fireworks(x, y) {
      const end = Date.now() + 1000; // durée 1 seconde

      const colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42"];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x, y },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x, y },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x, y },
      colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd"],
    });
    fireworks()
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center h-screen bg-gray-900 text-white select-none"
    >
      <h1 className="text-3xl font-bold">
        🎆 Clique n’importe où pour lancer les feux d’artifice !
      </h1>
    </div>
  );
};

export default FireworksClick;
