// src/components/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Bell } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Desktop dropdown toggle
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-25 bg-white shadow-md text-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-6  flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-purple-900">
            <img src="/logo.png" alt="Methabolic Logo" className="h-30 w-auto" />
          </a>

          {/* Desktop Navigation - Grouped with Dropdowns */}
          <nav className="hidden lg:flex items-center font-bold">
            <div className="relative ">
              {/* Slant inward on left */}

              <ul className="flex items-center space-x-1 px-10 py-4 text-black font-bold">
                {/* Home */}
                <li>
                  <a href="/" className="px-4 font-bold py-2 text-base  hover:text-purple-900 transition">
                    Home
                  </a>
                </li>

                {/* About Dropdown */}
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown("about")}
                    className="flex items-center gap-1 px-4 py-2 text-base font-bold hover:text-purple-900 transition"
                  >
                    About
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === "about" ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === "about" && (
                    <ul className="absolute left-0 top-full mt-2 w-48 bg-white border-2 border-purple-900 rounded-2xl shadow-xl py-3">
                      <li><a href="about" className="block px-6 py-2 text-base hover:bg-purple-600">Overview</a></li>
                      <li><a href="ourGoals" className="block px-6 py-2 text-base hover:bg-purple-600">Our Goals & Pilot</a></li>
                    </ul>
                  )}
                </li>

                {/* Content Dropdown */}
                <li className="relative">
                  <button
                    onClick={() => toggleDropdown("content")}
                    className="flex items-center gap-1 px-4 py-2 text-base font-bold hover:text-purple-900 transition"
                  >
                    Content
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === "content" ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === "content" && (
                    <ul className="absolute left-0 top-full mt-2 w-48 bg-white border-2 border-purple-900 rounded-2xl shadow-xl py-3">
                      <li><a href="events" className="block px-6 py-2 text-base hover:bg-purple-600">Events</a></li>
                      <li><a href="gallery" className="block px-6 py-2 text-base hover:bg-purple-600">Gallery</a></li>
                    </ul>
                  )}
                </li>

                {/* Membership & Join */}
                <li>
                  <a href="membership" className="px-4 py-2 text-base font-bold hover:text-purple-900 transition">
                    Membership
                  </a>
                </li>
                
              </ul>
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu - Full list with close on tap outside or link click */}
        {mobileMenuOpen && (
          <nav ref={mobileMenuRef} className="lg:hidden bg-white border-t border-purple-200 shadow-lg">
            <ul className="px-6 py-8 space-y-5 text-center">
              <li><a href="/" className="block text-lg font-medium hover:text-purple-900" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="about" className="block text-lg font-medium hover:text-purple-900" onClick={() => setMobileMenuOpen(false)}>Overview</a></li>
              <li><a href="ourgoal" className="block text-lg font-medium hover:text-purple-900" onClick={() => setMobileMenuOpen(false)}>Our Goals</a></li>
              <li><a href="events" className="block text-lg font-medium hover:text-purple-900" onClick={() => setMobileMenuOpen(false)}>Events</a></li>
              <li><a href="gallery" className="block text-lg font-medium hover:text-purple-900" onClick={() => setMobileMenuOpen(false)}>Gallery</a></li>
              <li><a href="membership" className="block text-lg font-medium hover:text-purple-900" onClick={() => setMobileMenuOpen(false)}>Membership</a></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Event Reminder Alert - Dismissible */}
      {showAlert && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
          <div className="bg-purple-900 text-white rounded-2xl shadow-2xl p-5 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <Bell size={28} className="text-amber-300 " />
              <div>
                <p className="font-bold text-base">Upcoming Event Reminder</p>
                <p className="text-sm opacity-90">Register now for the 1st African Metabolomics Conference 2026!</p>
                <button
                  onClick={() => window.open("https://metabolomics-sa.co.za/metabolomics-africa-2026", "_blank")}
                  className="mt-2 px-4 py-2 bg-amber-300 text-purple-900 font-semibold rounded-full hover:bg-amber-400 transition"
                >
                  Register Here
                </button>

              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="ml-3 text-white hover:opacity-70 transition "
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .clip-slant {
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
        }
      `}</style>
    </>
  );
}