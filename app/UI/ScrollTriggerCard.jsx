"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerCard({ 
  children, 
  x = 100, 
  y = 0, 
  opacity = 0, 
  duration = 2, 
  stagger = 0,
  className = "" 
}) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // We target the immediate children of this wrapper
    const elements = containerRef.current.children;

    if (elements.length > 0) {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "restart none none none",
          // markers: true, // Uncomment this to debug the trigger points
        },
        x: x,
        y: y,
        opacity: opacity,
        duration: duration,
        stagger: stagger,
        ease: "power3.out",
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}