"use client";

import Image from "next/image";

export default function ProjectInquiry() {
  return (
    <section id="contact" className="relative w-full scroll-mt-10 md:scroll-mt-24 text-white pb-10">
      {/* === Background Image === */}
      <div className="relative w-full h-[520px] overflow-hidden rounded-b-[50px]">
        <Image
          src="/elegant-modern-living-room-with-gray-sofa.jpg" 
          alt="Reception background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Heading */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
            Have a <span className="text-amber-300">Project</span> <br />
            in Mind?
          </h2>
        </div>
      </div>

      {/* === Contact Form Floating Box === */}
      <div className="max-w-6xl mx-auto -mt-20 relative z-20">
        <div className="bg-white/95 text-black rounded-3xl py-10 px-8 shadow-2xl border border-white/20 backdrop-blur-md">
          <p className="text-center text-lg mb-8 text-neutral-700">
            Tell us about your project, and we’ll prepare a customized proposal
            with timelines and pricing.
          </p>

          {/* Form Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="h-12 rounded-full px-5 bg-white/80 border border-neutral-200 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="h-12 rounded-full px-5 bg-white/80 border border-neutral-200 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Phone"
              className="h-12 rounded-full px-5 bg-white/80 border border-neutral-200 focus:outline-none"
            />

            <button
              className="
                h-12 rounded-full 
                bg-linear-to-r from-amber-200 to-amber-500 
                text-white font-semibold tracking-wider
                hover:opacity-90 transition
              "
            >
              SEND REQUEST
            </button>
          </div>
        </div>
      </div>

      {/* === Footer Nav === */}
      <div className="w-full mt-24 text-center text-neutral-400 text-sm tracking-wide">

        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-neutral-400">
          <span>INTERIOR VISUALIZATION</span>
          <span>EXTERIOR VISUALIZATION</span>
          <span>3D MODELING & POST-PRODUCTION</span>
          <span>VR / AR EXPERIENCES</span>
          <span>3D ANIMATION & WALKTHROUGHS</span>
        </div>
      </div>
    </section>
  );
}
