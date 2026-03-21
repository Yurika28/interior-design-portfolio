"use client";

import { Lightbulb, NotebookPen, Box, Star } from "lucide-react";
import Image from "next/image";
import { Open_Sans } from "next/font/google";
import TitleComponent from "@/app/UI/title";
import ScrollTriggerCard from "@/app/UI/ScrollTriggerCard";
const openSans = Open_Sans({ subsets: ["latin"], weight: ["300"] });


const steps = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Discovery & Brief",
    desc: "We dive into your vision, goals, and project requirements to understand what truly matters.",
  },
  {
    id: 2,
    icon: NotebookPen,
    title: "Concept & Planning",
    desc: "Creating initial layouts, mood boards, and concepts to visualize the direction of your project.",
  },
  {
    id: 3,
    icon: Box,
    title: "3D Modeling & Visualization",
    desc: "Transforming concepts into detailed 3D models and photorealistic renders for review and refinement.",
  },
  {
    id: 4,
    icon: Star,
    title: "Delivery & Review",
    desc: "Providing final high-quality visuals ready for presentations, marketing, or client approvals.",
  },
];

export default function HowItWorks() {
  return (
    <section className={`${openSans.className} relative w-full py-32 text-white overflow-hidden`}>

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/elegant-modern-living-room-with-gray-sofa.jpg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Fade */}
      <div className="absolute top-0 inset-x-0 h-48 bg-linear-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-center gap-1 md:gap-2">

          <TitleComponent
            title="HOW IT"
            className="text-center text-5xl md:text-7xl tracking-normal md:tracking-widest font-light mb-24 text-white"
            
          />

          <TitleComponent
            title="WORKS"
            className="text-center text-5xl md:text-7xl tracking-normal md:tracking-widest font-light mb-24 text-yellow-500"
          />

        </div>

       
        
        <ScrollTriggerCard 
          x={100} 
          duration={1.5} 
          stagger={0.2} 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 relative"
        >
        
          {steps.map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}
              className="
                relative
                rounded-t-[60px] rounded-b-3xl 
                -z-10
                p-3 md:p-6 pt-4 md:pt-8
                bg-linear-to-b from-white/18 via-white/5 to-white/3 backdrop-blur-xl border border-white/20
                
                shadow-[0_8px_45px_rgba(0,0,0,0.45)]
                
              "
            >

              <div
                className="
                  absolute -top-12 left-1/2 -translate-x-1/2
                  z-30
                  w-15 h-15 sm:w-18 sm:h-18 md:w-24 md:h-24
                  rounded-full 
                  bg-white
                  flex items-center justify-center
                  shadow-xl
                "
              >
                <Icon className="text-amber-500 " size={38} strokeWidth={1.5} />
              </div>

              {/* === Title === */}
              <h3 className=" text-base sm:text-lg md:text-xl font-semibold text-white text-center mt-1 md:mt-6">
                {title.includes("&") ? (
                  <>
                    {title.split("&")[0]}{" "}
                    <span className="text-amber-300">&</span>{" "}
                    {title.split("&")[1]}
                  </>
                ) : (
                  title
                )}
              </h3>

              {/* === Description === */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 mt-3 text-center leading-relaxed">
                {desc}
              </p>

            </div>
          ))}

        </ScrollTriggerCard>


      </div>
    </section>
  );
}
