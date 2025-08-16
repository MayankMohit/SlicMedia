import { useEffect, useRef } from "react";

/**
 * Slingy SVG Mouse Trail (polyline + spring physics)
 * - No React state in the render loop (fast + smooth)
 * - Fullscreen overlay, pointer-events: none
 * - Works across your whole site when mounted at the root
 */
export default function MouseTrailSVG({
  points = 24, // number of segments in the trail
  stiffness = 0.18, // spring pull strength (0.1–0.3 is sweet spot)
  damping = 0.75, // velocity decay (0.7–0.9)
  width = 4, // stroke width
  colors = ["#98ff84", "#00ffd5"], // gradient start → end
  glow = true, // subtle glow filter
  hiddenOnReduceMotion = true, // auto-disable if user prefers reduced motion
} = {}) {
  const svgRef = useRef(null);
  const polyRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const trailRef = useRef([]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (
      hiddenOnReduceMotion &&
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // do not mount animation
    }

    const svg = svgRef.current;
    const poly = polyRef.current;

    const pointerCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    const num = pointerCoarse ? Math.max(12, Math.floor(points * 0.6)) : points;

    // Seed trail at current mouse position
    trailRef.current = Array.from({ length: num }, () => ({
      x: mouse.current.x,
      y: mouse.current.y,
      vx: 0,
      vy: 0,
    }));

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      // Keep the polyline visible while resizing by rebuilding points string
      if (trailRef.current.length) {
        const s = trailRef.current
          .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(" ");
        poly.setAttribute("points", s);
      }
    };
    setSize();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const animate = () => {
      const spring = stiffness;
      const friction = damping;
      const pts = trailRef.current;

      // First segment is pulled to the mouse; each following segment chases the previous.
      let tx = mouse.current.x;
      let ty = mouse.current.y;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = tx - p.x;
        const dy = ty - p.y;

        p.vx += dx * spring;
        p.vy += dy * spring;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        tx = p.x;
        ty = p.y;
      }

      // Update SVG polyline without causing React re-render
      const str = pts
        .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join(" ");
      poly.setAttribute("points", str);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [points, stiffness, damping, hiddenOnReduceMotion]);

  const gradientId = "trail-grad";
  const glowId = "trail-glow";

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[5000]"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
          <stop offset="100%" stopColor={colors[1] || colors[0]} stopOpacity="1" />
        </linearGradient>
        {glow && (
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <polyline
        ref={polyRef}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeLinecap="round"
        filter={glow ? `url(#${glowId})` : undefined}
        style={{ mixBlendMode: "screen" }}
      />
    </svg>
  );
}
