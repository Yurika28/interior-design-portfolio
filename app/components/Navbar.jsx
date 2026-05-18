"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuth } from "@/lib/hooks/useAuth";

gsap.registerPlugin(ScrollToPlugin);

function scrollToSection(selector) {
  gsap.to(window, {
    duration: 2,
    scrollTo: selector,
    ease: "power2.inOut",
  });
}

const glassStyle = `backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { totalItems } = useCartStore();
  const { user, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCartClick = () => {
    if (!user) {
      router.push("/auth/login?callbackUrl=/cart");
    } else {
      router.push("/cart");
    }
    setOpen(false);
  };

  const handleSignOut = () => {
    logout();
    setDropdownOpen(false);
    setOpen(false);
    router.push("/");
  };

  const handleNavClick = (selector) => {
    scrollToSection(selector);
    setOpen(false);
  };

  const landingHref = user?.role === "admin" ? "/admin" : "/";

  return (
    <nav className="fixed top-1 left-0 w-full z-50 px-2">
      <div className="flex justify-between items-center text-gray-300">
        {/* LEFT — Brand */}
        <h2 className={`text-base sm:text-md md:text-xl font-semibold md:font-bold p-3 rounded-full ${glassStyle}`}>
          Interior Haus
        </h2>

        {/* CENTER — Navigation Links */}
        <div className={`hidden md:flex gap-6 p-3 rounded-full ${glassStyle}`}>
          <Link href="/projects" className="hover:text-white transition-colors cursor-pointer">
            Projects
          </Link>
          <Link href="/shop" className="hover:text-white transition-colors cursor-pointer">
            Shop
          </Link>
          <button
            type="button"
            onClick={() => scrollToSection("#about")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* RIGHT — User Actions */}
        <div
          ref={dropdownRef}
          className={`relative hidden md:flex items-center gap-3 p-3 rounded-full ${glassStyle}`}
        >
          {user ? (
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <User size={16} />
              <span className="text-sm">{user.name}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <User size={16} />
              <span className="text-sm">Login</span>
            </Link>
          )}

          <span className="w-px h-4 bg-white/20" />

          <button
            type="button"
            onClick={handleCartClick}
            className="relative flex items-center hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </button>

          {dropdownOpen && (
            <div className={`absolute right-0 top-full mt-2 min-w-[140px] rounded-xl p-2 flex flex-col gap-1 ${glassStyle}`}>
              <Link
                href={landingHref}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-sm"
              >
                {user?.role === "admin" ? <LayoutDashboard size={14} /> : <Store size={14} />}
                {user?.role === "admin" ? "Admin Panel" : "Shop"}
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-sm text-left"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* MOBILE — Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-3 rounded-full ${glassStyle}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className={`mt-3 md:hidden flex flex-col gap-4 p-4 rounded-2xl text-gray-300 ${glassStyle}`}>
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm font-medium text-white">{user.name}</span>
                {user.role === "admin" && (
                  <span className="text-xs bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </div>
              <Link
                href={landingHref}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 hover:text-white transition-colors pl-6"
              >
                {user.role === "admin" ? <LayoutDashboard size={16} /> : <Store size={16} />}
                {user.role === "admin" ? "Admin Panel" : "Shop"}
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 hover:text-white transition-colors pl-6 text-left"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <User size={16} />
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={handleCartClick}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <ShoppingCart size={16} />
            Cart
            {totalItems() > 0 && (
              <span className="bg-amber-400 text-black text-xs font-bold rounded-full px-1.5">
                {totalItems()}
              </span>
            )}
          </button>

          <span className="w-full h-px bg-white/20" />

          <button
            type="button"
            onClick={() => handleNavClick("#projects")}
            className="text-left hover:text-white transition-colors"
          >
            Project
          </button>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="text-left hover:text-white transition-colors"
          >
            Shop
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick("#about")}
            className="text-left hover:text-white transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="text-left hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
