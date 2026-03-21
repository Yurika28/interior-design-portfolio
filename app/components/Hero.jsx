"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Scene from "./Scene";
import TitleComponent from "@/app/UI/title";

export default function HeroSection() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Scene Animation (Targeting the canvas or wrapper inside Scene)
    tl.from(".scene-wrapper", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    // 2. Title Animation 
    // We don't need code here because TitleComponent has its own ScrollTrigger/Animation.
    // HOWEVER: To make it sequential, we can trigger the Title manually or 
    // ensure the TitleComponent animation starts after a delay.
    
    // 3. Button Animation (The last step)
    .from(buttonRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "+=0.5"); // Start 0.5s after the previous animation finishes

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center bg-[url('/marble-bg.jpg')] bg-cover bg-center overflow-hidden"
    >
      {/* Wrap Scene to animate it easily */}
      <div className="absolute inset-0 scene-wrapper">
        <Scene />
      </div>

      <div className="absolute bottom-15 md:bottom-7 z-10 text-center pointer-events-none w-full px-4">
        <TitleComponent
          title="Craft immersive 3D visuals and interactive digital experiences that transform ideas into stunning realities."
          className="text-base sm:text-lg md:text-3xl text-gray-200 max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mb-6"
          splitType="lines"
        />
        
        {/* We add pointer-events-auto here so the button actually works */}
        <div ref={buttonRef} className="pointer-events-auto inline-block">
          <Link
            href="/#projects"
            scroll
            className="
              inline-flex items-center justify-center
              mt-0.5 p-2 md:mt-2 md:p-3
              bg-amber-300 text-black font-semibold rounded-full
              hover:bg-amber-200 transition
              shadow-[0_4px_20px_rgba(255,200,100,0.4)]
              text-xs sm:text-sm md:text-base
            "
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
}