import React from "react";

export default function Footer() {
  return (



<footer className="bg-white border-t border-purple-900 py-12">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      
      {/* Left: Brand + Contact */}
      <div className="text-left">
        <p className="text-purple-900 font-bold uppercase tracking-wider mb-4">
          Metabolomics Africa
        </p>
        <p className="text-gray-700">
          Call or email us anytime: 
          <a href="tel:+2348152884752" className="block font-medium text-purple-700 hover:underline">
            +234 815 288 4752
          </a>
          <a href="mailto:metabolomicsafrica@gmail.com" className="font-medium text-purple-700 hover:underline">
            metabolomicsafrica@gmail.com
          </a>
        </p>
      </div>

      {/* Center: Navigation */}
      <div className="text-left md:text-center">
        <p className="text-purple-900 font-bold uppercase tracking-wider mb-4">
          Navigate
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><a href="/" className="hover:text-purple-700 transition">Home</a></li>
          <li><a href="about" className="hover:text-purple-700 transition">About</a></li>
          <li><a href="ourGoals" className="hover:text-purple-700 transition">Projects</a></li>
          <li><a href="membership" className="hover:text-purple-700 transition">Membership</a></li>
        </ul>
      </div>

      {/* Right: Social */}
      <div className="text-left md:text-right">
        <p className="text-purple-900 font-bold uppercase tracking-wider mb-4">
          Social
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><a href="https://www.instagram.com/metabolomicsafrica" className="hover:text-purple-700 transition">Instagram</a></li>
          <li><a href="https://x.com/metabolomicsaf" className="hover:text-purple-700 transition">X</a></li>
          <li><a href="https://www.facebook.com/profile.php?id=61577259280591" className="hover:text-purple-700 transition">Facebook</a></li>
          <li><a href="https://www.tiktok.com/@metabolomics.afri?_t=ZS-8ylL4X0EQB5&_r=1" className="hover:text-purple-700 transition">TikTok</a></li>
          <li><a href="https://www.linkedin.com/company/metabolomics-africa/" className="hover:text-purple-700 transition">LinkedIn</a></li>
        </ul>
      </div>
    </div>

    {/* Bottom Copyright */}
    <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
      © 2025 Metabolomics Africa Collective. All rights reserved.
    </div>
  </div>
</footer>
    );
}  