/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * BEM UNJ ERIC 2026 Additional Landing Sections
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  Award, 
  Calendar, 
  Flag, 
  Users, 
  ShieldAlert, 
  CreditCard, 
  MapPin, 
  Trophy, 
  Sparkles, 
  CheckCircle, 
  Compass, 
  ExternalLink 
} from 'lucide-react';

const objectives = [
  {
    title: 'Technological Innovation',
    desc: 'Encourage creative programming, hardware design, and applicable problem-solving in the era of Industry 4.0 and Society 5.0.'
  },
  {
    title: 'Engineering Character',
    desc: 'Develop logical creativity, critical systems thinking, structural design capability, and practical engineering skills among students and public participants.'
  },
  {
    title: 'International Collaboration',
    desc: 'Form a world-class collaborative platform linking young innovators, industry stakeholders, and academic robotic hubs.'
  },
  {
    title: 'Applicable IoT Solutions',
    desc: 'Support the deployment of applicable sensor networks, autonomous navigation algorithms, and automation technologies for industry and society.'
  },
  {
    title: 'Integrity and Sportsmanship',
    desc: 'Promote fair play, teamwork, competitive integrity, and technical excellence throughout the entire tournament sequence.'
  }
];

const generalRules = [
  {
    title: 'Participation Limits',
    desc: 'One participant/team may only register and join one competition category to ensure focus and scheduling compatibility.'
  },
  {
    title: 'Offline Jakarta Venue',
    desc: 'All competition tracks are held fully offline on-site at Kampus A Universitas Negeri Jakarta. Teams must bring their physical robots and custom hardware.'
  },
  {
    title: 'Schedule & Compliance',
    desc: 'Participants must follow all strict schedules, pre-flight audits, and active telemetry checkouts. Late arrivals result in automatic disqualification.'
  },
  {
    title: 'Content Guidelines',
    desc: 'Submissions or team presentations must not contain plagiarism, SARA (race, religion, ethnicity) conflicts, or offensive/objectionable material.'
  },
  {
    title: 'Identification & Entry',
    desc: 'All registered team members and leaders must wear official ERIC ID cards at all times inside the venue and performance arenas.'
  },
  {
    title: 'Anti-Cheating Policy',
    desc: 'Any external modification, unauthorized teleoperation in autonomous tracks, or hardware forgery results in immediate disqualification and bracket removal.'
  }
];

const categoriesTable = [
  { category: 'Sumobot 500G', participants: 'Public / Umum', fee: 'Rp225.000' },
  { category: 'Sumobot 3KG', participants: 'Public / Umum', fee: 'Rp250.000' },
  { category: 'Line Follower Micro', participants: 'Students / Siswa', fee: 'Rp250.000' },
  { category: 'Mini Soccerbot', participants: 'Public / Umum', fee: 'Rp250.000' },
  { category: 'PLC Industrial', participants: 'University / Mahasiswa', fee: 'Rp280.000' },
  { category: 'Creative Innovation', participants: 'Junior & Senior HS / Siswa', fee: 'Rp120.000' },
  { category: 'Research Innovation Challenge (RIC)', participants: 'University / Mahasiswa', fee: 'Rp120.000' },
  { category: 'Drone Innovation', participants: 'Public / Umum', fee: 'Rp220.000' },
  { category: 'Collaborative Robots', participants: 'Vocational High School / SMK', fee: 'Rp180.000' }
];

const timelineEvents = [
  {
    date: '21 Jan – 30 Jun 2026',
    event: 'Socialization & Publication',
    desc: 'Dissemination of guidebook guidelines, online webinars, and institutional engagement programs.'
  },
  {
    date: '1 Jul – 31 Aug 2026',
    event: 'Registration Window',
    desc: 'Online team enrollment, document validation, and registration fee transaction lock.'
  },
  {
    date: '15 Sep 2026',
    event: 'Technical Meeting (TM)',
    desc: 'Virtual rules synchronization, bracket lotteries, telemetry configurations, and arena parameter layouts.'
  },
  {
    date: '22–24 Sep 2026',
    event: 'Main Competition Days',
    desc: 'Opening ceremonies, live offline matches at Kampus A UNJ, jury evaluations, and the Award Gala.'
  }
];

