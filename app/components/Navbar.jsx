"use client";

import { useState } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

function scrollToSection(selector) {
  gsap.to(window, {
    duration: 2,
    scrollTo: selector,
    ease: "power2.inOut",
  });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (selector) => {
    scrollToSection(selector);
    setOpen(false);
  };

  return (
    <nav className="fixed top-1 left-0 w-full z-50 px-2 ">
      <div className="flex justify-between items-center text-gray-300">
        <h2
          className="
            text-base sm:text-md md:text-xl font-semibold md:font-bold 
            p-3 rounded-full 
            backdrop-blur-xl bg-white/10 
            border border-white/20 
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          Interior Haus
        </h2>

        <div
          className="
            hidden md:flex gap-6 p-3 rounded-full
            backdrop-blur-xl bg-white/10 
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          <button
            type="button"
            onClick={() => scrollToSection("#about")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("#projects")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden p-3 rounded-full
            backdrop-blur-xl bg-white/10 
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            mt-3 md:hidden flex flex-col gap-4 p-4 rounded-2xl
            backdrop-blur-xl bg-white/10
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          <button
            type="button"
            onClick={() => handleNavClick("#about")}
            className="text-left hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("#projects")}
            className="text-left hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="text-left hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
