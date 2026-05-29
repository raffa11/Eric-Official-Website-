/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RegistrationProvider, useRegistrations } from './context/RegistrationContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompetitionSelector } from './components/CompetitionSelector';
import { AuthModal } from './components/AuthModal';
import { RegistrationForm } from './components/RegistrationForm';
import { PaymentDemo } from './components/PaymentDemo';
import { SuccessPopup } from './components/SuccessPopup';
import { Dashboard } from './components/Dashboard';
import { ElementorGenerator } from './components/ElementorGenerator';
import { AboutSection, ObjectivesSection, RulesSection, FeesSection, TimelineSection, AwardsSection } from './components/AboutAndRules';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import { OFFICIAL_COMPETITIONS } from './utils/mockData';
import { Competition } from './types';
import { 
  Compass, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Trophy, 
  ChevronRight, 
  Zap, 
  Award,
  AlertCircle,
  X
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { currentRegistration, setCurrentRegistration } = useRegistrations();

  const [activeTab, setActiveTab] = useState<'home' | 'competitions' | 'dashboard' | 'register' | 'elementor'>('home');
  const [selectedCompForReg, setSelectedCompForReg] = useState<Competition | null>(null);
  const [registrationStep, setRegistrationStep] = useState<'choose' | 'form' | 'payment' | 'success'>('choose');

  // Modal spec detail state
  const [inspectingComp, setInspectingComp] = useState<Competition | null>(null);

  // Nav actions
  const handleOpenRegister = () => {
    // Default to AMS track if they just click generic "Register Team"
    setSelectedCompForReg(OFFICIAL_COMPETITIONS[0]);
    setRegistrationStep('form');
    setActiveTab('register');
  };

  const handleRegisterCompetitionTrack = (comp: Competition) => {
    setSelectedCompForReg(comp);
    setRegistrationStep('form');
    setActiveTab('register');
  };

  const handleSelectTrackDetail = (comp: Competition) => {
    setInspectingComp(comp);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] flex flex-col justify-between">
      {/* Universal Fixed Navigation */}
      <Navbar 
        activeTab={activeTab === 'register' ? 'competitions' : activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Reset steps
          if (tab !== 'register') {
            setSelectedCompForReg(null);
            setRegistrationStep('choose');
          }
        }} 
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Core Router View */}
      <main className="flex-grow pt-18">
        
        {/* 1. HOME SCREEN */}
        {activeTab === 'home' && (
          <div className="space-y-24 pb-20">
            <ScrollReveal y={40} duration={0.8}>
              <HeroSection 
                onOpenRegister={handleOpenRegister} 
                onExploreTracks={() => setActiveTab('competitions')}
                setActiveTab={setActiveTab}
              />
            </ScrollReveal>

            {/* About ERIC 2026 Section */}
            <ScrollReveal y={30} duration={0.75}>
              <AboutSection onOpenRegister={handleOpenRegister} />
            </ScrollReveal>

            {/* Official Competitions Track (Placed right below About Section) */}
            <ScrollReveal y={30} duration={0.75}>
              <section className="py-16 bg-[#FAFAF5]" id="home-official-competitions">
                <CompetitionSelector 
                  onSelectCompetition={handleSelectTrackDetail} 
                  onRegisterCompetition={handleRegisterCompetitionTrack}
                />
              </section>
            </ScrollReveal>

            {/* Objectives Section */}
            <ScrollReveal y={30} duration={0.75}>
              <ObjectivesSection />
            </ScrollReveal>

            {/* Registration Categories & Fees Matrix Section */}
            <ScrollReveal y={30} duration={0.75}>
              <FeesSection onOpenRegister={handleOpenRegister} />
            </ScrollReveal>

            {/* Timeline Section */}
            <ScrollReveal y={30} duration={0.75}>
              <TimelineSection />
            </ScrollReveal>

            {/* Prestige Awards Section */}
            <ScrollReveal y={30} duration={0.75}>
              <AwardsSection />
            </ScrollReveal>

            {/* Requirements: General Regulations & Rules (Placed right below Prestige Awards) */}
            <ScrollReveal y={30} duration={0.75}>
              <RulesSection />
            </ScrollReveal>
          </div>
        )}

        {/* 2. COMPETITIONS TRACK DIRECTORY SCREEN */}
        {activeTab === 'competitions' && (
          <ScrollReveal y={30} duration={0.8}>
            <CompetitionSelector 
              onSelectCompetition={handleSelectTrackDetail} 
              onRegisterCompetition={handleRegisterCompetitionTrack}
            />
          </ScrollReveal>
        )}

        {/* 3. SAAS DASHBOARD SCREEN */}
        {activeTab === 'dashboard' && (
          <div className="bg-[#FAFAFA] min-h-screen">
            <ScrollReveal y={30} duration={0.8}>
              <Dashboard />
            </ScrollReveal>
          </div>
        )}

        {/* 4. ACTIVE REGISTER SELECTION SCREEN WIZARD */}
        {activeTab === 'register' && (
          <ScrollReveal y={30} duration={0.8} className="py-10 min-h-[500px]">
            {registrationStep === 'choose' && (
              <div className="text-center py-20 space-y-4">
                <p className="text-sm font-semibold text-zinc-500">Please choose a competition track directory first</p>
                <button 
                  onClick={() => setActiveTab('competitions')}
                  className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold font-sans"
                >
                  Browse Track Codes
                </button>
              </div>
            )}

            {registrationStep === 'form' && selectedCompForReg && (
              <RegistrationForm
                selectedCompetition={selectedCompForReg}
                onCancel={() => {
                  setSelectedCompForReg(null);
                  setActiveTab('competitions');
                }}
                onSubmitSuccess={() => {
                  setRegistrationStep('payment');
                }}
              />
            )}

            {registrationStep === 'payment' && selectedCompForReg && currentRegistration && (
              <PaymentDemo
                registration={currentRegistration}
                competition={selectedCompForReg}
                onCancel={() => {
                  setRegistrationStep('form');
                }}
                onSuccess={() => {
                  setRegistrationStep('success');
                }}
              />
            )}

            {registrationStep === 'success' && selectedCompForReg && currentRegistration && (
              <SuccessPopup
                registration={currentRegistration}
                competition={selectedCompForReg}
                onGoToDashboard={() => {
                  // Clean dynamic checkout parameters
                  setSelectedCompForReg(null);
                  setRegistrationStep('choose');
                  // Move views
                  setActiveTab('dashboard');
                }}
              />
            )}
          </ScrollReveal>
        )}

        {/* 5. ELEMENTOR WIDGET GENERATOR SCREEN */}
        {activeTab === 'elementor' && (
          <div className="animate-fade-in">
            <ElementorGenerator />
          </div>
        )}

      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab !== 'register') {
          setSelectedCompForReg(null);
          setRegistrationStep('choose');
        }
      }} />

      {/* Interactive Global Popups */}
      <AuthModal />

      {/* Dynamic Competition Inspection spec overlay drawer modal */}
      {inspectingComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/[0.04] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)] space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-black text-royal tracking-wider">
                  SPEC CATALOGUE // TRACK: {inspectingComp.id}
                </span>
                <h3 className="font-sans font-black text-2xl text-zinc-900 mt-0.5">{inspectingComp.name}</h3>
                <p className="text-zinc-400 font-sans italic font-semibold text-xs">{inspectingComp.tagline}</p>
              </div>
              <button
                onClick={() => setInspectingComp(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-650 hover:bg-zinc-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description list */}
            <div className="space-y-5 text-sm font-sans leading-relaxed text-zinc-650">
              <div className="space-y-1.5">
                <span className="block text-[9px] font-mono tracking-widest uppercase font-bold text-zinc-400">Core Tournament Directives</span>
                <p className="text-xs leading-relaxed text-zinc-500">{inspectingComp.longDesc}</p>
              </div>

              {/* Specs */}
              <div className="space-y-2">
                <span className="block text-[9px] font-mono tracking-widest uppercase font-bold text-zinc-400">Auditing Parameters</span>
                {inspectingComp.techRequirements.map((req, i) => (
                  <div key={i} className="flex gap-2.5 items-start text-xs text-zinc-600 bg-zinc-50 px-3.5 py-2.5 rounded-xl border border-zinc-200/50">
                    <span className="text-gold font-bold shrink-0">✓</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <span className="block text-[9px] font-mono tracking-widest uppercase font-bold text-zinc-400">Chronological Milestones</span>
                <div className="grid grid-cols-3 gap-2">
                  {inspectingComp.timeline.map((item, idx) => (
                    <div key={idx} className="bg-zinc-50/50 border border-zinc-150 p-3 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-zinc-400 uppercase font-black">{item.step}</span>
                      <span className="block text-xs font-bold text-zinc-800 mt-1">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer inside Inspecting modal */}
            <div className="flex items-center justify-between gap-4 pt-5 border-t border-zinc-100">
              <div className="font-mono text-xs text-zinc-500 font-bold">
                Fee: <span className="text-zinc-900 font-black">${inspectingComp.feeUSD} USD</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setInspectingComp(null)}
                  className="bg-white border border-zinc-200/75 hover:bg-zinc-50 text-zinc-700 font-semibold px-4.5 py-2.5 rounded-xl text-xs transition font-sans"
                >
                  Dismiss Specs
                </button>
                <button
                  onClick={() => {
                    setInspectingComp(null);
                    handleRegisterCompetitionTrack(inspectingComp);
                  }}
                  className="bg-gradient-to-r from-royal to-cobalt hover:from-royal/90 hover:to-cobalt/90 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition font-sans"
                >
                  Register Team
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <AppContent />
      </RegistrationProvider>
    </AuthProvider>
  );
}
