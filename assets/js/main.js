/* ════════════════════════════════════════════════════════════
   In2Lab — main.js
   Handles:
     1. Hero canvas neural-network animation
     2. Mobile nav burger toggle
   ════════════════════════════════════════════════════════════ */

/* ── MOBILE NAV ─────────────────────────── */
(function () {
  const burger = document.querySelector('.nav-burger');
  const links  = document.querySelector('.nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', function () {
    const visible = links.style.display === 'flex';
    links.style.display = visible ? 'none' : 'flex';
    burger.setAttribute('aria-expanded', String(!visible));
  });
})();

/* ── HERO NETWORK CANVAS ────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cvs = document.getElementById('hero-canvas');
  if (!cvs) return;

  const ctx = cvs.getContext('2d');
  let W, H, nodes, raf;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    W = cvs.offsetWidth;
    H = cvs.offsetHeight;
    cvs.width  = W * dpr;
    cvs.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(58, Math.floor(W * H / 12000));
    nodes = Array.from({ length: n }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  1.5 + Math.random() * 1.8,
    }));
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const D = 145;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x <= 0 || a.x >= W) a.vx *= -1;
      if (a.y <= 0 || a.y >= H) a.vy *= -1;
      for (let j = i + 1; j < nodes.length; j++) {
        const b  = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < D) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(63,191,176,${(1 - d / D) * 0.28})`;
          ctx.lineWidth   = 0.7;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(63,191,176,0.62)';
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(cvs.parentElement);
  resize();
})();
