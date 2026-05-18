"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Scene from "./Scene";

export default function HeroSection() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".scene-wrapper", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .from(buttonRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "+=0.3");

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center bg-[url('/marble-bg.jpg')] bg-cover bg-center overflow-hidden"
    >
      {/* 3D Scene — the real hero */}
      <div className="absolute inset-0 scene-wrapper">
        <Scene />
      </div>

      {/* Bottom strip — minimal, stays out of the way */}
      <div className="absolute bottom-8 md:bottom-10 z-10 w-full flex flex-col items-center gap-4 pointer-events-none px-4">

        {/* Interaction hint — replaces the long headline */}
        <p className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium drop-shadow-md">
          Drag · Zoom · Explore
        </p>

        {/* CTAs */}
        <div
          ref={buttonRef}
          className="pointer-events-auto flex items-center gap-3"
        >
          <Link
            href="/#projects"
            scroll
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 md:px-6 md:py-3
              bg-amber-300 text-black font-semibold rounded-full
              hover:bg-amber-200 active:scale-95 transition-all duration-200
              shadow-[0_4px_24px_rgba(255,200,100,0.45)]
              text-sm md:text-base
            "
          >
            See the Work
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <Link
            href="/shop"
            scroll
            className="
              inline-flex items-center
              px-5 py-2.5 md:px-6 md:py-3
              bg-white/10 text-white font-semibold rounded-full border border-white/25
              hover:bg-white/20 active:scale-95 transition-all duration-200
              backdrop-blur-sm
              text-sm md:text-base
            "
          >
            Shop Assets
          </Link>
        </div>

      </div>
    </section>
  );
}
