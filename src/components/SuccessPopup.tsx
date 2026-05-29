/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Registration, Competition } from '../types';
import { CheckCircle, ArrowRight, Users, Star, Sparkles, Building } from 'lucide-react';

interface SuccessPopupProps {
  registration: Registration;
  competition: Competition;
  onGoToDashboard: () => void;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  registration,
  competition,
  onGoToDashboard
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md" id="success-popup-backdrop">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl border border-black/[0.04] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.2)] flex flex-col items-center text-center space-y-6"
        id="success-popup-container"
      >
        {/* Background celebration circles */}
        <div className="absolute top-10 w-40 h-40 rounded-full bg-emerald-100/40 blur-[50px] -z-1 pointer-events-none" />

        {/* Dynamic Success Checkmark */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-sm relative">
          <CheckCircle className="w-8 h-8 text-emerald-600 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
          </span>
        </div>

        {/* Typography */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-widest border border-emerald-150">
            <Sparkles className="w-3 h-3 text-emerald-500" /> Securely Verified
          </div>
          <h3 className="font-sans font-black text-2xl md:text-3xl text-zinc-900 leading-tight">
            Registration Approved
          </h3>
          <p className="text-zinc-500 font-sans font-medium text-xs md:text-sm max-w-sm leading-relaxed">
            Congratulations. Your team has been successfully vetted and approved inside the official **ERIC 2026** database tracking system.
          </p>
        </div>

        {/* Transaction Summary Panel */}
        <div className="w-full bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-250 pb-3 font-mono text-[10px] text-zinc-400">
            <span>TRANSACTION INVOICE</span>
            <span className="text-zinc-800 font-bold">{registration.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-sans">
            <div>
              <span className="block text-[9px] font-mono text-zinc-400 uppercase font-bold">Team Name</span>
              <span className="font-bold text-zinc-900 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-zinc-500" /> {registration.teamName}
              </span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-zinc-400 uppercase font-bold">Battleground</span>
              <span className="font-bold text-zinc-950 truncate max-w-[150px] block">
                {competition.name}
              </span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-zinc-400 uppercase font-bold">Institution / Lab</span>
              <span className="font-bold text-zinc-800 flex items-center gap-1 max-w-[150px] truncate">
                <Building className="w-3.5 h-3.5 text-zinc-400" /> {registration.institution}
              </span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-zinc-400 uppercase font-bold">Leader Code</span>
              <span className="font-bold text-zinc-800">{registration.teamLeader}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-250 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>TRANSACTION REF:</span>
            <span className="text-royal font-bold font-mono tracking-wider">
              {registration.transactionId || 'MOCK-XF-99081'}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full pt-2">
          <button
            onClick={onGoToDashboard}
            className="w-full py-4 bg-zinc-900 hover:bg-gradient-to-r hover:from-royal hover:to-cobalt hover:shadow-[0_4px_12px_rgba(0,71,171,0.25)] text-white text-xs font-mono uppercase tracking-wider font-extrabold rounded-xl transition duration-300 flex items-center justify-center gap-2"
            id="success-btn-dashboard"
          >
            Access User Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Security watermark */}
        <p className="text-[9px] font-mono text-zinc-400 uppercase">
          Digital Hash Signature cryptographically generated by ERIC Labs // 2026
        </p>

      </div>
    </div>
  );
};
