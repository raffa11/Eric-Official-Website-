/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo } from 'react';
import { useRegistrations } from '../context/RegistrationContext';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_COMPETITIONS } from '../utils/mockData';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  Trophy, 
  Users, 
  CreditCard, 
  ArrowRight, 
  Sparkles,
  Zap,
  Building2,
  Phone,
  BookmarkCheck,
  UserCheck
} from 'lucide-react';
import { Registration, Competition } from '../types';

export const Dashboard: React.FC = () => {
  const { registrations, updateStatus } = useRegistrations();
  const { user, setAuthModalOpen } = useAuth();
  
  // Tab within the simplified dashboard: 'my-lobby' (their matches) and 'all-registrations' (the complete list)
  const [dbTab, setDbTab] = useState<'my-lobby' | 'all-registrations'>('my-lobby');

  // Filter registrations that belong to the logged-in user
  const myRegistrations = useMemo(() => {
    if (!user) return [];
    const nameLower = user.name.toLowerCase();
    const emailLower = user.email.toLowerCase();
    return registrations.filter(r => 
      r.teamLeader.toLowerCase() === nameLower ||
      r.members.some(m => m.toLowerCase() === nameLower) ||
      (r.id && localStorage.getItem(`client_created_reg_${r.id}`) === 'true')
    );
  }, [registrations, user]);

  // Vetted status color map helper
  const getStatusStyle = (status: Registration['paymentStatus']) => {
    switch (status) {
      case 'Approved':
        return {
          pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
          text: 'text-emerald-600',
          indicator: 'bg-emerald-500'
        };
      case 'Technical Review':
        return {
          pill: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
          text: 'text-indigo-600',
          indicator: 'bg-indigo-500'
        };
      case 'Pending':
        return {
          pill: 'bg-amber-50 text-amber-700 border-amber-200/50',
          text: 'text-amber-600',
          indicator: 'bg-amber-500'
        };
      case 'Rejected':
        return {
          pill: 'bg-rose-50 text-rose-700 border-rose-200/50',
          text: 'text-rose-600',
          indicator: 'bg-rose-500'
        };
      default:
        return {
          pill: 'bg-zinc-50 text-zinc-600 border-zinc-200',
          text: 'text-zinc-500',
          indicator: 'bg-zinc-450'
        };
    }
  };

  // Helper to resolve Competition metadata from id
  const getCompetitionData = (id: string): Competition | undefined => {
    return OFFICIAL_COMPETITIONS.find(c => c.id === id);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8" id="user-dashboard-root">
      
      {/* 1. GUEST GREETING SECTION */}
      {!user ? (
        <div className="max-w-xl mx-auto text-center py-20 px-8 bg-white border border-black/[0.04] rounded-3xl space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-royal/10 flex items-center justify-center text-gold mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-sans font-black tracking-tight text-zinc-900">
              Access the ERIC Arena Hub
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-sans font-medium max-w-sm mx-auto leading-relaxed">
              Sign in to manage your active teams, track transaction approvals, down-load certified guidebooks, and view offline arena details.
            </p>
          </div>
          <div>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-royal to-cobalt hover:opacity-90 text-white font-sans text-xs font-bold uppercase tracking-wider transition shadow-md shadow-royal/10"
              id="guest-tab-signin"
            >
              Sign In to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 2. AUTHENTICATED PROFILE SUMMARY HEADER */}
          <div className="bg-white rounded-3xl border border-black/[0.04] p-6.5 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-royal/[0.02] blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-gold font-sans font-black text-lg flex items-center justify-center uppercase shrink-0">
                {user.name.slice(0, 2)}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-zinc-955">
                    Welcome, {user.name}
                  </h2>
                  <span className="text-[9px] font-mono font-extrabold uppercase bg-royal/5 text-royal px-2 py-0.5 rounded-full border border-royal/10">
                    Registered Athlete
                  </span>
                </div>
                <p className="text-xs text-zinc-404 font-sans font-semibold">
                  {user.email} • {user.institution || 'Academic Institution'}
                </p>
              </div>
            </div>

            {/* Total count statistics */}
            <div className="flex items-center gap-6">
              <div className="text-left">
                <span className="block text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">My Registrations</span>
                <span className="block text-2xl font-sans font-black text-royal">{myRegistrations.length} Teams</span>
              </div>
              <div className="h-10 w-px bg-zinc-100" />
              <div className="text-left">
                <span className="block text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">Overall Standings</span>
                <span className="block text-2xl font-sans font-black text-zinc-900">{registrations.length} Active</span>
              </div>
            </div>
          </div>

          {/* 3. SIMPLIFIED SUB-TABS */}
          <div className="flex border-b border-zinc-200/60 pb-px">
            <button
              onClick={() => setDbTab('my-lobby')}
              className={`pb-3 px-6 text-xs sm:text-sm font-sans font-extrabold tracking-wide border-b-2 transition duration-250 ${
                dbTab === 'my-lobby' 
                  ? 'border-royal text-royal' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              My Registered Competitions
            </button>
            <button
              onClick={() => setDbTab('all-registrations')}
              className={`pb-3 px-6 text-xs sm:text-sm font-sans font-extrabold tracking-wide border-b-2 transition duration-250 ${
                dbTab === 'all-registrations' 
                  ? 'border-royal text-royal' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              Global Registrants List ({registrations.length})
            </button>
          </div>

          {/* 4. MAIN USER LOBBY COMPONENT */}
          {dbTab === 'my-lobby' && (
            <div className="space-y-6">
              {myRegistrations.length === 0 ? (
                // Clean empty state if not signed up yet
                <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-black/[0.04] space-y-6 shadow-sm">
                  <div className="w-14 h-14 bg-royal/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
                    <BookmarkCheck className="w-6 h-6" />
                  </div>
                  <div className="max-w-sm mx-auto space-y-2">
                    <h3 className="font-sans font-black text-lg text-zinc-900">
                      No Competitions Joined Yet
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-medium text-zinc-400 leading-relaxed">
                      You are not currently enrolled as a participant in any track. Browse categories, configure your team size, and upload proof of fee to lock your bracket.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <span className="text-xs text-zinc-405 font-mono">FSI Japan All Pathway Accredited</span>
                  </div>
                </div>
              ) : (
                // Beautiful user registered lists
                <div className="grid grid-cols-1 gap-6">
                  {myRegistrations.map((reg) => {
                    const comp = getCompetitionData(reg.competitionId);
                    const styles = getStatusStyle(reg.paymentStatus);
                    return (
                      <div 
                        key={reg.id} 
                        className="bg-white rounded-3xl border border-black/[0.04] p-6.5 sm:p-8 flex flex-col lg:flex-row gap-6 justify-between items-stretch shadow-sm"
                      >
                        {/* Track Info */}
                        <div className="space-y-4 max-w-xl">
                          <div className="flex gap-3 items-start">
                            <span className="font-mono text-[10px] font-extrabold uppercase bg-royal/5 text-royal px-2.5 py-1 rounded border border-royal/10">
                              {reg.competitionId}
                            </span>
                            <div>
                              <h3 className="font-sans font-black text-base sm:text-lg text-zinc-950 leading-tight">
                                {comp?.name || reg.competitionId}
                              </h3>
                              <span className="text-[11px] font-sans text-zinc-402 block font-semibold mt-0.5">
                                {comp?.tagline || 'Electronics and Robotics Competition'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs font-sans font-semibold pt-1">
                            <div>
                              <span className="block text-[8px] font-mono text-zinc-400 uppercase">Team Name</span>
                              <span className="text-zinc-800 font-extrabold block">{reg.teamName}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono text-zinc-400 uppercase">Team Leader</span>
                              <span className="text-zinc-800 font-extrabold block">{reg.teamLeader}</span>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <span className="block text-[8px] font-mono text-zinc-400 uppercase">WhatsApp Coordination</span>
                              <span className="text-zinc-800 font-mono text-[11px] block flex items-center gap-1">
                                <Phone className="w-3 h-3 text-zinc-400" /> {reg.whatsapp}
                              </span>
                            </div>
                          </div>

                          {/* Members List */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[8px] font-mono text-[#FF8A1F] uppercase font-bold block">Registered Team Roll</span>
                            <div className="flex flex-wrap gap-1.5">
                              {reg.members.map((member, idx) => (
                                <span 
                                  key={idx}
                                  className={`text-[10px] font-sans font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                                    idx === 0 
                                      ? 'bg-zinc-900 text-white font-extrabold' 
                                      : 'bg-zinc-100 text-zinc-650'
                                  }`}
                                >
                                  {idx === 0 ? '👑 Leader: ' : '• '} {member}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Status timeline tracker and manual sandbox tool for convenience */}
                        <div className="lg:w-80 flex flex-col justify-between p-5 bg-[#FAF9F5] rounded-2xl border border-black/[0.02] gap-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold">LOBBY STATUS</span>
                              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-black tracking-wide ${styles.pill}`}>
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${styles.indicator}`} />
                                {reg.paymentStatus}
                              </span>
                            </div>

                            {/* Status tracker visual sequence */}
                            <div className="grid grid-cols-3 gap-1 relative text-[9px] font-mono text-center font-bold text-zinc-400">
                              <div className="space-y-1">
                                <div className={`h-1 rounded-full ${reg.paymentStatus !== 'Rejected' ? 'bg-[#FF8A1F]' : 'bg-red-400'}`} />
                                <span className={reg.paymentStatus !== 'Rejected' ? 'text-zinc-800' : ''}>1. Registered</span>
                              </div>
                              <div className="space-y-1">
                                <div className={`h-1 rounded-full ${['Technical Review', 'Approved'].includes(reg.paymentStatus) ? 'bg-[#FF8A1F]' : 'bg-zinc-200'}`} />
                                <span className={['Technical Review', 'Approved'].includes(reg.paymentStatus) ? 'text-zinc-800' : ''}>2. Review</span>
                              </div>
                              <div className="space-y-1">
                                <div className={`h-1 rounded-full ${reg.paymentStatus === 'Approved' ? 'bg-[#FF8A1F]' : 'bg-zinc-200'}`} />
                                <span className={reg.paymentStatus === 'Approved' ? 'text-zinc-800' : ''}>3. Confirmed</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-zinc-200/50">
                            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans">
                              <span>Competition Code Cost:</span>
                              <span className="font-mono font-bold text-zinc-900">{comp?.feeIDRText || 'Rp250.000'}</span>
                            </div>
                            
                            {/* Interactive simulation helper to approve / test immediately */}
                            {reg.paymentStatus !== 'Approved' ? (
                              <button
                                onClick={() => updateStatus(reg.id, 'Approved')}
                                className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-sans text-[10px] font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition flex items-center justify-center gap-1 shadow-sm"
                              >
                                <UserCheck className="w-3.5 h-3.5 text-white" />
                                Confirm Simulated Payment
                              </button>
                            ) : (
                              <div className="text-[10px] font-sans font-semibold text-emerald-800 bg-emerald-50/60 p-2 rounded-xl border border-emerald-100 text-center flex items-center justify-center gap-1 mt-1">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                Validated • FSI Certification Endorsed
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 5. GLOBAL REGISTERED TEAMS TAB */}
          {dbTab === 'all-registrations' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-black/[0.04] overflow-hidden shadow-sm">
                <div className="p-6 bg-zinc-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-sans font-black text-base sm:text-lg">Global Competitive Entries Directory</h3>
                    <p className="text-zinc-400 text-xs mt-0.5">Vetted team logs mapping academic institutions or international research lines.</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/10 text-gold border border-white/10 px-3 py-1 rounded-full font-black">
                    {registrations.length} Teams Registered
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans" id="minimal-global-table">
                    <thead>
                      <tr className="bg-[#FAF9F5]/80 border-b border-zinc-200/50 text-[10px] font-mono uppercase text-zinc-400 font-extrabold tracking-wider">
                        <th className="px-6 py-4">Reg ID</th>
                        <th className="px-6 py-4">Institution / Academy</th>
                        <th className="px-6 py-4">Team Coordinates</th>
                        <th className="px-6 py-4">Category Track</th>
                        <th className="px-6 py-4 text-center">Payment Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-150">
                      {registrations.map((item) => {
                        const comp = getCompetitionData(item.competitionId);
                        const styles = getStatusStyle(item.paymentStatus);
                        return (
                          <tr key={item.id} className="hover:bg-[#FAF9F5]/30 transition">
                            <td className="px-6 py-4 font-mono font-bold text-royal">{item.id}</td>
                            <td className="px-6 py-4 font-bold text-zinc-800">{item.institution}</td>
                            <td className="px-6 py-4">
                              <span className="font-sans font-extrabold text-zinc-900 block">{item.teamName}</span>
                              <span className="text-[11px] text-zinc-402 block mt-0.5">Lead: {item.teamLeader}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-zinc-100 rounded text-zinc-640 font-mono text-[10px] font-bold border border-zinc-200">
                                {comp?.name || item.competitionId}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono uppercase font-black ${styles.pill}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${styles.indicator}`} />
                                {item.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};
