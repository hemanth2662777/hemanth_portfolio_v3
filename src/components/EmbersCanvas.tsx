import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;

  size: number;

  speedX: number;
  speedY: number;

  drift: number;
  driftSpeed: number;
  driftOffset: number;

  color: string;

  opacity: number;
  maxOpacity: number;

  life: number;
  maxLife: number;

  pulse: number;
  pulseSpeed: number;

  rotation: number;
  rotationSpeed: number;

  trail: number;

  type: "ember" | "spark" | "orb";
}

export const EmbersCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    /* =========================================================
       CANVAS CONFIGURATION
       ========================================================= */

    let width = window.innerWidth;
    let height = window.innerHeight;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let animationFrameId = 0;

    let isVisible = true;

    /* =========================================================
       COLORS
       ========================================================= */

    const colors = [
      "#8b5cf6",
      "#a855f7",
      "#c084fc",
      "#d946ef",
      "#f0abfc",
      "#ff00ff",
      "#ff174f",
      "#ef4444",
    ];

    /* =========================================================
       MOUSE
       ========================================================= */

    let mouseX = -1000;
    let mouseY = -1000;

    let targetMouseX = -1000;
    let targetMouseY = -1000;

    /* =========================================================
       PARTICLE STORAGE
       ========================================================= */

    const particles: Particle[] = [];

    const getParticleCount = () => {
      const area = width * height;

      /*
       * Keeps the effect visually rich without creating
       * hundreds of expensive canvas particles.
       */

      const baseCount = Math.floor(area / 18000);

      const mobileLimit = width < 768 ? 35 : 75;

      return Math.min(Math.max(baseCount, 25), mobileLimit);
    };

    /* =========================================================
       RANDOM HELPERS
       ========================================================= */

    const randomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const randomType = (): Particle["type"] => {
      const value = Math.random();

      if (value < 0.68) return "ember";
      if (value < 0.9) return "spark";

      return "orb";
    };

    /* =========================================================
       PARTICLE CREATION
       ========================================================= */

    const createParticle = (initialRandomPosition = false): Particle => {
      const maxLife = 220 + Math.random() * 320;

      const type = randomType();

      let size = 1.2 + Math.random() * 2;

      if (type === "spark") {
        size = 0.7 + Math.random() * 1.4;
      }

      if (type === "orb") {
        size = 2.2 + Math.random() * 2.8;
      }

      return {
        x: Math.random() * width,

        y: initialRandomPosition
          ? Math.random() * height
          : height + Math.random() * 50,

        size,

        speedX: (Math.random() - 0.5) * (type === "spark" ? 0.7 : 0.45),

        speedY: 0.35 + Math.random() * (type === "spark" ? 1.2 : 0.75),

        drift: 0.15 + Math.random() * 0.45,

        driftSpeed: 0.008 + Math.random() * 0.018,

        driftOffset: Math.random() * Math.PI * 2,

        color: randomColor(),

        opacity: 0,

        maxOpacity:
          type === "orb"
            ? 0.18 + Math.random() * 0.28
            : 0.25 + Math.random() * 0.65,

        life: initialRandomPosition ? Math.random() * maxLife : 0,

        maxLife,

        pulse: Math.random() * Math.PI * 2,

        pulseSpeed: 0.025 + Math.random() * 0.04,

        rotation: Math.random() * Math.PI * 2,

        rotationSpeed: (Math.random() - 0.5) * 0.04,

        trail:
          type === "spark" ? 7 + Math.random() * 12 : 2 + Math.random() * 6,

        type,
      };
    };

    /* =========================================================
       INITIALIZE PARTICLES
       ========================================================= */

    const initializeParticles = () => {
      particles.length = 0;

      const count = getParticleCount();

      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    };

    /* =========================================================
       CANVAS RESIZE
       ========================================================= */

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);

      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      /*
       * Draw using CSS pixel coordinates.
       */

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initializeParticles();
    };

    /* =========================================================
       MOUSE MOVEMENT
       ========================================================= */

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = event.clientX;
      targetMouseY = event.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    /* =========================================================
       VISIBILITY OBSERVER
       ========================================================= */

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    /* =========================================================
       PARTICLE RESET
       ========================================================= */

    const resetParticle = (particle: Particle) => {
      const replacement = createParticle(false);

      particle.x = replacement.x;
      particle.y = replacement.y;

      particle.size = replacement.size;

      particle.speedX = replacement.speedX;

      particle.speedY = replacement.speedY;

      particle.drift = replacement.drift;

      particle.driftSpeed = replacement.driftSpeed;

      particle.driftOffset = replacement.driftOffset;

      particle.color = replacement.color;

      particle.opacity = 0;

      particle.maxOpacity = replacement.maxOpacity;

      particle.life = 0;

      particle.maxLife = replacement.maxLife;

      particle.pulse = replacement.pulse;

      particle.pulseSpeed = replacement.pulseSpeed;

      particle.rotation = replacement.rotation;

      particle.rotationSpeed = replacement.rotationSpeed;

      particle.trail = replacement.trail;

      particle.type = replacement.type;
    };

    /* =========================================================
       DRAW GLOW
       ========================================================= */

    const drawGlow = (p: Particle, alpha: number) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size * 7,
      );

      gradient.addColorStop(
        0,
        `${p.color}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`,
      );

      gradient.addColorStop(1, `${p.color}00`);

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(p.x, p.y, p.size * 7, 0, Math.PI * 2);

      ctx.fill();
    };

    /* =========================================================
       DRAW PARTICLE
       ========================================================= */

    const drawParticle = (p: Particle) => {
      const pulse = 0.75 + Math.sin(p.pulse) * 0.25;

      const alpha = Math.max(0, Math.min(1, p.opacity * pulse));

      if (alpha <= 0) return;

      ctx.save();

      ctx.globalAlpha = alpha;

      /* -------------------------------------------------------
         TRAIL
         ------------------------------------------------------- */

      if (p.type === "spark" && p.trail > 0) {
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.trail);

        gradient.addColorStop(0, p.color);

        gradient.addColorStop(1, `${p.color}00`);

        ctx.strokeStyle = gradient;

        ctx.lineWidth = Math.max(0.5, p.size * 0.75);

        ctx.beginPath();

        ctx.moveTo(p.x, p.y);

        ctx.lineTo(p.x, p.y + p.trail);

        ctx.stroke();
      }

      /* -------------------------------------------------------
         SOFT GLOW
         ------------------------------------------------------- */

      drawGlow(p, alpha * 0.35);

      /* -------------------------------------------------------
         MAIN PARTICLE
         ------------------------------------------------------- */

      ctx.shadowBlur = p.type === "orb" ? 18 : 10;

      ctx.shadowColor = p.color;

      ctx.fillStyle = p.color;

      if (p.type === "spark") {
        /*
         * Small diamond-shaped sparks.
         */

        ctx.translate(p.x, p.y);

        ctx.rotate(p.rotation);

        ctx.beginPath();

        ctx.moveTo(0, -p.size * 1.8);

        ctx.lineTo(p.size, 0);

        ctx.lineTo(0, p.size * 1.8);

        ctx.lineTo(-p.size, 0);

        ctx.closePath();

        ctx.fill();
      } else {
        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fill();
      }

      ctx.restore();
    };

    /* =========================================================
       UPDATE PARTICLE
       ========================================================= */

    const updateParticle = (p: Particle) => {
      p.life++;

      /* Vertical floating */
      p.y -= p.speedY;

      /* Organic horizontal movement */
      p.x +=
        p.speedX + Math.sin(p.life * p.driftSpeed + p.driftOffset) * p.drift;

      /* Pulse */
      p.pulse += p.pulseSpeed;

      /* Rotation */
      p.rotation += p.rotationSpeed;

      /* -------------------------------------------------------
         CURSOR INTERACTION
         ------------------------------------------------------- */

      const dx = p.x - mouseX;

      const dy = p.y - mouseY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const interactionRadius = 110;

      if (distance < interactionRadius) {
        const safeDistance = Math.max(distance, 1);

        const force =
          ((interactionRadius - distance) / interactionRadius) * 0.7;

        p.x += (dx / safeDistance) * force;

        p.y += (dy / safeDistance) * force;
      }

      /* -------------------------------------------------------
         FADE
         ------------------------------------------------------- */

      const fadeIn = Math.min(1, p.life / 60);

      const remaining = p.maxLife - p.life;

      const fadeOut = Math.min(1, remaining / 70);

      p.opacity = Math.min(fadeIn, fadeOut) * p.maxOpacity;

      /* -------------------------------------------------------
         BOUNDARY
         ------------------------------------------------------- */

      if (p.life >= p.maxLife || p.y < -40 || p.x < -50 || p.x > width + 50) {
        resetParticle(p);
      }
    };

    /* =========================================================
       MAIN RENDER LOOP
       ========================================================= */

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);

        return;
      }

      /* Clear */
      ctx.clearRect(0, 0, width, height);

      /* Smooth cursor movement */
      mouseX += (targetMouseX - mouseX) * 0.08;

      mouseY += (targetMouseY - mouseY) * 0.08;

      /* Update + render */
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        updateParticle(particle);

        drawParticle(particle);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    /* =========================================================
       EVENT LISTENERS
       ========================================================= */

    window.addEventListener("resize", resizeCanvas, { passive: true });

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    /* =========================================================
       INITIAL SETUP
       ========================================================= */

    resizeCanvas();

    render();

    /* =========================================================
       CLEANUP
       ========================================================= */

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseleave", handleMouseLeave);

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id="embers"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-80" />
    </div>
  );
};
