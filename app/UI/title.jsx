'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function TitleComponent({ 
  title, 
  className, 
  splitType = "chars" // Default to 'chars' if nothing is passed
}) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Use the prop to define the split
    const split = new SplitText(containerRef.current, { 
      type: splitType,
      linesClass: "overflow-hidden" 
    });

    // 2. Target the specific split result (chars, words, or lines)
    // We use split[splitType] to dynamically pick the array GSAP created
    const target = split[splitType];

    gsap.from(target, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "restart none none none",
      },
      yPercent: 100,
      autoAlpha: 0,
      duration: 2,
      stagger: splitType === "lines" ? 0.2 : 0.03, // Slower stagger for lines
      ease: "power4.out",
    });
  }, { scope: containerRef, dependencies: [splitType] }); // Re-run if type changes

  return (
    <h1 ref={containerRef} className={className}>
      {title}
    </h1>
  );
}