/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Globe, MapPin, Sparkles, Building2 } from 'lucide-react';
import { EricLogo } from './EricLogo';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'competitions' | 'dashboard' | 'register' | 'elementor') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 px-6 mt-12 border-t border-white/5 relative overflow-hidden" id="footer-section">
      {/* Background glow accent */}
      <div className="absolute bottom-[-100px] left-[10%] w-[300px] h-[300px] rounded-full bg-royal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Brand identity */}
        <div className="md:col-span-5 space-y-4">
          <EricLogo className="h-10 w-10" showText={true} />
          
          <p className="text-xs text-zinc-500 font-sans leading-relaxed max-w-sm">
            Empowering the next generation of academic and industrial engineers. Designed with strict physical parameters and modern tech-driven evaluation parameters.
          </p>

          <div className="pt-2 text-[10px] font-mono text-zinc-650 font-bold uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Platform Version 2.2.0-STABLE
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="md:col-span-3 space-y-4 text-xs font-sans font-semibold">
          <h5 className="font-mono text-[10px] tracking-widest text-[#C5A059] uppercase font-black">Competitions Network</h5>
          <div className="flex flex-col gap-2.5">
            <button onClick={() => setActiveTab('competitions')} className="text-left hover:text-white transition">Autonomous Maze Solver</button>
            <button onClick={() => setActiveTab('competitions')} className="text-left hover:text-white transition">Intelligent Drone Race</button>
            <button onClick={() => setActiveTab('competitions')} className="text-left hover:text-white transition">Combat Robo-Warriors</button>
            <button onClick={() => setActiveTab('competitions')} className="text-left hover:text-white transition">Humanoid Soccer Cup</button>
          </div>
        </div>

        {/* Resources & Support */}
        <div className="md:col-span-3 space-y-4 text-xs font-sans font-semibold">
          <h5 className="font-mono text-[10px] tracking-widest text-[#C5A059] uppercase font-black">Information & Links</h5>
          <div className="flex flex-col gap-2.5">
            <a href="https://ft.unj.ac.id/elektronika/eric" target="_blank" rel="noreferrer" className="text-left hover:text-white transition">ft.unj.ac.id/elektronika/eric</a>
            <span className="text-zinc-500">Instagram: @ericunj.official</span>
            <span className="text-zinc-550 italic font-mono text-[10px]">Campus Arena A, Jakarta</span>
          </div>
        </div>

        {/* Location & Contacts */}
        <div className="md:col-span-4 space-y-4 text-xs font-mono font-bold leading-normal text-zinc-500">
          <h5 className="font-mono text-[10px] tracking-widest text-[#C5A059] uppercase font-black font-semibold">Contact & Organizer</h5>
          <div className="space-y-3">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
              <span>
                BEM Prodi Pendidikan Teknik Elektronika<br />
                Fakultas Teknik – Universitas Negeri Jakarta<br />
                Kampus A UNJ, Jl. Rawamangun Muka,<br />
                Jakarta Timur 13220, Indonesia
              </span>
            </p>
            <p className="space-y-1 text-[11px] font-sans">
              <span className="block text-zinc-500 font-mono text-[9px] uppercase">Official Channels:</span>
              <a href="mailto:ericunjofficial2026@gmail.com" className="block text-zinc-400 hover:text-white transition text-xs select-all">ericunjofficial2026@gmail.com</a>
              <a href="mailto:ariful.mujahid@mhs.unj.ac.id" className="block text-zinc-400 hover:text-white transition text-xs select-all">ariful.mujahid@mhs.unj.ac.id</a>
            </p>
          </div>
        </div>

      </div>

      {/* Licensing details footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-600 font-bold">
        <span>© 2026 ELECTRONICS ROBOTICS INNOVATION COMPETITIONS. ALL RIGHTS REGISTERED SECURITY ASSURED.</span>
        <div className="flex gap-4">
          <span className="hover:text-zinc-500 transition cursor-pointer">PRIVACY RULES</span>
          <span className="hover:text-zinc-500 transition cursor-pointer">CAD PROTOCOLS</span>
        </div>
      </div>
    </footer>
  );
};
