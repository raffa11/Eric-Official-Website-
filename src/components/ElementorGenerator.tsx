/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Custom Elementor Copy-Paste HTML Widget Builder
 */

import React, { useState } from 'react';
import { Copy, Check, Sparkles, Code, Layout, Blocks, Info, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { OFFICIAL_COMPETITIONS } from '../utils/mockData';

export const ElementorGenerator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<'full' | 'hero' | 'bento' | 'tracks'>('full');
  const [accentColor, setAccentColor] = useState<string>('#FF8A1F'); // Default brand orange
  const [includeFonts, setIncludeFonts] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const presets = [
    { id: 'full', name: 'Full Landing Page', desc: 'Combines the Hero Banner, Bento features network, and all 8 Track Cards.' },
    { id: 'hero', name: 'Hero Banner Only', desc: 'The large display title, global stats, CTA links, and animated localizer UI card.' },
    { id: 'bento', name: 'Bento Grid Features Only', desc: 'Three modern high-contrast cards highlighting Edge AI, CAD Audit, and Prize Pools.' },
    { id: 'tracks', name: 'Tracks Catalog Only', desc: 'A beautiful grid layout showing all 8 robotics competition track codes and fees.' }
  ];

  const colorOptions = [
    { name: 'ERIC Orange', value: '#FF8A1F' },
    { name: 'Cyber Indigo', value: '#6366F1' },
    { name: 'Emerald Actuator', value: '#10B981' },
    { name: 'Venture Purple', value: '#A855F7' },
    { name: 'Carbon Black', value: '#18181B' }
  ];

  // Helper to generate the exact HTML code snippet
  const generateHTML = () => {
    const fontsSnippet = includeFonts 
      ? `<!-- 1. Google Fonts Direct Imports for Display and Data Typography -->\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">\n`
      : '';

    const tailwindSnippet = `<!-- 2. Tailwind CSS Play Engine for Modern CSS Framework Support -->\n<script src="https://cdn.tailwindcss.com"></script>\n<script>\n  tailwind.config = {\n    theme: {\n      extend: {\n        fontFamily: {\n          sans: ['"Plus Jakarta Sans"', 'sans-serif'],\n          mono: ['"JetBrains Mono"', 'monospace'],\n        },\n        colors: {\n          brand: '${accentColor}',\n          background: '#F8F7F3',\n        }\n      }\n    }\n  }\n</script>\n<style>\n  /* Safe global container resets for clean scoped rendering inside Elementor pages */\n  .eric-elementor-container {\n    font-family: "Plus Jakarta Sans", sans-serif;\n  }\n  .tracking-wide-extra {\n    letter-spacing: 0.15em;\n  }\n  .smooth-transition {\n    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  }\n</style>\n`;

    const rawHeroHTML = `<!-- HERO BANNER MODULE -->
<section class="relative overflow-hidden pt-20 pb-20 bg-gradient-to-b from-[#F2F1EC] via-[#F8F7F3] to-[#F8F7F3] text-zinc-950 eric-elementor-container">
  <!-- Subtle Gradient Lighting Accents -->
  <div style="background: ${accentColor}1C; position: absolute; top: 10%; right: 10%; width: 400px; height: 400px; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 1;"></div>
  
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
    <!-- Left Copywriter Information -->
    <div class="lg:col-span-7 space-y-8">
      <!-- Miniature framework pill -->
      <div class="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-black/[0.04] shadow-sm">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2" style="background-color: ${accentColor};"></span>
        </span>
        <span class="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-zinc-650 font-bold">
          BEM Pendidikan Teknik Elektronika FT UNJ
        </span>
      </div>

      <!-- Main Display Headline -->
      <h1 class="text-4xl sm:text-6xl font-sans font-extrabold tracking-tight text-zinc-955 leading-[0.95]">
        Electronics & Robotics <br/>
        Innovation Competition <br />
        <span style="color: ${accentColor};">ERIC 2026</span>
      </h1>

      <p class="text-zinc-500 font-sans font-medium text-sm sm:text-base leading-relaxed max-w-xl">
        International Robotics & Electronics Competition organized by BEM Pendidikan Teknik Elektronika, Fakultas Teknik Universitas Negeri Jakarta. Jointly empowering young creators in Robotics, AI, IoT, and Automation.
      </p>

      <!-- Event metadata box -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        <div class="bg-white/80 p-3.5 rounded-2xl border border-black/[0.03] flex items-center gap-2">
          <span>📅</span>
          <div>
            <span class="block text-[8px] font-mono text-zinc-400 uppercase tracking-wider font-extrabold leading-tight">Event Timeline</span>
            <span class="block text-xs font-sans font-black text-zinc-900">22–24 September 2026</span>
          </div>
        </div>
        <div class="bg-white/80 p-3.5 rounded-2xl border border-black/[0.03] flex items-center gap-2">
          <span>📍</span>
          <div>
            <span class="block text-[8px] font-mono text-zinc-400 uppercase tracking-wider font-extrabold leading-tight">Arena Location</span>
            <span class="block text-xs font-sans font-black text-zinc-900">Kampus A Universitas Negeri Jakarta</span>
          </div>
        </div>
      </div>

      <!-- Click CTAs -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <a href="#tracks-section" class="inline-flex justify-center items-center text-center px-8 py-4 rounded-full text-white font-sans font-extrabold text-xs tracking-wider uppercase smooth-transition hover:scale-[1.02] shadow-lg shadow-orange-500/10" style="background-color: ${accentColor};">
          Register Team
        </a>
        <a href="https://ft.unj.ac.id/elektronika/eric" target="_blank" rel="noreferrer" class="inline-flex justify-center items-center text-center bg-white px-8 py-4 rounded-full text-zinc-700 font-sans font-bold text-xs tracking-wider uppercase border border-zinc-200 hover:bg-zinc-50 smooth-transition">
          📖 Download Guidebook
        </a>
      </div>

      <!-- Core Specs Row -->
      <div class="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200">
        <div class="bg-white/80 p-4 rounded-2xl border border-zinc-150">
          <span class="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">Incentives</span>
          <span class="block font-sans font-extrabold text-sm sm:text-base text-zinc-900">Trophies & IDR Cash</span>
        </div>
        <div class="bg-white/80 p-4 rounded-2xl border border-zinc-150">
          <span class="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">Categories</span>
          <span class="block font-sans font-extrabold text-sm sm:text-base text-zinc-900">9 Elite Tracks</span>
        </div>
        <div class="bg-white/80 p-4 rounded-2xl border border-zinc-150">
          <span class="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">All Japan Partner</span>
          <span class="block font-sans font-extrabold text-sm sm:text-base text-green-600">FSI Accredited</span>
        </div>
      </div>
    </div>

    {/* Right Side: Beautiful Onboard Controller Telemetry Panel mockup */}
    <div class="lg:col-span-5 relative">
      <div class="w-full rounded-3xl bg-zinc-950 p-6 border border-zinc-800 shadow-2xl relative">
        <!-- Floating Backdrop grid -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,138,31,0.08),transparent)] pointer-events-none"></div>
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4 relative z-10">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <div>
              <h4 class="font-mono text-xs font-bold text-white tracking-widest uppercase">UNJ_ERIC_CORE_2026</h4>
              <span class="block text-[9px] text-zinc-500 font-mono">STABLE // ONLINE COMPILER OK</span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-zinc-800 font-mono text-[9px] text-zinc-400 border border-zinc-700">LIVE</span>
        </div>

        {/* Waveform visualizer nodes */}
        <div class="h-20 flex gap-1 items-end mb-4 relative z-10">
          <div class="bg-zinc-805 w-full rounded h-[40%] bg-zinc-800"></div>
          <div class="bg-zinc-805 w-full rounded h-[65%] bg-zinc-800"></div>
          <div class="bg-zinc-810 w-full rounded h-[80%] bg-zinc-800"></div>
          <div class="bg-zinc-800 w-full rounded h-[50%] bg-zinc-800"></div>
          <div class="bg-zinc-820 w-full rounded h-[90%] bg-zinc-800"></div>
          <div class="bg-zinc-800 w-full rounded h-[60%] bg-zinc-800"></div>
          <div class="bg-zinc-800 w-full rounded h-[75%] bg-zinc-800"></div>
          <div class="bg-zinc-815 w-full rounded h-[95%] bg-zinc-800"></div>
        </div>

        <div class="grid grid-cols-2 gap-3 relative z-10">
          <div class="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-center">
            <span class="block text-[8px] font-mono text-zinc-500 uppercase">Target Location</span>
            <span class="block text-white font-mono text-xs font-bold mt-0.5">UNJ Kampus A</span>
          </div>
          <div class="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-center">
            <span class="block text-[8px] font-mono text-zinc-500 uppercase">Organizer Org</span>
            <span class="block text-white font-sans text-xs font-bold mt-0.5 text-orange-400">BEM ELEKTRONIKA</span>
          </div>
        </div>

        <!-- Footer parameters -->
        <div class="flex justify-between items-center text-[9px] font-mono text-zinc-500 mt-4 border-t border-zinc-800 pt-4">
          <span>Official Event Registration</span>
          <span class="text-[#FF8A1F]">FT.UNJ.AC.ID</span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

    const rawBentoHTML = `<!-- BENTO GRID CHARACTERISTICS -->
<section class="py-20 bg-white border-t border-b border-zinc-200/50 eric-elementor-container">
  <div class="max-w-7xl mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
      <span class="text-[10px] uppercase font-mono tracking-widest font-extrabold px-3.5 py-1 rounded-full text-white" style="background-color: ${accentColor};">
        The ERIC Standard
      </span>
      <h2 class="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-zinc-950">
        Engineering & <span style="color: ${accentColor};">Scientific Character</span>
      </h2>
      <p class="text-zinc-500 text-sm font-sans font-semibold max-w-lg mx-auto">
        BEM Pendidikan Teknik Elektronika UNJ creates a supportive workspace promoting critical thinking, sportsmanship, and technological innovation.
      </p>
    </div>

    <!-- Bento network of 3 core cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div class="bg-zinc-50 border border-zinc-150 p-8 rounded-3xl space-y-4 smooth-transition hover:shadow-lg">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style="background-color: ${accentColor};">
          🔑
        </div>
        <h3 class="font-sans font-extrabold text-xl text-zinc-950">Innovation Target</h3>
        <p class="text-xs text-zinc-500 leading-relaxed font-sans font-semibold">
          Encouraging creative hardware programming, ladder logic config, and applicable telemetry problem-solving to meet Society 5.0 industrial challenges.
        </p>
      </div>

      <!-- Card 2 -->
      <div class="bg-zinc-50 border border-zinc-150 p-8 rounded-3xl space-y-4 smooth-transition hover:shadow-lg">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-zinc-900">
          ⚖️
        </div>
        <h3 class="font-sans font-extrabold text-xl text-zinc-900">Sportsmanship Rules</h3>
        <p class="text-xs text-zinc-500 leading-relaxed font-sans font-semibold">
          Strict pre-flight size audits, CAD compliance checks, and SARA / Plagiarism restrictions are thoroughly evaluated by professional juries.
        </p>
      </div>

      <!-- Card 3 -->
      <div class="bg-zinc-50 border border-zinc-150 p-8 rounded-3xl space-y-4 smooth-transition hover:shadow-lg">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style="background-color: #10B981;">
          🇮🇩
        </div>
        <h3 class="font-sans font-extrabold text-xl text-zinc-955">UNJ Certificate</h3>
        <p class="text-xs text-zinc-500 leading-relaxed font-sans font-semibold">
          Participants receive prestigious international credentials signed by Universitas Negeri Jakarta, supporting national track points.
        </p>
      </div>
    </div>
  </div>
</section>
`;

    const generatedIndonesianCategories = [
      { id: 'SUMO500', name: 'Sumobot 500G', target: 'Public / Umum', fee: 'Rp225.000', tagline: 'Speed & push torque calibration' },
      { id: 'SUMO3KG', name: 'Sumobot 3KG', target: 'Public / Umum', fee: 'Rp250.000', tagline: 'Heavy metal combat kinematics' },
      { id: 'LINE_MICRO', name: 'Line Follower Micro', target: 'Students / Siswa', fee: 'Rp250.000', tagline: 'PID track tracing trajectory' },
      { id: 'SOCCER', name: 'Mini Soccerbot', target: 'Public / Umum', fee: 'Rp250.000', tagline: 'Tactical remote field goal mechanics' },
      { id: 'PLC_IND', name: 'PLC Industrial', target: 'University / Mahasiswa', fee: 'Rp280.000', tagline: 'Ladder logic & actuator sequences' },
      { id: 'CREATIVE', name: 'Creative Innovation', target: 'Junior & Senior HS / Siswa', fee: 'Rp120.000', tagline: 'Open innovation automation concepts' },
      { id: 'RIC', name: 'Research Innovation Challenge', target: 'University / Mahasiswa', fee: 'Rp120.000', tagline: 'Deep AI and IoT project reviews' },
      { id: 'DRONE', name: 'Drone Innovation', target: 'Public / Umum', fee: 'Rp220.000', tagline: 'Autonomous flight ring traversal' },
      { id: 'COLLAB', name: 'Collaborative Robots', target: 'Vocational High School / SMK', fee: 'Rp180.000', tagline: 'Tactile manipulator operations' }
    ];

    const rawTracksHTML = `<!-- TOURNAMENT BATTLEGROUND SELECTION -->
<section class="py-20 bg-[#F8F7F3] text-zinc-950 eric-elementor-container" id="tracks-section">
  <div class="max-w-7xl mx-auto px-6">
    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border border-zinc-200" style="color: ${accentColor}; border-color: ${accentColor}3A;">
        Official Categories
      </div>
      <h2 class="text-4xl sm:text-5xl font-sans font-black tracking-tight text-zinc-950 leading-[1.05]">
        Registration & <span style="color: ${accentColor}; font-weight: 900;">Admission Fees</span>
      </h2>
      <p class="text-zinc-500 font-sans font-semibold text-xs sm:text-sm">
        Review the official category matrix mapping appropriate target audiences (Siswa/Mahasiswa) to registrations.
      </p>
    </div>

    <!-- Cards Grid representing the 9 segments -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${generatedIndonesianCategories.map((comp) => {
        return `
      <!-- Track Card: ${comp.id} -->
      <div class="bg-white rounded-3xl border border-black/[0.04] p-6 hover:-translate-y-1 hover:shadow-lg smooth-transition flex flex-col justify-between">
        <div>
          <!-- Icon Block & Code -->
          <div class="flex items-center justify-between mb-4">
            <span class="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-mono font-black text-xs">
              ${comp.id}
            </span>
            <span class="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100/10 text-[#FF8A1F] border border-orange-200/20">
              ${comp.target}
            </span>
          </div>

          <!-- Name & Tag -->
          <div class="space-y-1 mb-4">
            <h3 class="text-sm sm:text-base font-sans font-black tracking-tight text-zinc-900">${comp.name}</h3>
            <p class="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest leading-none">${comp.tagline}</p>
          </div>
        </div>

        <!-- Meta list -->
        <div class="space-y-3.5 pt-4 border-t border-zinc-100">
          <div class="flex items-center justify-between font-mono text-xs">
            <span class="text-zinc-400">Target Segment</span>
            <span class="font-extrabold text-zinc-800">${comp.target}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-sans text-xs font-semibold text-zinc-400">Admission Fee</span>
            <span class="font-mono font-black text-sm text-zinc-950" style="color: ${accentColor};">${comp.fee}</span>
          </div>
        </div>
      </div>`;
      }).join('\n')}
    </div>

    <!-- Official Contact Information Box -->
    <div class="mt-16 bg-zinc-900 text-zinc-300 rounded-3xl p-8 border border-white/5 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 class="font-sans font-black text-white text-lg">BEM Pendidikan Teknik Elektronika UNJ</h4>
          <p class="text-xs text-zinc-400 font-sans leading-normal mt-2">
            Kampus A Universitas Negeri Jakarta, Jl. Rawamangun Muka, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220
          </p>
        </div>
        <div class="space-y-1 text-xs font-mono">
          <span class="block text-zinc-550 text-[10px] uppercase font-bold tracking-wider">Contact Email Channels</span>
          <span class="block">Email 1: <strong class="text-white">ericunjofficial2026@gmail.com</strong></span>
          <span class="block">Email 2: <strong class="text-white font-sans">ariful.mujahid@mhs.unj.ac.id</strong></span>
          <span class="block">Instagram: <strong class="text-[#FF8A1F] font-sans">@ericunj.official</strong></span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

    if (selectedPreset === 'full') {
      return fontsSnippet + tailwindSnippet + rawHeroHTML + rawBentoHTML + rawTracksHTML;
    }
    if (selectedPreset === 'hero') {
      return fontsSnippet + tailwindSnippet + rawHeroHTML;
    }
    if (selectedPreset === 'bento') {
      return fontsSnippet + tailwindSnippet + rawBentoHTML;
    }
    return fontsSnippet + tailwindSnippet + rawTracksHTML;
  };

  const copyToClipboard = () => {
    const code = generateHTML();
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        setShowToast(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-zinc-900" id="elementor-generator-root">
      
      {/* Banner introduction with Sparkles */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(255,138,31,0.12),transparent)] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-xs text-orange-400 font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            No-Code Theme Solution
          </div>
          <h1 className="text-4xl sm:text-5xl font-sans font-black tracking-tight leading-tight">
            Elementor HTML <span className="text-orange-400">Widget Constructor</span>
          </h1>
          <p className="text-zinc-300 font-sans font-medium text-sm sm:text-base leading-relaxed">
            Every WordPress server is configured differently. If the standard theme zip file encounters installation limits (such as upload size bounds or missing unzip handlers on shared hosting libraries), fear not! You can extract any segment of the high-octane <strong>ERIC 2026 Competition</strong> layouts below and drop them instantly into your Elementor builder.
          </p>
        </div>
      </div>

      {/* Grid container: Left custom parameters, Right real code and visual instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-4 bg-white p-6.5 rounded-3xl border border-black/[0.04] space-y-8 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-sans font-black text-lg text-zinc-900 flex items-center gap-2">
              <Blocks className="w-5 h-5 text-zinc-600" />
              1. Preset Section
            </h3>
            <p className="text-xs text-zinc-400 font-medium">Select which segment block to extract for Elementor</p>
          </div>

          {/* Preset Buttons stack */}
          <div className="flex flex-col gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPreset(p.id as any)}
                className={`text-left p-4 rounded-2xl transition duration-300 border font-sans ${
                  selectedPreset === p.id
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                    : 'bg-[#FAFAFA] hover:bg-zinc-50 border-black/[0.04] text-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-xs tracking-tight">{p.name}</span>
                  {selectedPreset === p.id && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
                </div>
                <p className={`text-[10px] leading-relaxed font-medium ${selectedPreset === p.id ? 'text-zinc-300' : 'text-zinc-400'}`}>
                  {p.desc}
                </p>
              </button>
            ))}
          </div>

          <div className="h-px bg-zinc-150" />

          {/* Color theme config */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-sans font-black text-sm text-zinc-900 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></span>
                2. Cyber Theme Accent
              </h3>
              <p className="text-[11px] text-zinc-400">Choose custom colors to synchronize with your corporate branding</p>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {colorOptions.map((co) => (
                <button
                  key={co.value}
                  onClick={() => setAccentColor(co.value)}
                  className={`w-10 h-10 rounded-xl relative hover:scale-105 transition duration-200 border-2 ${
                    accentColor === co.value ? 'border-zinc-950 scale-102 shadow-sm' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: co.value }}
                  title={co.name}
                >
                  {accentColor === co.value && (
                    <span className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-xs font-mono font-bold text-zinc-400 block mb-1.5">Custom Hex Value</label>
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-black/[0.05] rounded-xl px-3.5 py-2.5 text-xs font-mono font-extrabold text-zinc-800 uppercase focus:outline-none focus:border-zinc-950"
                placeholder="#FF8A1F"
              />
            </div>
          </div>

          <div className="h-px bg-zinc-150" />

          {/* Option details switches */}
          <div className="space-y-4">
            <h3 className="font-sans font-black text-sm text-zinc-900">3. Parameters</h3>
            
            <div className="flex items-center justify-between bg-[#FAFAFA] p-3 rounded-xl border border-black/[0.02]">
              <div>
                <span className="block text-xs font-bold font-sans text-zinc-800">Inject Fonts</span>
                <span className="block text-[10px] text-zinc-400">Add display head tags for Plus Jakarta Sans</span>
              </div>
              <input
                type="checkbox"
                checked={includeFonts}
                onChange={(e) => setIncludeFonts(e.target.checked)}
                className="w-4 h-4 accent-zinc-900 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200/50 p-4.5 rounded-2xl space-y-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-orange-600 shrink-0" />
              <div className="space-y-1">
                <span className="block text-[11px] font-sans font-extrabold text-orange-850">Elementor Compatibility</span>
                <p className="text-[10px] text-orange-755 leading-relaxed font-sans font-semibold">
                  This constructor inserts the official <strong>Tailwind Play engine</strong> inside the HTML widget so any modern styles render correctly without requiring external CSS theme editors or system compilation locks!
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Preview Code and Copy block */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Action Block Card */}
          <div className="bg-zinc-900 text-white rounded-3xl border border-zinc-800 overflow-hidden shadow-lg">
            
            {/* Tab header inside display area */}
            <div className="px-6 py-5 bg-zinc-950/80 border-b border-zinc-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-orange-400" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-300">
                  GENERATED ELEMENTOR MARKUP ({selectedPreset.toUpperCase()})
                </span>
              </div>

              {/* Manual Trigger to copy */}
              <button
                onClick={copyToClipboard}
                className="px-5 py-2 rounded-xl text-xs font-sans font-black flex items-center gap-2 transition duration-300 bg-white hover:bg-zinc-100 text-zinc-950 hover:scale-102"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-800" />}
                {copied ? 'Copied Markup!' : 'Copy Code'}
              </button>
            </div>

            {/* Display raw scrollable text markup code */}
            <div className="p-6 bg-zinc-950/40 relative">
              <pre className="max-h-[360px] overflow-auto text-[10px] font-mono text-zinc-400 bg-zinc-950/85 p-5 rounded-2xl border border-zinc-850/85 leading-relaxed focus:outline-none select-all select-all-scrollable">
                <code>{generateHTML()}</code>
              </pre>

              <div className="absolute bottom-10 right-10 pointer-events-none md:flex items-center gap-2 bg-zinc-900/90 text-[10px] uppercase font-mono tracking-wider font-bold px-3 py-1.5 rounded-lg text-zinc-400 border border-zinc-800">
                <RefreshCw className="w-3 h-3 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
                Synchronous live schema
              </div>
            </div>

          </div>

          {/* Quick instructions checklist panel */}
          <div className="bg-white p-7 rounded-3xl border border-black/[0.04] space-y-5">
            <h3 className="font-sans font-black text-md text-zinc-955 flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              How to Install Snippet into Elementor (5-Second Guide)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-50 border border-zinc-150 p-4.5 rounded-2xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">1</span>
                <div>
                  <span className="block text-xs font-sans font-black text-zinc-900 mb-0.5">Drag HTML Widget</span>
                  <p className="text-[11px] leading-relaxed text-zinc-500 font-sans font-medium">Inside Elementor editor panel, search for the **HTML** element and drag it into your section container.</p>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-150 p-4.5 rounded-2xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">2</span>
                <div>
                  <span className="block text-xs font-sans font-black text-zinc-900 mb-0.5">Paste Generated Code</span>
                  <p className="text-[11px] leading-relaxed text-zinc-500 font-sans font-medium">Click on the HTML widget and paste the copied code directly inside the sidebar code box.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-zinc-500">
              <span className="flex items-center gap-1">
                ✔ Supports WordPress 5.x / 6.x
              </span>
              <span className="flex items-center gap-1">
                ✔ Styled natively with Elementor Containers
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* WordPress Functional Integration blueprint section */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.04] space-y-8 shadow-sm">
        <div className="border-b border-zinc-100 pb-5">
          <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-orange-400" />
            WordPress Functional Blueprint & Plugin Guide
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-sans mt-2 max-w-2xl leading-relaxed">
            While Elementor builds the visual components, bringing interactive database operations (user sign-ins, team sign-ups, track forms, and Stripe fees) to life requires simple, secure backend solutions. Here is the architecture checklist to make your site fully functional.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Node 1: User Log-In & Auth */}
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-zinc-200/60 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-orange-400/15 text-orange-600 flex items-center justify-center font-mono font-bold text-xs">
              A
            </div>
            <h4 className="font-sans font-black text-base text-zinc-900">1. User Log In & Authentication</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
              Prevent unauthorized registrants. Tie team entries directly to valid email logins natively in WordPress.
            </p>
            <div className="pt-2 space-y-2">
              <span className="block text-[9px] font-mono uppercase font-black text-orange-500">Fast No-Code Plugin</span>
              <p className="text-[11px] font-bold text-zinc-800">Ultimate Member (Free & Lightweight)</p>
              <div className="text-[10px] text-zinc-450 leading-relaxed font-sans">
                Install Ultimate Member. It automatically builds login, password reset, and registration shortcode pages like <code className="bg-zinc-150 font-mono text-[9px] px-1 py-0.5 rounded text-zinc-700">[ultimatemember]</code>. Use Elementor's Shortcode block to place them on your landing screen.
              </div>
            </div>
          </div>

          {/* Node 2: Reg Form */}
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-zinc-200/60 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-400/15 text-indigo-600 flex items-center justify-center font-mono font-bold text-xs">
              B
            </div>
            <h4 className="font-sans font-black text-base text-zinc-900">2. Team Registration Entries</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
              Collect team names, size caps (2-8), leader emails, and competition tracks securely stored inside your database.
            </p>
            <div className="pt-2 space-y-2">
              <span className="block text-[9px] font-mono uppercase font-black text-indigo-500">Free Database Form Plugin</span>
              <p className="text-[11px] font-bold text-zinc-800">Forminator Form Builder (Free)</p>
              <div className="text-[10px] text-zinc-450 leading-relaxed font-sans">
                Forminator is incredibly robust. Construct fields for Team Leaders, Core tracks, and dynamic participant lists. Submissions save automatically inside WordPress and can be exported as Excel/CSV!
              </div>
            </div>
          </div>

          {/* Node 3: Stripe Pay */}
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#FAF9F5] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/15 text-emerald-600 flex items-center justify-center font-mono font-bold text-xs">
              C
            </div>
            <h4 className="font-sans font-black text-base text-zinc-900">3. Local Payment Gateway Integration</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
              Accept credit cards, Virtual Accounts, or QRIS securely for entry fees (Rp120.000 - Rp280.000). Keep your hosting fully PCI compliant.
            </p>
            <div className="pt-2 space-y-2">
              <span className="block text-[9px] font-mono uppercase font-black text-emerald-500">INDONESIAN PAYMENT LINKAGE</span>
              <p className="text-[11px] font-bold text-zinc-800">Midtrans / Xendit for Forminator or Woocommerce</p>
              <div className="text-[10px] text-zinc-455 leading-relaxed font-sans">
                Forminator supports <strong>PayPal</strong> and <strong>Stripe</strong> natively. However, for Indonesian audiences (with QRIS/GoPay/ShopeePay/Transfer Bank), integrating a free plugin like <strong>Midtrans for WooCommerce</strong> or <strong>Xendit WP</strong> is highly recommended. Set up a simple WooCommerce product for registration fees, and link it at successful form submissions!
              </div>
            </div>
          </div>

        </div>

        {/* System Linkage Master Sequence */}
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-zinc-800">
          <div>
            <span className="text-[9px] font-mono text-orange-400 uppercase font-black tracking-widest block mb-1">Functional Walkthrough</span>
            <h3 className="font-sans font-black text-lg text-white">How To Connect All Modules Seamlessly (Sequence Guide)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans mt-4">
            
            <div className="border border-zinc-800 p-4.5 rounded-2xl bg-zinc-900 space-y-2.5">
              <span className="text-[9px] font-mono text-zinc-500">STEP 1</span>
              <span className="block font-black text-white">Activate User Profiles</span>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Activate the **Ultimate Member** pages. Create a beautiful login popup or redirection link so only active registered users can register teams.
              </p>
            </div>

            <div className="border border-zinc-800 p-4.5 rounded-2xl bg-zinc-900 space-y-2.5">
              <span className="text-[9px] font-mono text-zinc-500">STEP 2</span>
              <span className="block font-black text-white">Build Formulator Tracker</span>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Set up a new form in Forminator called "ERIC Registration Tracker". Add fields mirroring our React form. Restrict permissions to logged-in users.
              </p>
            </div>

            <div className="border border-zinc-850 p-4.5 rounded-2xl bg-zinc-900 space-y-2.5">
              <span className="text-[9px] font-mono text-zinc-500">STEP 3</span>
              <span className="block font-black text-white">Mount Channel Linkage</span>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Drop the **QRIS or Transfer** payment rules block. Hook track choices with dynamic pricing rules inside Forminator (e.g., Summit 500G = Rp225.000).
              </p>
            </div>

            <div className="border border-zinc-800 p-4.5 rounded-2xl bg-zinc-900 space-y-2.5">
              <span className="text-[9px] font-mono text-zinc-500">STEP 4</span>
              <span className="block font-black text-white">Generate Redirections</span>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Configure successful submissions to redirect users straight to your user dashboard contains telemetry and rules sheets.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
