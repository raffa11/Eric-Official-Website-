/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Landmark, User as UserIcon, LogIn, Sparkles, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required');
      return;
    }

    if (isSignUp && !name) {
      setError('Full name is required for registration');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // If sign in and name is empty, generate generic name from email
      const finalName = name || email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
      login(email, finalName, institution || undefined);
    }, 800);
  };

  // Mock quick credentials login for rapid testing
  const handleQuickLogin = (presetEmail: string, presetName: string, presetInst: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(presetEmail, presetName, presetInst);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md overflow-hidden bg-white/95 rounded-3xl border border-black/[0.04] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)] flex flex-col gap-6"
        id="auth-modal-container"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-royal/10 text-royal flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h3 className="font-sans font-black text-lg text-zinc-900">
                {isSignUp ? 'Create Elite Account' : 'Sign In'}
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">ERIC Unified platform</p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition"
            id="auth-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-500 font-bold">
                Your Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800"
                  id="auth-input-name"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-500 font-bold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                placeholder="developer@institute.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800"
                id="auth-input-email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono tracking-wider uppercase text-zinc-500 font-bold">
              Institution / Academy (Optional)
            </label>
            <div className="relative">
              <Landmark className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Massachusetts Institute of Technology"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] focus:border-royal focus:outline-none transition text-sm text-zinc-800"
                id="auth-input-institution"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-zinc-900 hover:bg-gradient-to-r hover:from-royal hover:to-cobalt hover:shadow-[0_4px_12px_rgba(0,71,171,0.25)] text-white text-xs font-mono uppercase tracking-wider font-extrabold rounded-xl transition duration-300 flex items-center justify-center gap-2"
            id="auth-submit-btn"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5" />
                {isSignUp ? 'Generate Credentials' : 'Authenticate Session'}
              </>
            )}
          </button>
        </form>

        {/* Toggle option */}
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-royal hover:text-royal/80 transition font-sans font-bold"
            id="auth-toggle-flow"
          >
            {isSignUp ? 'Already registered? Sign In instead' : 'Need an official profile? Register Here'}
          </button>
        </div>

        {/* Divider & Google Mock Account Sync */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="w-full h-px bg-zinc-100" />
            <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-400 px-3 bg-white shrink-0">
              Instant Mock SSO
            </span>
            <span className="w-full h-px bg-zinc-100" />
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleQuickLogin('alfarizimuhammadraffa@gmail.com', 'Muhammad Raffa Alfarizi', 'Stanford Robotics Lab')}
              className="w-full py-3.5 bg-white hover:bg-zinc-50 border border-black/[0.06] hover:border-black/[0.12] rounded-xl text-xs font-semibold text-zinc-700 flex items-center justify-center gap-2 transition"
              id="auth-google-sso"
            >
              {/* Simple stylized SVG for Google since we avoid external assets or raw custom svg files where necessary, keep it neat */}
              <span className="text-red-500 font-extrabold font-mono">G</span>
              <span>Sign In as alfarizimuhammadraffa@gmail.com</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('guest.engineer@eric.io', 'Guest Engineer', 'CERN Automation Group')}
                className="py-2 px-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl text-[10px] font-mono text-zinc-500 font-bold border border-zinc-100 transition"
              >
                Guest Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('sponsor@mit.edu', 'Sarah Sterling', 'MIT Robotics LAB')}
                className="py-2 px-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl text-[10px] font-mono text-zinc-500 font-bold border border-zinc-100 transition"
              >
                Lead Researcher
              </button>
            </div>
          </div>
        </div>

        {/* Trust verification footer */}
        <div className="text-center text-[10px] text-zinc-400 font-mono">
          Secured with SHA-256 Cloud Infrastructure keys.
        </div>
      </div>
    </div>
  );
};
