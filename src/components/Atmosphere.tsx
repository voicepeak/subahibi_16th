"use client";

import { useEffect, useRef } from "react";

export function MouseTracker() {
  useEffect(() => {
    let frameId = 0;
    let cx = 0, cy = 0;
    let tx = 0, ty = 0;

    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      const root = document.documentElement;
      root.style.setProperty("--mouse-x", String(cx));
      root.style.setProperty("--mouse-y", String(cy));
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouse);
    frameId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}

export function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const size = 96;
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    let id = 0;

    const draw = () => {
      const d = ctx.createImageData(size, size);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = v;
        d.data[i + 1] = v;
        d.data[i + 2] = v;
        d.data[i + 3] = 16;
      }
      ctx.putImageData(d, 0, 0);
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={ref} className="grain" aria-hidden="true" />;
}

export function FloatingParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.01 - Math.random() * 0.04,
      o: 0.06 + Math.random() * 0.18,
      ph: Math.random() * Math.PI * 2,
    }));

    let id = 0, t = 0;

    const loop = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx + Math.sin(t + p.ph) * 0.015;
        p.y += p.vy;

        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;

        const cd = Math.abs(1 - p.x / w * 2);
        const alpha = p.o * Math.max(0, 1 - cd * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 205, 195, ${alpha})`;
        ctx.fill();
      }

      id = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
