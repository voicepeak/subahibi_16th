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
    let running = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const draw = () => {
      if (!running) return;
      const d = ctx.createImageData(size, size);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = v;
        d.data[i + 1] = v;
        d.data[i + 2] = v;
        d.data[i + 3] = 16;
      }
      ctx.putImageData(d, 0, 0);
      timer = setTimeout(() => requestAnimationFrame(draw), 66);
    };
    draw();

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(id);
        if (timer) clearTimeout(timer);
      } else {
        running = true;
        draw();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(id);
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="grain" aria-hidden="true" />;
}

export function ScanLines() {
  return <div className="scanlines" aria-hidden="true" />;
}

export function Vignette() {
  return <div className="vignette" aria-hidden="true" />;
}

export function FloatingParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;
    let mx = 0, my = 0;
    let running = true;

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

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const pts = Array.from({ length: 20 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.02 - Math.random() * 0.04,
      o: 0.08 + Math.random() * 0.2,
      ph: Math.random() * Math.PI * 2,
      baseVx: 0,
      baseVy: 0,
    }));
    pts.forEach(p => { p.baseVx = p.vx; p.baseVy = p.vy; });

    let id = 0, t = 0;
    let skip = 0;

    const loop = () => {
      if (!running) return;
      skip = (skip + 1) % 2;
      if (skip !== 0) { id = requestAnimationFrame(loop); return; }
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = dist < 120 ? (120 - dist) / 120 * 0.3 : 0;

        p.vx += dx / (dist + 1) * repel * 0.5;
        p.vy += dy / (dist + 1) * repel * 0.5;
        p.vx += (p.baseVx - p.vx) * 0.01;
        p.vy += (p.baseVy - p.vy) * 0.01;
        p.vx += Math.sin(t + p.ph) * 0.008;

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

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

    const onVis = () => { running = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
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
    let running = true;

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
      { color: [230, 212, 186], size: [1.0, 2.2], cycle: [5, 9], hold: [0.08, 0.18], count: 3 },
      { color: [222, 218, 210], size: [0.7, 1.6], cycle: [6, 11], hold: [0.12, 0.25], count: 3 },
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
    let skip = 0;

    const loop = () => {
      if (!running) return;
      skip = (skip + 1) % 3;
      if (skip !== 0) { id = requestAnimationFrame(loop); return; }
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

    const onVis = () => { running = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="sparkles" aria-hidden="true" />;
}
