"use client";

import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import TitleComponent from "../UI/title";
import { useRouter } from "next/navigation";
import { projects, toProjectSlug } from "@/app/data/projects";

export default function ProjectsShowcase() {
  const containerRef = useRef(null);
  const router = useRouter();

  useGSAP(() => {
    const items = gsap.utils.toArray(".project-card");

    items.forEach((item) => {
      const title = item.querySelector("h3");
      const button = item.querySelector(".project-more-button");
      const img = item.querySelector("img");

      // Timeline for the hover effect
      const tl = gsap.timeline({ paused: true });

      if (button) {
        // Ensure the button has a known hidden starting state for smooth reverse().
        gsap.set(button, { opacity: 0, y: 20, pointerEvents: "none" });
      }

      tl.to(item, { flexGrow: 5, duration: 0.8, ease: "expo.out" }, 0)
        .to(img, { scale: 1.1, duration: 0.8, ease: "expo.out" }, 0)
        .to(title, { color: "#fbbf24", y: -5, duration: 0.4 }, 0.1); // amber-400

      if (button) {
        tl.to(button, { opacity: 1, y: 0, duration: 0.4, pointerEvents: "auto" }, 0.2);
      }

      item.addEventListener("mouseenter", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });
  }, { scope: containerRef });

  return (
    <section id="projects" className="w-full scroll-mt-10 md:scroll-mt-24 py-24 text-white">
      <TitleComponent
        title="OUR PROJECT"
        className="text-center  text-5xl md:text-6xl text-amber-300 tracking-widest font-light mb-16"
      /> 

      <div
        ref={containerRef} 
        className="flex flex-col md:flex-row w-full h-auto md:h-[550px]"
      >
      {projects.map((project) => (
          <div
            key={project.id}
            className="project-card relative overflow-hidden cursor-pointer w-full h-[250px] md:h-full md:flex-1 flex items-end justify-center"
          >
          
            <Image
              src={project.img}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className="object-cover"
              priority={project.id <= 2}
            /> 

         
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-1" />

           
            <div className="relative z-10 p-8 text-center w-full">
              <h3 className="text-md md:text-xl font-light uppercase tracking-[0.2em]">
                {project.title}
              </h3>
              
              <button
                type="button"
                className="project-more-button cursor-pointer bg-amber-300 p-2 mt-2 text-white text-sm rounded-full opacity-0"
                onClick={() => router.push(`/projects/${toProjectSlug(project.title)}`)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
        
      </div>

      
      
    </section>
  );
}
