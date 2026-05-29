/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OFFICIAL_COMPETITIONS } from '../utils/mockData';
import { Competition } from '../types';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface CompetitionSelectorProps {
  onSelectCompetition: (comp: Competition) => void;
  onRegisterCompetition: (comp: Competition) => void;
}

export const CompetitionSelector: React.FC<CompetitionSelectorProps> = ({
  onSelectCompetition,
  onRegisterCompetition
}) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Siswa / SMK', 'Mahasiswa', 'Public / Umum'];

  const filteredCompetitions = OFFICIAL_COMPETITIONS.filter((comp) => {
    if (filter === 'All') return true;
    if (filter === 'Siswa / SMK') {
      return ['LINE_MICRO', 'CREATIVE', 'COLLAB'].includes(comp.id);
    }
    if (filter === 'Mahasiswa') {
      return ['PLC_IND', 'RIC'].includes(comp.id);
    }
    if (filter === 'Public / Umum') {
      return ['SUMO500', 'SUMO3KG', 'SOCCER', 'DRONE'].includes(comp.id);
    }
    return true;
  });

  // Dynamic Lucide helper mapping
  const renderIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-6 h-6" />;
    }
    return <Icons.Cpu className="w-6 h-6" />;
  };

  return (
    <div className="py-20 bg-[#F8F7F3] text-zinc-900" id="tracks-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-royal/10 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-royal">
            Official Competitions
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-zinc-900 leading-[1.05]">
            Explore the <span className="bg-gradient-to-r from-royal via-gold to-cobalt bg-clip-text text-transparent">9 Innovation Tracks</span>
          </h2>
          <p className="text-zinc-500 font-sans font-semibold text-xs sm:text-sm leading-relaxed">
            Select an innovation track below to read detailed rules, verify structural guidelines, inspect project submission timelines, and register your team.
          </p>

          {/* Tab Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4.5 py-2 rounded-full text-xs font-sans font-bold transition duration-300 ${
                  filter === cat
                    ? 'bg-zinc-905 text-gold bg-zinc-900 shadow-md'
                    : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-black/[0.04]'
                }`}
                id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="bento-tracks">
          {filteredCompetitions.map((comp) => {
            // Check status colors
            let statusColor = 'bg-green-100 text-green-700 border-green-200/50';
            if (comp.status === 'Filling Fast') {
              statusColor = 'bg-yellow-50 text-gold border-gold/35';
            } else if (comp.status === 'Closed') {
              statusColor = 'bg-red-100 text-red-700 border-red-200/50';
            }

            return (
              <motion.div
                key={comp.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative bg-white rounded-3xl border border-black/[0.04] p-6.5 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col justify-between"
                id={`track-card-${comp.id}`}
              >
                {/* Background Hover subtle gradient overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-royal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top line with Icon and Status badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-royal group-hover:scale-105 shadow-sm group-hover:shadow-[0_4px_12px_rgba(0,71,171,0.25)]">
                      {renderIcon(comp.iconName)}
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <span className="text-[9px] font-mono font-black text-royal bg-royal/5 border border-royal/10 px-2 py-0.5 rounded-full uppercase">
                        {comp.targetAudience}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColor}`}>
                        {comp.status}
                      </span>
                    </div>
                  </div>

                  {/* Category Code and Name */}
                  <div className="space-y-2 mb-4">
                    <span className="block text-[10px] font-mono uppercase font-black text-zinc-455 tracking-wider">
                      Track Code: {comp.id}
                    </span>
                    <h3 className="text-[19px] font-sans font-black tracking-tight text-zinc-900 group-hover:text-royal transition duration-300">
                      {comp.name}
                    </h3>
                    <p className="text-[12px] font-sans font-bold text-zinc-400 italic">
                      {comp.tagline}
                    </p>
                  </div>

                  {/* Body description */}
                  <p className="text-zinc-500 font-sans font-medium text-[13px] leading-relaxed mb-6">
                    {comp.shortDesc}
                  </p>
                </div>

                {/* Footer specs or Action Buttons inside card */}
                <div className="space-y-4 pt-4 border-t border-zinc-100">
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Icons.Users className="w-3.5 h-3.5 text-zinc-400" />
                      {comp.teamSize.min}-{comp.teamSize.max} Members
                    </span>
                    <span className="font-sans font-black text-gold text-xs">
                      Fee: {comp.feeIDRText}
                    </span>
                  </div>

                  {/* Action Group */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectCompetition(comp)}
                      className="text-center py-2 px-2.5 rounded-xl border border-black/[0.05] hover:border-black/[0.12] hover:bg-zinc-50 text-[11px] font-bold font-sans transition text-zinc-700"
                      id={`track-details-btn-${comp.id}`}
                    >
                      Rules & Steps
                    </button>
                    <button
                      onClick={() => onRegisterCompetition(comp)}
                      disabled={comp.status === 'Closed'}
                      className={`text-center py-2 px-2.5 rounded-xl text-[11px] font-extrabold font-sans transition shadow-sm ${
                        comp.status === 'Closed'
                          ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                          : 'bg-zinc-900 text-white hover:bg-gradient-to-r hover:from-royal hover:to-cobalt hover:shadow-[0_4px_10px_rgba(0,71,171,0.25)]'
                      }`}
                      id={`track-reg-btn-${comp.id}`}
                    >
                      Register Track
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
