/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cpu, Star, Shield, HelpCircle, ArrowRight, Zap, Target, Users, Landmark, Trophy, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
// @ts-ignore
import robotHero from '../assets/images/robot_hero_illustration_1780021203585.png';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onExploreTracks: () => void;
  setActiveTab: (tab: 'home' | 'competitions' | 'dashboard' | 'register') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister, onExploreTracks, setActiveTab }) => {
  const { user } = useAuth();
  const [pulse, setPulse] = useState(false);

  // Simple telemetry ticker animation on the floating hero card
  const [telemetry, setTelemetry] = useState({
    yaw: 14.2,
    pitch: -2.3,
    signalStrength: 98,
    lidarStatus: 'Active',
    actuatorFreq: 440
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        yaw: Number((prev.yaw + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        pitch: Number((prev.pitch + (Math.random() * 0.2 - 0.1)).toFixed(2)),
        signalStrength: Math.min(100, Math.max(90, prev.signalStrength + Math.floor(Math.random() * 3 - 1.5))),
        lidarStatus: Math.random() > 0.95 ? 'Calibrating' : 'Active',
        actuatorFreq: 440 + Math.floor(Math.random() * 10 - 5)
      }));
      setPulse(p => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-[#F2F1EC] via-[#F8F7F3] to-[#F8F7F3] text-zinc-900" id="hero-section">
      {/* Background ambient accents - premium soft gradients */}
      <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] rounded-full bg-royal/5 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[250px] h-[250px] rounded-full bg-cobalt/5 blur-[60px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Copy and Stats */}
        <div className="lg:col-span-7 space-y-8">
          {/* Mini-lead label */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/[0.04] shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-royal"></span>
            </span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-650 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold animate-pulse" />
              ROBOTICS COMPETITIONS
            </span>
          </div>

          {/* Main Title Banner */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] leading-[0.95] font-sans font-black tracking-tight text-zinc-900" id="hero-title">
            Electronics & Robotics <br/>
            Innovation Competition <br />
            <span className="bg-gradient-to-r from-royal via-gold to-cobalt bg-clip-text text-transparent">ERIC 2026</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-zinc-500 max-w-xl font-sans font-medium leading-relaxed" id="hero-subtext">
            International Robotics & Electronics Competition organized by BEM Pendidikan Teknik Elektronika, Fakultas Teknik Universitas Negeri Jakarta. Empowering the next generation of innovators in Robotics, AI, IoT, and Industrial Technology through world-class competitions and collaborative innovation.
          </p>

          {/* FSI All Japan Pathway Spotlight Callout Card */}
          <div className="bg-gradient-to-r from-red-500/[0.04] to-red-500/[0.01] border border-red-500/10 rounded-2xl p-4.5 flex items-start gap-4 max-w-xl shadow-[0_4px_24px_rgba(239,68,68,0.01)] relative overflow-hidden group">
            <span className="text-3xl filter drop-shadow-sm select-none animate-[pulse_2s_infinite] shrink-0 mt-0.5">🇯🇵</span>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[8.5px] font-mono uppercase font-black text-red-600 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                FSI Japan Accredited
              </div>
              <h3 className="text-sm font-sans font-black text-zinc-900 group-hover:text-red-650 transition duration-300">
                FSI All Japan Pathway Endorsement Opportunity
              </h3>
              <p className="text-[11px] text-zinc-500 font-sans font-medium leading-normal">
                Outstanding performers obtain international-grade certificate endorsement and direct pathway qualification to the prestigious <strong>All Japan Robot-Sumo Tournament</strong> in Tokyo.
              </p>
            </div>
            {/* Subtle glow circle */}
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-red-500/[0.06] rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
          </div>

          {/* Date & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            <div className="flex items-center gap-2.5 bg-white/70 p-3 rounded-2xl border border-black/[0.03]">
              <span className="text-lg">📅</span>
              <div>
                <span className="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Event Timeline</span>
                <span className="block text-xs font-sans font-extrabold text-zinc-805">22–24 September 2026</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/70 p-3 rounded-2xl border border-black/[0.03]">
              <span className="text-lg">📍</span>
              <div>
                <span className="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Main Arena Venue</span>
                <span className="block text-xs font-sans font-extrabold text-zinc-805">Kampus A Universitas Negeri Jakarta</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onOpenRegister}
              className="group bg-gradient-to-r from-royal to-cobalt hover:from-royal/95 hover:to-cobalt/95 transition duration-300 text-white font-sans font-extrabold text-sm px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(0,71,171,0.25)] hover:shadow-[0_15px_30px_rgba(0,0,71,171,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              id="hero-btn-register"
            >
              Register Team Now
              <ArrowRight className="w-4 h-4 transition duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="https://ft.unj.ac.id/elektronika/eric"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-zinc-50 transition duration-300 text-zinc-800 font-sans font-bold text-sm px-8 py-4 rounded-full border border-black/[0.06] hover:border-black/[0.12] flex items-center justify-center gap-2"
              id="hero-btn-explore"
            >
              📖 Download Guidebook
            </a>
          </div>

          {/* Core Metrics Bento Panel */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/70">
            <div className="bg-white/50 p-4 rounded-2xl border border-black/[0.02]">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <Trophy className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold">Elite Prize Pool</span>
              </div>
              <span className="block font-sans font-extrabold text-lg text-zinc-900">Trophies & Millions IDR</span>
            </div>
            
            <div className="bg-white/50 p-4 rounded-2xl border border-black/[0.02]">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold">Scope</span>
              </div>
              <span className="block font-sans font-extrabold text-lg text-zinc-900">National & International</span>
            </div>

            <div className="bg-white/50 p-4 rounded-2xl border border-black/[0.02]">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                <Landmark className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold">FSI Japan Partner</span>
              </div>
              <span className="block font-sans font-extrabold text-lg text-zinc-900">Cert. Opportunity</span>
            </div>
          </div>

          {/* Sponsor Logos */}
          <div className="pt-6">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-bold mb-3">
              Institutional Partners & Research Hubs
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center opacity-60 grayscale hover:opacity-80 transition duration-300">
              <span className="font-sans font-black text-xs text-zinc-800 tracking-wider">MIT LABS</span>
              <span className="font-sans font-black text-xs text-zinc-800 tracking-wider">CERN ENG</span>
              <span className="font-sans font-black text-xs text-zinc-800 tracking-wider">ETH MANIPULATORS</span>
              <span className="font-sans font-black text-xs text-zinc-800 tracking-wider">TOKYO TECH</span>
            </div>
          </div>
        </div>

        {/* Right Side: High-fidelity robot illustration displaying the 9 official tracks */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-[420px] lg:max-w-none">
            {/* Realistically styled mockup image card showcasing the generated robot */}
            <div className="w-full min-h-[520px] lg:min-h-[640px] aspect-[2/3] rounded-3xl bg-[#FAF9F5] shadow-2xl border border-black/[0.04] relative z-10 flex flex-col justify-center items-center overflow-hidden">
              {/* Subtle backdrop glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,71,171,0.06),rgba(255,255,255,0))]" />
              
              {/* Image with referrerPolicy */}
              <img 
                src={robotHero} 
                alt="ERIC 2026 Sumobot and Robotic Arm Innovation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-3xl hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Float Badge 1: User Registered Badge */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.08)] p-4 border border-zinc-200/80 max-w-[200px] z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="w-10 h-10 rounded-xl bg-royal/10 flex items-center justify-center text-royal shrink-0">
                <Zap className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="block text-[9px] font-mono font-bold tracking-wider text-royal uppercase">Now Open</span>
                <span className="block text-[13px] font-bold text-zinc-800">9 Official Tracks</span>
              </div>
            </div>

            {/* Float Badge 2: Approved Registrations Metric */}
            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.06)] p-4 border border-zinc-200/60 z-20 max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100/80 flex items-center justify-center text-green-600 shrink-0">
                  <Shield className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Enrollment Secure</span>
                  <span className="block text-[13px] font-sans font-bold text-zinc-800">Approved Payments</span>
                  <div className="text-[10px] font-mono text-emerald-600 font-semibold">Verification active</div>
                </div>
              </div>
            </div>

            {/* Aesthetic backdrop rings */}
            <div className="absolute -inset-10 border border-zinc-300/[0.08] rounded-full -z-10 pointer-events-none scale-105" />
            <div className="absolute -inset-20 border border-zinc-300/[0.04] rounded-full -z-10 pointer-events-none scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
};
