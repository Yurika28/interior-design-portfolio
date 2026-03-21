"use client";
import Image from "next/image";
import { Box, Eye, Video, Building2, Scan } from "lucide-react";
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({ subsets: ["latin"], weight: ["300"] });

const services = [
  {
    id: 1,
    title: "Interior Visualization",
    description:
      "Showcase lighting, textures, and atmosphere of spaces before construction begins.",
    icon: Video,
    bg: "bg-white",
    text: "text-gray-900",
  },
  {
    id: 2,
    title: "3D Modeling & Post-Production",
    description: "From accurate models to polished final renders.",
    icon: Box,
    bg: "bg-[#d4b179]",
    text: "text-white",
  },
  {
    id: 3,
    title: "3D Animation & Walkthroughs",
    description: "Step inside the project with cinematic presentations.",
    icon: Eye,
    bg: "bg-[#d4b179]",
    text: "text-white",
  },
  {
    id: 4,
    title: "Exterior Visualization",
    description:
      "Bring facades, landscapes, and master plans to life with photorealistic renders.",
    icon: Building2,
    bg: "bg-white",
    text: "text-gray-900",
  },
  {
    id: 5,
    title: "VR / AR Experiences",
    description:
      "Immersive tools for interactive project exploration.",
    icon: Scan,
    bg: "bg-white",
    text: "text-gray-900",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative w-full bg-[url('/marble-bg.jpg')] bg-cover bg-center text-white py-24">
        <div className="w-full px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-0.5 sm:gap-3 md:gap-6 ">
        <div className="flex flex-col justify-center">
          <h2 className={`${openSans.className} text-6xl sm:text-7xl md:text-8xl leading-none font-thin tracking-wide text-left`}>
            <span className="block text-[#d4b179]">SERVI</span>
            <span className="block font-thin">CES</span>
          </h2>
        </div>

        <ServiceCard {...services[0]} />

        <ServiceCard {...services[1]} />

        <div className="flex items-center justify-center text-right">
          <p className={`${openSans.className}  text-medium sm:text-lg md:text-2xl text-neutral-400 leading-relaxed font-light`}>
            <span className="text-white block ">
              EXPLORE OUR
            </span>
            SELECTED{" "}
            <Image
              src="/modern-living-room-interior-design.jpg"
              alt="project sample"
              width={60}
              height={25}
              className="inline-block rounded-md mx-1 align-middle"
            />
            <span className="text-white">PROJECTS</span>
            <br />
            TO SEE HOW WE
            <br />
            <span className="text-white">TRANSFORM</span>{" "}
            <Image
              src="/view-futuristic-lighting-lamp-design.jpg"
              alt="idea sample"
              width={60}
              height={25}
              className="inline-block rounded-md mx-1 align-middle"
            />
            IDEAS
            <br />
            INTO VIVID 3D REALITIES.
          </p>
        </div>

            
        </div>

        <div className="w-full px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard {...services[2]} />
            <ServiceCard {...services[3]} />
            <div className="flex items-center justify-center text-center">
                <p className=" flex flex-col text-white text-2xl italic font-cormorant leading-snug">
                  <span className="flex justify-start text-6xl font-extrabold text-[#d4b179] mb-1 md:mb-2 -ml-1 md:-ml-4">“</span>
                    Designs That Speak 
                    <br /> 
                    Before They’re Built
                    <br />
                  <span className=" flex justify-end text-6xl font-extrabold text-[#d4b179] mt-2 md:mt-4 -mr-1 md:-mr-4">”</span>
                </p>
            </div>
            <ServiceCard {...services[4]} />
        </div>
    </section>
  );
}

/* === REUSABLE CARD COMPONENT === */
function ServiceCard({ title, description, icon: Icon, bg, text }) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl p-4 md:p-6 shadow-xl flex flex-col justify-between h-[280px] ${bg} ${text} transition-transform duration-300 hover:-translate-y-2`}
      >
        <div className="absolute inset-0 opacity-[0.08]" />
        <div className="flex justify-end">
          
          <div
            className={`w-9 h-9 flex items-center justify-center border cursor-pointer rounded-full ${
              text === "text-white" ? "border-white" : "border-gray-900"

            }`}
          >
            <span className="text-2xl">↗</span>
          </div>
        </div>
        <div className="relative mt-3 sm:mt-5 md:mt-8">
          <Icon className="w-10 h-10 mt-1 md:mb-2" />
          <h3 className="text-base md:text-lg font-semibold mb-0 md:mb-2">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{description}</p>
        </div>
      </div>
    );
}