interface AboutSectionProps {
  onOpenRegister: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenRegister }) => {
  return (
    <section className="py-20 bg-white border-t border-b border-black/[0.03]" id="about-eric">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-royal/10 text-royal rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" /> About ERIC 2026
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-zinc-955">
              <span className="bg-gradient-to-r from-royal to-gold bg-clip-text text-transparent">Collaborative Innovation Platform</span>
            </h2>
            
            <div className="space-y-4 text-zinc-500 font-sans font-medium text-sm sm:text-base leading-relaxed">
              <p>
                The rapid development of technology in the era of <strong>Industry 4.0 and Society 5.0</strong> demands the younger generation not only become passive technology consumers, but also active creators and innovators.
              </p>
              <p>
                <strong>Electronics and Robotics Innovation Competition (ERIC) 2026</strong> is an international-scale robotics and electronics tournament organized by the <strong>BEM Pendidikan Teknik Elektronika, Fakultas Teknik, Universitas Negeri Jakarta</strong>.
              </p>
              <p>
                ERIC serves as a collaborative sandbox for students, innovators, and technology enthusiasts to develop critical thinking, machine logic, and industrial engineering skills through high-octane competitive tracks.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRegister}
                className="px-6 py-3 rounded-full bg-zinc-900 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-805 transition duration-205"
              >
                Join the Battleground
              </button>
            </div>
          </div>

          {/* Right Interactive Track List Column */}
          <div className="lg:col-span-5 bg-[#FAF9F5] p-8 rounded-3xl border border-black/[0.03] space-y-5">
            <h4 className="font-mono text-xs uppercase text-zinc-400 tracking-wider font-extrabold font-semibold">Supported Categories Include:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                'Sumobot 500G & 3KG',
                'Line Follower Micro',
                'Mini Soccerbot',
                'PLC Industrial',
                'Creative Innovation',
                'Drone Innovation',
                'Collaborative Robots',
                'Research Innovation (RIC)'
              ].map((track, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-black/[0.02] shadow-sm">
                   <span className="text-gold font-mono text-xs font-bold">0{i+1}</span>
                  <span className="font-sans font-bold text-xs text-zinc-750">{track}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 font-sans italic">
              *Through this competition, ERIC aims to create innovative and applicable technological solutions that answer real-world challenges in automation, AI, and IoT industries.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export const ObjectivesSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6" id="objectives-section">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-extrabold bg-royal/10 px-3 py-1 rounded-full">
          Our Mission Goals
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-zinc-950">
          ERIC 2026 Objectives
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-sans font-semibold">
          We operate under 5 fundamental principles to elevate the robotics workspace.
        </p>
      </div>

      {/* 5-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {objectives.map((obj, i) => (
          <div key={i} className="bg-white p-6.5 rounded-3xl border border-black/[0.04] space-y-4 group hover:shadow-md transition duration-300 relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-royal/10 text-royal font-mono font-bold text-xs flex items-center justify-center transition-transform group-hover:scale-110">
              0{i+1}
            </div>
            <h3 className="font-sans font-black text-sm text-zinc-900 leading-snug">{obj.title}</h3>
            <p className="text-[11px] text-zinc-450 leading-relaxed font-sans">{obj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const RulesSection: React.FC = () => {
  const [openRuleIndex, setOpenRuleIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white border-t border-b border-black/[0.03]" id="rules-section">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-royal font-extrabold bg-royal/10 px-3 py-1 rounded-full">
            Requirements
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-zinc-955">
            General Regulations & Rules
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-sans font-semibold">
            Important requirements from the official handbook that participants must follow.
          </p>
        </div>

        {/* Rules stack with Accordions */}
        <div className="space-y-3">
          {generalRules.map((rule, idx) => {
            const isOpen = openRuleIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl transition duration-300 overflow-hidden ${
                  isOpen ? 'border-royal/40 bg-[#FAF9F5]' : 'border-zinc-150 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenRuleIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between font-sans font-bold text-sm text-zinc-850"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-royal' : 'bg-zinc-350'}`} />
                    {rule.title}
                  </div>
                  {isOpen ? <Minus className="w-4 h-4 text-royal" /> : <Plus className="w-4 h-4 text-zinc-450" />}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-zinc-500 font-sans text-xs sm:text-sm leading-relaxed border-t border-zinc-100/50 font-medium">
                    {rule.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface FeesSectionProps {
  onOpenRegister: () => void;
}

export const FeesSection: React.FC<FeesSectionProps> = ({ onOpenRegister }) => {
  return (
    <section className="max-w-7xl mx-auto px-6" id="fees-section">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-zinc-950">
          Category & Fee Matrix
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-sans font-semibold">
          Affordable admissions tiers mapped to targeted educational brackets (Siswa, Mahasiswa, and Umum).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Table Layout */}
        <div className="lg:col-span-8 bg-white border border-black/[0.04] rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-left font-sans">
            <thead>
              <tr className="bg-zinc-900 text-white text-[11px] tracking-wider uppercase font-mono font-bold">
                <th className="px-6 py-4">Category Track Code</th>
                <th className="px-6 py-4">Target Audience (Sasaran)</th>
                <th className="px-6 py-4 text-right">Fee (Biaya)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
              {categoriesTable.map((item, i) => (
                <tr key={i} className="hover:bg-[#FAF9F5]/70 transition">
                  <td className="px-6 py-4 font-extrabold text-royal">{item.category}</td>
                  <td className="px-6 py-4 font-semibold text-zinc-650">{item.participants}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-zinc-900">{item.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Parameters Box */}
        <div className="lg:col-span-4 bg-[#FAF9F5] p-6.5 rounded-3xl border border-black/[0.04] space-y-5">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold text-royal uppercase tracking-widest block">IMPORTANT DATES</span>
            <h4 className="font-sans font-black text-lg text-zinc-900">Registration Timeline</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-black/[0.02]">
              <span className="font-sans font-semibold text-zinc-550">Registration Opens</span>
              <span className="font-mono font-bold text-royal">01 July 2026</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-black/[0.02]">
              <span className="font-sans font-semibold text-zinc-550">Registration Window Closes</span>
              <span className="font-mono font-bold text-red-500">31 August 2026</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-black/[0.02]">
              <span className="font-sans font-semibold text-zinc-550">Technical Meeting (TM)</span>
              <span className="font-mono font-bold text-royal">15 September 2026</span>
            </div>
          </div>

          <div className="bg-royal/5 p-4.5 rounded-2xl border border-royal/10 text-[11px] text-zinc-900 font-sans leading-relaxed font-semibold">
            <strong>Admission Instruction:</strong> Submissions and registration payments are certified instantly in our digital gateway. QRIS / Bank Transfer options supported.
          </div>

          <button
            onClick={onOpenRegister}
            className="w-full py-4.5 rounded-full text-center bg-gradient-to-r from-royal to-cobalt hover:opacity-90 transition text-[#FFF] text-xs font-sans font-extrabold tracking-wider uppercase shadow-md shadow-royal/10"
          >
            Start Team Enrollment
          </button>
        </div>

      </div>
    </section>
  );
};

export const TimelineSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-b border-black/[0.03]" id="timeline-section">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-extrabold bg-royal/10 px-3 py-1 rounded-full">
            Official Schedule
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-zinc-955">
            The Competition Timeline
          </h2>
          <p className="text-zinc-550 text-xs sm:text-sm font-sans font-semibold">
            From publication socialization to live arena matches at FT UNJ.
          </p>
        </div>

        {/* Interactive timeline progress lines */}
        <div className="relative border-l border-zinc-200 ml-3 md:ml-24 space-y-10 py-2">
          
          {timelineEvents.map((ev, i) => (
            <div key={i} className="relative pl-8 sm:pl-10">
              {/* Visual marker dot */}
              <span className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-royal flex items-center justify-center font-mono text-[9px] font-bold text-royal shadow-sm">
                0{i+1}
              </span>

              {/* Left Date indicator for desktop */}
              <div className="hidden md:block absolute -left-48 top-1.5 w-40 text-right pr-6">
                <span className="block font-mono text-xs font-bold text-zinc-400">{ev.date}</span>
              </div>

              <div className="bg-[#FAF9F5] p-5.5 rounded-2xl border border-black/[0.02] space-y-1.5">
                <span className="block md:hidden font-mono text-[10px] font-extrabold text-royal">{ev.date}</span>
                <h4 className="font-sans font-black text-sm text-zinc-900">{ev.event}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans font-semibold">{ev.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export const AwardsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6" id="awards-section">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-805 text-white rounded-3xl p-8 sm:p-14 border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(0,71,171,0.15),transparent)] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Context Left */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/25 px-3 py-1 rounded-full text-xs text-gold font-mono font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 animate-pulse" /> High-Rank Recognition
            </div>
            <h3 className="text-3xl sm:text-5xl font-sans font-black tracking-tight leading-tight">
              Prestige Awards & <br />
              <span className="bg-gradient-to-r from-gold to-vibrant-yellow bg-clip-text text-transparent">Collaborative Prizes</span>
            </h3>
            <p className="text-zinc-350 text-xs sm:text-sm font-sans leading-relaxed">
              ERIC 2026 is highly evaluated by international sponsors and regional academic reviewers. Winning teams in each of the official battlegrounds receive career-defining incentives and support:
            </p>
          </div>

          {/* List Right */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-850 space-y-2">
              <span className="text-2xl animate-pulse">🏆</span>
              <span className="block font-sans font-bold text-xs text-white">Official UNJ Trophies</span>
              <span className="block text-[10px] text-zinc-400 font-mono font-medium">Gold, Silver and Bronze laureates</span>
            </div>
            <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-850 space-y-2">
              <span className="text-2xl animate-pulse">💵</span>
              <span className="block font-sans font-bold text-xs text-white">Millions IDR Cash Prizes</span>
              <span className="block text-[10px] text-zinc-400 font-mono font-medium">Direct institutional funding grants</span>
            </div>
            <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-850 space-y-2">
              <span className="text-2xl animate-pulse">📄</span>
              <span className="block font-sans font-bold text-xs text-white">International Certificates</span>
              <span className="block text-[10px] text-gold font-mono font-medium">Signed by Dean Faculty of Engineering</span>
            </div>
            <div className="bg-zinc-950/40 p-4.5 rounded-2xl border border-zinc-850 space-y-2 bg-gradient-to-br from-royal/10 to-transparent">
              <span className="text-2xl">🇯🇵</span>
              <span className="block font-sans font-bold text-xs text-white">FSI All Japan Pathway</span>
              <span className="block text-[10px] text-green-400 font-mono font-medium">Official certificate endorsement opportunity</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Default wrapper component for backward compatibility if imported elsewhere
interface AboutAndRulesProps {
  onOpenRegister: () => void;
}

export const AboutAndRules: React.FC<AboutAndRulesProps> = ({ onOpenRegister }) => {
  return (
    <div className="space-y-24 bg-[#F8F7F3] pb-20">
      <AboutSection onOpenRegister={onOpenRegister} />
      <ObjectivesSection />
      <RulesSection />
      <FeesSection onOpenRegister={onOpenRegister} />
      <TimelineSection />
      <AwardsSection />
    </div>
  );
};
