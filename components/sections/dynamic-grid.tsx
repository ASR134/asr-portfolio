"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    const STAR_COUNT = 180;

    interface Star {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      color: string;
    }

    function randomStar(): Star {
      const roll = Math.random();
      // Mostly white, rare green/cyan accent
      const color =
        roll < 0.04 ? "0,255,135"
        : roll < 0.07 ? "0,194,255"
        : "255,255,255";

      const size = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.4 + size * 1.2,
        baseOpacity: 0.08 + size * 0.35,
        opacity: 0.08 + size * 0.35,
        // Very slow twinkle — matches the screenshot feel
        twinkleSpeed: 0.08 + Math.random() * 0.18,
        twinkleOffset: Math.random() * Math.PI * 2,
        color,
      };
    }

    let stars: Star[] = Array.from({ length: STAR_COUNT }, randomStar);
    let elapsed = 0;
    let last = performance.now();

    function draw(now: number) {
      if (!ctx) return;
      const dt = Math.min(now - last, 32);
      last = now;
      elapsed += dt;

      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        // Very slow sine wave twinkle
        s.opacity =
          s.baseOpacity *
          (0.6 + 0.4 * Math.sin(elapsed * 0.001 * s.twinkleSpeed + s.twinkleOffset));

        // Tiny glow for slightly bigger stars
        if (s.size > 1.0) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3.5);
          glow.addColorStop(0, `rgba(${s.color},${s.opacity * 0.4})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, randomStar);
    };

    window.addEventListener("resize", onResize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}