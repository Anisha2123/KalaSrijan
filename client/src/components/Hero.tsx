"use client";

import { useEffect, useRef, useState } from "react";

const CRAFTS = [
  "Drawing",
  "Sewing",
  "Cooking",
  "Clay Art",
  "Lippan Art",
  "Paper Craft",
  "Home Décor",
];

function FloatingPetal({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <div
      className="floating-petal"
      style={style}
    />
  );
}

export default function KalasrijanHero() {
  const [activeWord, setActiveWord] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % CRAFTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const petals = Array.from({ length: 12 }, (_, i) => ({
    left: `${8 + (i * 7.5) % 90}%`,
    top: `${5 + (i * 11) % 80}%`,
    width: `${18 + (i * 7) % 32}px`,
    height: `${18 + (i * 7) % 32}px`,
    animationDelay: `${(i * 0.7).toFixed(1)}s`,
    animationDuration: `${5 + (i % 4)}s`,
    opacity: 0.18 + (i % 5) * 0.06,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --coral: #CD2C58;
          --rose: #E06B80;
          --sand: #FFC69D;
          --blush: #FFE6D4;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .kala-hero {
          min-height: 100vh;
          background: var(--blush);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Layered background */
        .kala-bg-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .kala-bg-circle--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(205,44,88,0.10) 0%, transparent 70%);
          top: -120px; right: -120px;
          animation: driftA 10s ease-in-out infinite alternate;
        }
        .kala-bg-circle--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(224,107,128,0.13) 0%, transparent 70%);
          bottom: -80px; left: -80px;
          animation: driftB 13s ease-in-out infinite alternate;
        }
        .kala-bg-circle--3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(255,198,157,0.28) 0%, transparent 70%);
          top: 40%; left: 55%;
          animation: driftA 8s ease-in-out infinite alternate;
        }
        @keyframes driftA {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, -20px) scale(1.06); }
        }
        @keyframes driftB {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-20px, 25px) scale(1.04); }
        }

        /* Floating petals / shapes */
        .floating-petal {
          position: absolute;
          border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
          pointer-events: none;
          background: var(--rose);
          animation: petalFloat linear infinite;
        }
        @keyframes petalFloat {
          0%   { transform: translateY(0) rotate(0deg); opacity: inherit; }
          50%  { transform: translateY(-18px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); opacity: inherit; }
        }

        /* Thin horizontal rule accent */
        .kala-rule {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, var(--coral), transparent);
          margin-bottom: 28px;
          animation: fadeSlideUp 1s ease 0.2s both;
        }

        /* Tagline chip */
        .kala-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(205,44,88,0.08);
          border: 1px solid rgba(205,44,88,0.20);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--coral);
          font-weight: 500;
          margin-bottom: 28px;
          animation: fadeSlideUp 0.9s ease 0.0s both;
        }
        .kala-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--coral);
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }

        /* Main heading */
        .kala-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 7vw, 4.5rem);
          font-weight: 300;
          line-height: 1.05;
          color: #2a1018;
          margin-bottom: 12px;
          animation: fadeSlideUp 1s ease 0.3s both;
        }
        .kala-heading em {
          font-style: italic;
          color: var(--coral);
        }

        /* Rotating craft word */
        .kala-craft-word {
        font-size:3.5rem;
          display: inline-block;
          position: relative;
          height: 1.15em;
          overflow: hidden;
          vertical-align: bottom;
          min-width: 320px;
        }
        .kala-craft-word span {
          display: block;
          position: absolute;
          left: 0; bottom: 0;
          font-style: italic;
          color: var(--rose);
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease;
          transform: translateY(0%);
          opacity: 1;
          white-space: nowrap;
        }
        .kala-craft-word span.exit {
          transform: translateY(-120%);
          opacity: 0;
        }
        .kala-craft-word span.enter {
          transform: translateY(120%);
          opacity: 0;
        }

        /* Body copy */
        .kala-body {
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          color: #7a4a55;
          line-height: 1.8;
          max-width: 480px;
          margin-bottom: 44px;
          font-weight: 300;
          animation: fadeSlideUp 1s ease 0.5s both;
        }

        /* Suman signature */
        .kala-signature {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-style: italic;
          color: var(--coral);
          margin-bottom: 44px;
          animation: fadeSlideUp 1s ease 0.6s both;
          opacity: 0.85;
        }

        /* CTA buttons */
        .kala-ctas {
          display: flex; gap: 16px; flex-wrap: wrap;
          animation: fadeSlideUp 1s ease 0.7s both;
        }
        .kala-btn {
          display: inline-flex; align-items: center; gap: 10px;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          letter-spacing: 0.04em;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          text-decoration: none;
        }
        .kala-btn:hover { transform: translateY(-2px); }
        .kala-btn--primary {
          background: var(--coral);
          color: #fff;
          padding: 14px 32px;
          border-radius: 100px;
          box-shadow: 0 8px 28px rgba(205,44,88,0.30);
        }
        .kala-btn--primary:hover {
          background: #b82350;
          box-shadow: 0 12px 36px rgba(205,44,88,0.42);
        }
        .kala-btn--ghost {
          background: transparent;
          color: var(--coral);
          padding: 13px 28px;
          border-radius: 100px;
          border: 1.5px solid rgba(205,44,88,0.35);
        }
        .kala-btn--ghost:hover {
          background: rgba(205,44,88,0.06);
          border-color: var(--coral);
        }
        .kala-btn-arrow {
          font-size: 1rem;
          transition: transform 0.22s ease;
        }
        .kala-btn--primary:hover .kala-btn-arrow { transform: translateX(4px); }

        /* Craft tags strip */
        .kala-tags {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-top: 52px;
          animation: fadeSlideUp 1s ease 0.85s both;
        }
        .kala-tag {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(224,107,128,0.20);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.78rem;
          color: #8a3f52;
          font-weight: 400;
          letter-spacing: 0.03em;
          transition: background 0.2s, border-color 0.2s;
        }
        .kala-tag:hover {
          background: rgba(205,44,88,0.08);
          border-color: rgba(205,44,88,0.40);
        }

        /* Right visual panel */
        .kala-visual {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          animation: fadeSlideUp 1.1s ease 0.4s both;
        }
        .kala-frame {
          width: clamp(280px, 38vw, 520px);
          aspect-ratio: 4/5;
          border-radius: 38% 62% 55% 45% / 42% 38% 62% 58%;
          background: linear-gradient(145deg, var(--sand) 0%, var(--rose) 60%, var(--coral) 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(205,44,88,0.22), 0 8px 32px rgba(224,107,128,0.18);
          animation: morphBlob 10s ease-in-out infinite;
          transition: transform 0.1s ease-out;
        }
        @keyframes morphBlob {
          0%,100% { border-radius: 38% 62% 55% 45% / 42% 38% 62% 58%; }
          33%      { border-radius: 60% 40% 42% 58% / 55% 62% 38% 45%; }
          66%      { border-radius: 45% 55% 65% 35% / 38% 55% 45% 62%; }
        }
        .kala-frame-inner {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 32px;
          background: linear-gradient(160deg, rgba(255,230,212,0.22) 0%, rgba(205,44,88,0.10) 100%);
        }
        .kala-monogram {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5rem, 10vw, 9rem);
          font-weight: 300;
          color: rgba(255,255,255,0.90);
          line-height: 1;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 24px rgba(205,44,88,0.25);
          animation: fadeSlideUp 1.3s ease 0.6s both;
        }
        .kala-frame-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.70);
          margin-top: 8px;
          font-weight: 400;
        }

        /* Floating card */
        .kala-card {
          position: absolute;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(16px);
          border-radius: 18px;
          padding: 16px 20px;
          box-shadow: 0 8px 32px rgba(205,44,88,0.12);
          border: 1px solid rgba(255,255,255,0.80);
        }
        .kala-card--top {
          top: 6%; right: -8%;
          animation: floatCard 6s ease-in-out infinite;
        }
        .kala-card--bottom {
          bottom: 8%; left: -10%;
          animation: floatCard 7s ease-in-out infinite 1s;
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .kala-card-icon { font-size: 1.4rem; margin-bottom: 4px; }
        .kala-card-text {
          font-size: 0.75rem; font-weight: 500;
          color: #7a3a50; white-space: nowrap;
        }
        .kala-card-sub {
          font-size: 0.65rem; color: #b07080; margin-top: 2px;
        }

        /* Dot grid decoration */
        .kala-dots {
          position: absolute; bottom: 10%; left: -5%;
          width: 100px; height: 100px;
          background-image: radial-gradient(circle, rgba(205,44,88,0.20) 1.5px, transparent 1.5px);
          background-size: 14px 14px;
          opacity: 0.7;
        }

        /* Layout */
        .kala-container {
          width: 100%; max-width: 1280px;
          margin: 0 auto;
          padding: 40px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative; z-index: 1;
        }

        /* Scroll hint */
        .kala-scroll {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(122,74,85,0.55);
          animation: fadeSlideUp 1s ease 1.2s both;
        }
        .kala-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, var(--rose), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%,100% { transform: scaleY(1); opacity: 0.5; }
          50%      { transform: scaleY(0.5); opacity: 1; }
        }

        /* Keyframes */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 860px) {
          .kala-container {
            grid-template-columns: 1fr;
            padding: 60px 24px 80px;
            gap: 48px;
            text-align: center;
          }
          .kala-rule { margin: 0 auto 28px; }
          .kala-body { margin-left: auto; margin-right: auto; }
          .kala-ctas { justify-content: center; }
          .kala-tags { justify-content: center; }
          .kala-visual { justify-content: center; }
          .kala-frame { width: clamp(220px, 70vw, 360px); }
          .kala-card--top { right: 0%; }
          .kala-card--bottom { left: 0%; }
          .kala-craft-word { min-width: 160px; }
        }
        @media (max-width: 480px) {
          .kala-heading { font-size: 2.4rem; }
          .kala-card { display: none; }
          .kala-dots { display: none; }
        }
      `}</style>

      <section className="kala-hero" ref={heroRef}>
        {/* Background circles */}
        <div className="kala-bg-circle kala-bg-circle--1" />
        <div className="kala-bg-circle kala-bg-circle--2" />
        <div className="kala-bg-circle kala-bg-circle--3" />

        {/* Floating petals */}
        {petals.map((p, i) => (
          <FloatingPetal
            key={i}
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
              opacity: p.opacity,
            }}
          />
        ))}

        <div className="kala-container">
          {/* LEFT: Text */}
          <div>
            <div className="kala-chip">
              <span className="kala-chip-dot" />
              Art &amp; Craft Studio
            </div>

            <div className="kala-rule" />

            <h1 className="kala-heading">
              Where creativity<br />
              meets{" "}
              <span className="kala-craft-word">
                {CRAFTS.map((craft, i) => (
                  <span
                    key={craft}
                    className={
                      i === activeWord
                        ? ""
                        : i === (activeWord - 1 + CRAFTS.length) % CRAFTS.length
                        ? "exit"
                        : "enter"
                    }
                    style={{ display: i === activeWord || i === (activeWord - 1 + CRAFTS.length) % CRAFTS.length ? "block" : "none" }}
                  >
                    {craft}
                  </span>
                ))}
              </span>
            </h1>

            <p className="kala-body">
              Kalasrijan is your creative home — a place to learn drawing, sewing,
              cooking, clay work, Lippan art, paper craft, and the joy of making
              beautiful things every day.
            </p>

            <p className="kala-signature">— Guided by Suman Jain</p>

            <div className="kala-ctas">
              <a href="#" className="kala-btn kala-btn--primary">
                Start Creating
                <span className="kala-btn-arrow">→</span>
              </a>
              <a href="#" className="kala-btn kala-btn--ghost">
                Explore Classes
              </a>
            </div>

            <div className="kala-tags">
              {CRAFTS.map((c) => (
                <span key={c} className="kala-tag">{c}</span>
              ))}
              <span className="kala-tag">Home Management</span>
              <span className="kala-tag">Package Décor</span>
            </div>
          </div>

          {/* RIGHT: Visual */}
          <div className="kala-visual">
            <div
              className="kala-frame"
              style={{
                transform: `perspective(800px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
              }}
            >
              <div className="kala-frame-inner">
                <div className="kala-monogram">कला</div>
                <div className="kala-frame-label">Kalasrijan</div>
              </div>
            </div>

            {/* Floating info cards */}
            <div className="kala-card kala-card--top">
              <div className="kala-card-icon">🎨</div>
              <div className="kala-card-text">Creative Learning</div>
              <div className="kala-card-sub">15+ Art Forms</div>
            </div>

            <div className="kala-card kala-card--bottom">
              <div className="kala-card-icon">✂️</div>
              <div className="kala-card-text">Hands-on Crafts</div>
              <div className="kala-card-sub">With Suman Jain</div>
            </div>

            <div className="kala-dots" />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="kala-scroll">
          <div className="kala-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}