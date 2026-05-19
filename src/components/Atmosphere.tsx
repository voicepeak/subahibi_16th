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

export function SparkleField() {
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

    const types = [
      { color: [230, 212, 186], size: [1.0, 2.2], cycle: [5, 9], hold: [0.08, 0.18], count: 4 },
      { color: [222, 218, 210], size: [0.7, 1.6], cycle: [6, 11], hold: [0.12, 0.25], count: 4 },
      { color: [198, 208, 218], size: [0.5, 1.3], cycle: [7, 13], hold: [0.18, 0.35], count: 2 },
    ];

    const sp: Array<Record<string, number>> = [];

    for (const t of types) {
      for (let i = 0; i < t.count; i++) {
        sp.push({
          x: Math.random() * w,
          y: 15 + Math.random() * (h - 30),
          size: t.size[0] + Math.random() * (t.size[1] - t.size[0]),
          phase: Math.random() * Math.PI * 2,
          cycle: t.cycle[0] + Math.random() * (t.cycle[1] - t.cycle[0]),
          hold: t.hold[0] + Math.random() * (t.hold[1] - t.hold[0]),
          dx: (Math.random() - 0.5) * 0.012,
          dy: (Math.random() - 0.5) * 0.008,
          r: t.color[0], g: t.color[1], b: t.color[2],
          maxA: 0.22 + Math.random() * 0.18,
        });
      }
    }

    let id = 0, t = 0;

    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const s of sp) {
        s.x += s.dx;
        s.y += s.dy;

        if (s.x < -30) s.x = w + 30;
        if (s.x > w + 30) s.x = -30;
        if (s.y < -30) s.y = h + 30;
        if (s.y > h + 30) s.y = -30;

        const cp = ((t / s.cycle) + s.phase) % 1;
        const fi = 0.12, ho = s.hold, fo = 0.12;
        let alpha = 0;

        if (cp < fi) {
          alpha = cp / fi;
        } else if (cp < fi + ho) {
          alpha = 1;
        } else if (cp < fi + ho + fo) {
          alpha = 1 - (cp - fi - ho) / fo;
        }

        alpha *= s.maxA;

        if (alpha > 0.005) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
          grad.addColorStop(0, `rgba(${~~s.r}, ${~~s.g}, ${~~s.b}, ${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(${~~s.r}, ${~~s.g}, ${~~s.b}, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${~~s.r}, ${~~s.g}, ${~~s.b}, ${alpha})`;
          ctx.fill();
        }
      }

      id = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="sparkles" aria-hidden="true" />;
}
