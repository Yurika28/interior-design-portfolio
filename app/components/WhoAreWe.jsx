"use client";

import Image from "next/image";
import { Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import TextCards from "@/app/UI/textCards";
import ScrollTriggerCard from "@/app/UI/ScrollTriggerCard";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

/* -----------------------------
   Small helper: media query
-------------------------------- */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function WhoWeAreSection() {
  const isMobile = useIsMobile();

  /* -----------------------------
     Image + label items
  -------------------------------- */
  const items = [
    {
      id: 1,
      mdLabel: ".",
      smLabel: ".",
      image: "/images/office-interior-design.jpg",
      labelPosition: "bottom",
      labelColor: "text-black",
    },
    {
      id: 2,
      mdLabel: "WHO",
      smLabel: "WHO",
      image: "/images/3d-modern-lamp-design.jpg",
      labelPosition: "top",
      labelColor: "text-white",
    },
    {
      id: 3,
      mdLabel: "WE",
      smLabel: "ARE",
      image: "/images/kitchen-interior-design.jpg",
      labelPosition: "bottom",
      labelColor: "text-amber-300",
    },
    {
      id: 4,
      mdLabel: "ARE",
      smLabel: "WE",
      image: "/images/living-room-interior-design.jpg",
      labelPosition: "top",
      labelColor: "text-white",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full scroll-mt-10 md:scroll-mt-15 bg-[url('/marble-bg.jpg')] bg-cover bg-center py-6 overflow-hidden"
    >
      {/* -----------------------------
          Image grid
      -------------------------------- */}
      <ScrollTriggerCard 
        x={100} 
        duration={1.5} 
        stagger={0.2} 
        className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-6"
      >  
        {items.map((item) => (
          <div
            key={item.id}
            className={`${openSans.className} w-full sm:w-[45%] lg:w-[22%] flex flex-col items-center gap-4`}
          >
            {/* Mobile label (always top) */}
            <h2
              className={`block md:hidden text-4xl tracking-widest text-center font-extrabold ${item.labelColor}`}
            >
              {item.smLabel}
            </h2>

            {/* Desktop top label */}
            {item.labelPosition === "top" && (
              <h2
                className={`hidden md:block text-5xl md:text-7xl tracking-widest font-extralight ${item.labelColor}`}
              >
                {item.mdLabel}
              </h2>
            )}

            {/* Image */}
            <div className="w-full aspect-3/4 md:h-[520px] relative overflow-hidden rounded-3xl shadow-lg">
              <Image
                src={item.image}
                alt={item.mdLabel}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Desktop bottom label */}
            {item.labelPosition === "bottom" && (
              <h2
                className={`hidden md:block text-5xl md:text-7xl tracking-widest font-light ${item.labelColor}`}
              >
                {item.mdLabel}
              </h2>
            )}
          </div>
        ))}
      </ScrollTriggerCard>

      {/* -----------------------------
          Floating text cards
      -------------------------------- */}
      <TextCards isMobile={isMobile} />
    </section>
  );
}
