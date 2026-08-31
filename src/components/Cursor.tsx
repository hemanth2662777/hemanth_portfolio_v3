import React, { useEffect, useRef, useState } from "react";

export const Cursor: React.FC = () => {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const checkHoverables = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest(
          'button, a, input, textarea, select, [role="button"], .project-card, .skill-card, .timeline-item',
        ),
      );
      setIsHovering(isInteractive);
    };

    const animate = () => {
      // Lerp smooth trailing for ring & glow
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousemove", checkHoverables, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", checkHoverables);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Ambient Large Glow */}
      <div
        ref={glowRef}
        id="cursorGlow"
        className={`absolute top-0 left-0 h-44 w-44 rounded-full transition-all duration-300 ${
          isHovering
            ? "bg-gradient-to-r from-purple-600/25 to-pink-600/25 blur-3xl scale-125"
            : "bg-purple-600/15 blur-2xl"
        }`}
      />

      {/* Trailing Physics Ring */}
      <div
        ref={ringRef}
        id="cursorRing"
        className={`absolute top-0 left-0 rounded-full border transition-[width,height,border-color,background-color,border-radius] duration-200 ease-out ${
          isClicking
            ? "h-7 w-7 border-red-500 bg-red-500/20 shadow-[0_0_15px_#ff174f]"
            : isHovering
              ? "h-12 w-12 border-purple-400 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              : "h-9 w-9 border-purple-500/60 bg-transparent"
        }`}
      />

      {/* Instant Precision Core */}
      <div
        ref={coreRef}
        id="cursorCore"
        className={`absolute top-0 left-0 rounded-full transition-transform duration-75 ${
          isClicking
            ? "h-2.5 w-2.5 bg-red-400 shadow-[0_0_12px_#ff174f]"
            : isHovering
              ? "h-2 w-2 bg-white shadow-[0_0_10px_#fff]"
              : "h-1.5 w-1.5 bg-purple-400 shadow-[0_0_8px_#c084fc]"
        }`}
      />
    </div>
  );
};
