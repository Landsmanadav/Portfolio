import React, { useRef, useEffect } from "react";
import "./SeaweedCanvasBg.scss";
import { useUi } from "@/context/UiContext";

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
  const { frequency } = useUi();
  const canvasRef = useRef(null);
  const hueGenRef = useRef(null);
  const tRef = useRef(0);

  // ננהל state פנימי עבור ה-amplitude הדינאמי
  const amplitudeRef = useRef(1);
  const targetAmplitudeRef = useRef(1);
  const timeoutRef = useRef();

  // seaweeds ופרמטרים, כמו קודם
  const seaweedsRef = useRef([]);
  const paramsRef = useRef({});

  useEffect(() => {
    if (hueGenRef.current) {
      hueGenRef.current.frequency = frequency;
    }
  }, [frequency]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      paramsRef.current = {
        W,
        H,
        layers: 25,
        baseAmplitude: H * 0.05,
        fastAmplitude: H * 0.01,
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

      // איפוס אמפליטודה להתחלה
      amplitudeRef.current = paramsRef.current.baseAmplitude;
      targetAmplitudeRef.current = paramsRef.current.baseAmplitude;
    }

    hueGenRef.current = new HueGenerator({
      phase: 0,
      offset: 285,
      frequency: frequency,
      amplitude: 85,
    });

    setupCanvas();

    let hueCurrent =
      ((Math.round(hueGenRef.current.value()) % 360) + 360) % 360;

    function animate() {
      tRef.current += 0.02;

      // מעבר הדרגתי (אינטרפולציה) לאמפליטודה
      amplitudeRef.current +=
        (targetAmplitudeRef.current - amplitudeRef.current) * 0.005;

      renderSeaweed();
      requestAnimationFrame(animate);
    }

    function renderSeaweed() {
      const { W, H, waveLen, lineLen, strokeWidth } = paramsRef.current;
      const amplitude = amplitudeRef.current;
      console.log(amplitude);

      ctx.clearRect(0, 0, W, H);

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

      // על תנועה – האמפליטודה הופכת לקטנה
      targetAmplitudeRef.current = paramsRef.current.fastAmplitude;

      // נבטל טיימר קיים
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // אחרי 400ms בלי תנועה – חזרה לערך הרגיל
      timeoutRef.current = setTimeout(() => {
        targetAmplitudeRef.current = paramsRef.current.baseAmplitude;
      }, 600);
    }

    function onResize() {
      setupCanvas();
      renderSeaweed();
    }

    document.addEventListener("mousemove", onMove, { signal });
    document.addEventListener("touchmove", onMove, { signal });
    window.addEventListener("resize", onResize, { signal });

    return () => {
      controller.abort();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <canvas
      id="background-canvas"
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
