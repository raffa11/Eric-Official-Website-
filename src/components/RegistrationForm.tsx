/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Competition, Registration } from '../types';
import { useAuth } from '../context/AuthContext';
import { useRegistrations } from '../context/RegistrationContext';
import { ArrowLeft, UserPlus, Trash2, ArrowRight, Check, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

interface RegistrationFormProps {
  selectedCompetition: Competition;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedCompetition,
  onCancel,
  onSubmitSuccess
}) => {
  const { user, triggerAuthCallback } = useAuth();
  const { addRegistration } = useRegistrations();

  const [teamName, setTeamName] = useState('');
  const [institution, setInstitution] = useState(user?.institution || '');
  const [teamLeader, setTeamLeader] = useState(user?.name || '');
  const [whatsapp, setWhatsapp] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [newMemberName, setNewMemberName] = useState('');

  const [error, setError] = useState('');

  // Sync user values if they authorize session mid-way
  useEffect(() => {
    if (user) {
      if (!teamLeader) setTeamLeader(user.name);
      if (!institution && user.institution) setInstitution(user.institution);
    }
  }, [user]);

  // Adjust prefilled member list to meet minimum limits in case
  useEffect(() => {
    // If we need at least min-1 addition (excluding leader acts as first member usually, or dynamic slots)
    // Let's keep empty and allow simple list
  }, [selectedCompetition]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = newMemberName.trim();
    if (!cleanName) {
      setError('Member name cannot be blank');
      return;
    }

    if (members.length >= selectedCompetition.teamSize.max - 1) {
      setError(`This competition allows a maximum of ${selectedCompetition.teamSize.max} members (including Team Leader).`);
      return;
    }

    setMembers([...members, cleanName]);
    setNewMemberName('');
  };

  const handleRemoveMember = (idx: number) => {
    const updated = [...members];
    updated.splice(idx, 1);
    setMembers(updated);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!teamName.trim()) {
      setError('Team name is required');
      return;
    }

    if (!institution.trim()) {
      setError('Institution/Academy is required');
      return;
    }

    if (!teamLeader.trim()) {
      setError('Team leader name is required');
      return;
    }

    if (!whatsapp.trim()) {
      setError('WhatsApp contact coordinate is required');
      return;
    }

    const totalCalculatedMembers = members.length + 1; // +1 for the leader
    if (totalCalculatedMembers < selectedCompetition.teamSize.min) {
      setError(
        `This track requires at least ${selectedCompetition.teamSize.min} members. Please add at least ${
          selectedCompetition.teamSize.min - 1
        } team member(s) to assist leader ${teamLeader}.`
      );
      return;
    }

    // Trigger auth first, if they aren't authenticated yet
    triggerAuthCallback(() => {
      // If of course they authenticate successfully, we write registration to context
      try {
        addRegistration({
          competitionId: selectedCompetition.id,
          teamName: teamName.trim(),
          institution: institution.trim(),
          teamLeader: teamLeader.trim(),
          whatsapp: whatsapp.trim(),
          members: [teamLeader.trim(), ...members] // Leader is saved as the first index of member list
        });
        onSubmitSuccess();
      } catch (err) {
        setError('An unexpected error happened during registration writes.');
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-[#F8F7F3] text-zinc-900" id="registration-form-section">
      {/* Return button */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 mb-8 uppercase tracking-wider transition"
        id="reg-btn-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Competitions
      </button>

      {/* Main Grid Wrapper */}
      <div className="bg-white rounded-3xl border border-black/[0.04] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
        
        {/* Track brief banner */}
        <div className="md:col-span-4 bg-zinc-900 text-white p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-orange-400 animate-pulse" />
            </div>
            <div>
              <span className="block text-[9px] font-mono tracking-wider uppercase text-zinc-400">Selected Battleground</span>
              <h3 className="font-sans font-black text-lg text-white leading-tight">{selectedCompetition.name}</h3>
              <span className="text-orange-400 font-mono text-[11px] font-bold">Track ID: {selectedCompetition.id}</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans font-medium">
              {selectedCompetition.shortDesc}
            </p>
          </div>

          <div className="pt-8 border-t border-zinc-800 space-y-3 font-mono text-[10px] text-zinc-400">
            <div>
              <span className="block text-zinc-500 font-bold uppercase">Required team size</span>
              <span className="text-zinc-200 text-xs font-bold font-sans">
                {selectedCompetition.teamSize.min} to {selectedCompetition.teamSize.max} Members
              </span>
            </div>
            <div>
              <span className="block text-zinc-500 font-bold uppercase">Registration Fee</span>
              <span className="text-orange-400 text-[13px] font-sans font-black">
                {selectedCompetition.feeIDRText}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Form entries */}
        <form onSubmit={handleFormSubmit} className="md:col-span-8 p-8 space-y-6">
          <div className="space-y-1">
            <h4 className="font-sans font-extrabold text-xl text-zinc-950">Team Credentials Configuration</h4>
            <p className="text-xs text-zinc-500 font-sans font-medium">Fill in the certified information for validation.</p>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-red-50 border border-red-200/60 text-red-700 text-xs font-semibold">
              <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Core inputs */}
          <div className="space-y-4">
            {/* Team Name */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                Team Name
              </label>
              <input
                type="text"
                placeholder="e.g. Helix Rovers"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4.5 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-orange-400 focus:outline-none transition text-sm text-zinc-800"
                id="reg-input-teamname"
              />
            </div>

            {/* Institution / University */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                Institution / University / Academy
              </label>
              <input
                type="text"
                placeholder="e.g. Kyoto Institute of Technology"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-4.5 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-orange-400 focus:outline-none transition text-sm text-zinc-800"
                id="reg-input-institution"
              />
            </div>

            {/* Two Column details: Leader and Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                  Team Leader Name
                </label>
                <input
                  type="text"
                  placeholder="Full Leader Name"
                  value={teamLeader}
                  onChange={(e) => setTeamLeader(e.target.value)}
                  className="w-full px-4.5 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-orange-400 focus:outline-none transition text-sm text-zinc-800"
                  id="reg-input-leader"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  placeholder="e.g. +81 90 9876 5432"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4.5 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-orange-400 focus:outline-none transition text-sm text-zinc-800"
                  id="reg-input-whatsapp"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Members Module */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <div>
              <label className="block text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-bold mb-1">
                Co-Engineers & Teammates ({members.length + 1} of max {selectedCompetition.teamSize.max})
              </label>
              <span className="block text-[11px] text-zinc-400 leading-none">
                Leader <strong>{teamLeader || '[Leader Name]'}</strong> acts as Member #1. Add supplementary members.
              </span>
            </div>

            {/* Added member list */}
            {members.length > 0 && (
              <div className="space-y-2 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/50">
                {members.map((m, i) => (
                  <div key={i} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-zinc-100 text-xs text-zinc-800 font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      Member {i + 2}: {m}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(i)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition"
                      title="Remove member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Addition Form Input */}
            {members.length + 1 < selectedCompetition.teamSize.max ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter supplementary engineer's name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMember(e);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-orange-400 focus:outline-none transition text-xs text-zinc-800"
                  id="reg-input-newmember"
                />
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-4 py-2.5 rounded-xl font-bold font-sans text-xs flex items-center gap-1.5 border border-zinc-200/50 transition-all shrink-0"
                  id="reg-btn-addmember"
                >
                  <UserPlus className="w-3.5 h-3.5 text-zinc-700" />
                  Add Slot
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-zinc-400 bg-orange-50/50 px-3 py-2 rounded-xl border border-orange-200/40 font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Maximum team size limit reached! Proceed to certification below.</span>
              </div>
            )}
          </div>

          {/* CTA Group */}
          <div className="pt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-gold" /> Secure SSL processing
            </span>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-royal to-cobalt hover:from-royal/90 hover:to-cobalt/90 transition duration-300 text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-full shadow-[0_4px_12px_rgba(0,71,171,0.25)] flex items-center gap-2"
              id="reg-btn-submit"
            >
              Confirm registration
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
