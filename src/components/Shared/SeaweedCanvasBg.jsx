import React, { useRef, useEffect } from "react";

class HueGenerator {
  constructor({
    phase = 0,
    offset = 285,
    frequency = 0.0015,
    amplitude = 85,
  } = {}) {
    this.phase = phase;
    this.offset = offset;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }
  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
  value() {
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

export default function SeaweedCanvasBg() {
  const canvasRef = useRef(null);
  const hueGenRef = useRef(null);
  const tRef = useRef(0);

  // נוסיף useRef כדי לאתחל את seaweeds מחדש ב־resize
  const seaweedsRef = useRef([]);
  // נוסיף גם פרמטרים שישתנו ב־resize
  const paramsRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function setupCanvas() {
      const dpr = window.devicePixelRatio || 1;
      let W = window.innerWidth;
      let H = window.innerHeight;

      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      paramsRef.current = {
        W,
        H,
        layers: 25,
        amplitude: H * 0.07,
        waveLen: H * 1.5,
        lineLen: H * 1,
        strokeWidth: 1,
        offsetX: W * 0.7,
        regionWidth: W * 0.2,
      };

      seaweedsRef.current = Array.from({
        length: paramsRef.current.layers,
      }).map((_, i) => ({
        x:
          paramsRef.current.offsetX +
          (paramsRef.current.regionWidth / (paramsRef.current.layers - 1)) * i,
        phaseOffset: Math.random() * Math.PI * 2,
      }));
    }

    hueGenRef.current = new HueGenerator({
      phase: 0,
      offset: 285,
      frequency: 0.0015,
      amplitude: 85,
    });

    setupCanvas();

    let hueCurrent =
      ((Math.round(hueGenRef.current.value()) % 360) + 360) % 360;

    function animate() {
      tRef.current += 0.02; // תנועה תמידית של הגלים
      renderSeaweed();
      requestAnimationFrame(animate);
    }

    function renderSeaweed() {
      const { W, H, amplitude, waveLen, lineLen, strokeWidth } =
        paramsRef.current;

      ctx.fillStyle = "#222222";
      ctx.fillRect(0, 0, W, H);

      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = `hsla(${hueCurrent},50%,50%,0.2)`;

      seaweedsRef.current.forEach(({ x, phaseOffset }) => {
        ctx.beginPath();
        ctx.moveTo(x, H);
        for (let y = H; y >= H - lineLen; y -= 2) {
          const theta = y / waveLen + phaseOffset + tRef.current;
          const dx = Math.sin(theta) * amplitude;
          ctx.lineTo(x + dx, y);
        }
        ctx.stroke();
      });
    }

    renderSeaweed();
    animate();

    function onMove() {
      hueGenRef.current.update();
      hueCurrent = ((Math.round(hueGenRef.current.value()) % 360) + 360) % 360;
    }

    function onResize() {
      setupCanvas();
      // לא מאתחלים t/hueGen, הגל והצבע ימשיכו כאילו לא קרה כלום!
      // אפשר להפעיל renderSeaweed מיד כדי למנוע פליקר עד הפריים הבא
      renderSeaweed();
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
}
