"use client";

import React, { useEffect, useState } from "react";
import { themeManager } from "./themeManager";

/**
 * Loading de marca — MILLY STORE.
 * - Sin imágenes: wordmark en texto con brillo que recorre las letras.
 * - Tema claro → vinotinto. Tema oscuro → blanco.
 * - Autocontenido: los keyframes viven en este archivo.
 * - Respeta prefers-reduced-motion.
 */
export function Loading3DIcon() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const checkTheme = () => setTheme(themeManager.getTheme());
    checkTheme();
    window.addEventListener("theme-changed", checkTheme);
    return () => window.removeEventListener("theme-changed", checkTheme);
  }, []);

  const isLight = theme === "light";

  const colors = {
    "--mlyl-color": isLight ? "#5a0a12" : "#ffffff",
    "--mlyl-shine": isLight ? "#c0525e" : "rgba(255, 255, 255, 0.28)",
    "--mlyl-muted": isLight ? "#6b4a47" : "rgba(255, 255, 255, 0.72)",
  } as React.CSSProperties;

  return (
    <div
      className="mlyl-root"
      style={colors}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mlyl-stage">
        {/* Resplandor de fondo */}
        <div className="mlyl-glow" aria-hidden="true" />

        {/* Wordmark */}
        <h2 className="mlyl-word" aria-hidden="true">MILLY</h2>

        {/* STORE con líneas laterales (guiño al logo) */}
        <div className="mlyl-sub" aria-hidden="true">
          <span className="mlyl-line mlyl-line-l" />
          <span className="mlyl-store">STORE</span>
          <span className="mlyl-line mlyl-line-r" />
        </div>
      </div>

      {/* Texto de carga */}
      <p className="mlyl-label">
        Cargando productos de MillyStore
        <span className="mlyl-dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>

      {/* Barra de progreso indeterminada */}
      <div className="mlyl-bar" aria-hidden="true">
        <span className="mlyl-bar-fill" />
      </div>

      <style>{`
        .mlyl-root {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
          user-select: none;
        }

        .mlyl-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 28px 40px;
        }

        /* ---------- Glow ---------- */
        .mlyl-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            color-mix(in srgb, var(--mlyl-color) 22%, transparent) 0%,
            transparent 70%
          );
          filter: blur(24px);
          animation: mlyl-breathe 3s ease-in-out infinite;
        }

        /* ---------- Wordmark ---------- */
        .mlyl-word {
          position: relative;
          margin: 0;
          font-family: var(--font-heading-family, "Cormorant Garamond", "Playfair Display", Georgia, serif);
          font-size: clamp(2.8rem, 9vw, 4.2rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.22em;
          padding-left: 0.22em; /* compensa el letter-spacing para centrar */
          color: var(--mlyl-color);
          background: linear-gradient(
            100deg,
            var(--mlyl-color) 0%,
            var(--mlyl-color) 38%,
            var(--mlyl-shine) 50%,
            var(--mlyl-color) 62%,
            var(--mlyl-color) 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
                  background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: mlyl-shine 2.6s ease-in-out infinite;
        }

        /* ---------- STORE + líneas ---------- */
        .mlyl-sub {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mlyl-store {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.5em;
          padding-left: 0.5em;
          color: var(--mlyl-color);
        }

        .mlyl-line {
          display: block;
          width: 54px;
          height: 1px;
          background: var(--mlyl-color);
          opacity: 0.7;
          animation: mlyl-line 2.6s ease-in-out infinite;
        }
        .mlyl-line-l { transform-origin: right center; }
        .mlyl-line-r { transform-origin: left center; }

        /* ---------- Texto ---------- */
        .mlyl-label {
          margin: 18px 0 0;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-align: center;
          color: var(--mlyl-muted);
        }

        .mlyl-dots span {
          display: inline-block;
          animation: mlyl-dot 1.4s ease-in-out infinite;
        }
        .mlyl-dots span:nth-child(2) { animation-delay: 0.2s; }
        .mlyl-dots span:nth-child(3) { animation-delay: 0.4s; }

        /* ---------- Barra ---------- */
        .mlyl-bar {
          position: relative;
          width: 132px;
          height: 2px;
          margin-top: 14px;
          overflow: hidden;
          border-radius: 2px;
          background: color-mix(in srgb, var(--mlyl-color) 16%, transparent);
        }

        .mlyl-bar-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 42%;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, var(--mlyl-color), transparent);
          animation: mlyl-slide 1.5s ease-in-out infinite;
        }

        /* ---------- Keyframes ---------- */
        @keyframes mlyl-shine {
          0%   { background-position: 130% 0; }
          100% { background-position: -130% 0; }
        }

        @keyframes mlyl-breathe {
          0%, 100% { opacity: 0.55; transform: scale(0.95); }
          50%      { opacity: 1;    transform: scale(1.05); }
        }

        @keyframes mlyl-line {
          0%, 100% { transform: scaleX(0.45); opacity: 0.4; }
          50%      { transform: scaleX(1);    opacity: 0.9; }
        }

        @keyframes mlyl-dot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40%           { opacity: 1;    transform: translateY(-2px); }
        }

        @keyframes mlyl-slide {
          0%   { transform: translateX(-110%); }
          100% { transform: translateX(260%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mlyl-glow,
          .mlyl-word,
          .mlyl-line,
          .mlyl-dots span,
          .mlyl-bar-fill {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
          }
          .mlyl-word { background-position: 50% 0; }
          .mlyl-bar-fill { transform: translateX(80%); }
        }
      `}</style>
    </div>
  );
}