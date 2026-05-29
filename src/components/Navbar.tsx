/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogIn, LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react';
import { EricLogo } from './EricLogo';

interface NavbarProps {
  activeTab: 'home' | 'competitions' | 'dashboard' | 'register' | 'elementor';
  setActiveTab: (tab: 'home' | 'competitions' | 'dashboard' | 'register' | 'elementor') => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenRegister }) => {
  const { user, logout, setAuthModalOpen } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <EricLogo className="h-9 w-9" showText={true} />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => { setActiveTab('home'); setIsOpen(false); }}
            className={`font-sans font-medium text-sm transition-all duration-300 relative py-2 ${
              activeTab === 'home' ? 'text-gold font-bold' : 'text-zinc-300 hover:text-white'
            }`}
            id="nav-btn-home"
          >
            Home
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('competitions'); setIsOpen(false); }}
            className={`font-sans font-medium text-sm transition-all duration-300 relative py-2 ${
              activeTab === 'competitions' ? 'text-gold font-bold' : 'text-zinc-300 hover:text-white'
            }`}
            id="nav-btn-competitions"
          >
            Competitions
            {activeTab === 'competitions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }}
            className={`font-sans font-medium text-sm transition-all duration-300 relative py-2 ${
              activeTab === 'dashboard' ? 'text-gold font-bold' : 'text-zinc-300 hover:text-white'
            }`}
            id="nav-btn-dashboard"
          >
            Dashboard
            {activeTab === 'dashboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
            )}
          </button>

        </div>

        {/* CTAs and User Info */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white cursor-pointer hover:bg-zinc-700 transition"
                id="user-badge"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-650 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  {user.name.slice(0, 2)}
                </div>
                <span className="text-xs font-semibold truncate max-w-[120px]">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                id="btn-logout"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium text-xs bg-zinc-85c px-4 py-2 rounded-xl border border-white/5 hover:border-white/10 transition"
              id="btn-login-open"
            >
              <LogIn className="w-3.5 h-3.5 text-gold" />
              Sign In
            </button>
          )}

          <button
            onClick={onOpenRegister}
            className="bg-gradient-to-r from-royal to-cobalt hover:from-royal/90 hover:to-cobalt/90 transition duration-305 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,71,171,0.25)] hover:shadow-[0_6px_20px_rgba(0,71,171,0.35)]"
            id="btn-register-now"
          >
            Register Team
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-bold text-[11px] text-zinc-950 uppercase">
              {user.name.slice(0, 2)}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
            id="nav-mobile-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-zinc-950/95 backdrop-blur-lg px-6 py-6 space-y-4 absolute left-0 right-0 shadow-2xl">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setActiveTab('home'); setIsOpen(false); }}
              className={`text-left font-sans font-medium text-base py-2 border-b border-white/5 ${
                activeTab === 'home' ? 'text-gold font-bold' : 'text-zinc-400'
              }`}
              id="mobile-nav-home"
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('competitions'); setIsOpen(false); }}
              className={`text-left font-sans font-medium text-base py-2 border-b border-white/5 ${
                activeTab === 'competitions' ? 'text-gold font-bold' : 'text-zinc-400'
              }`}
              id="mobile-nav-competitions"
            >
              Competitions
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }}
              className={`text-left font-sans font-medium text-base py-2 border-b border-white/5 ${
                activeTab === 'dashboard' ? 'text-gold font-bold' : 'text-zinc-400'
              }`}
              id="mobile-nav-dashboard"
            >
              Dashboard
            </button>

          </div>

          <div className="pt-4 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-gold uppercase">
                    {user.name.slice(0, 2)}
                  </div>
                  <div>
                    <span className="block font-bold text-xs">{user.name}</span>
                    <span className="block text-[10px] text-zinc-500 truncate max-w-[150px]">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="text-xs font-semibold text-red-400 flex items-center gap-1 bg-red-950/20 px-2 py-1.5 rounded-lg border border-red-900/30"
                  id="mobile-btn-logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthModalOpen(true); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-zinc-300 font-bold text-sm bg-zinc-900 border border-white/5 py-3 rounded-xl hover:bg-zinc-800"
                id="mobile-btn-login"
              >
                <LogIn className="w-4 h-4 text-gold" />
                Sign In
              </button>
            )}

            <button
              onClick={() => { onOpenRegister(); setIsOpen(false); }}
              className="w-full bg-gradient-to-r from-royal to-cobalt text-white font-bold text-sm py-3 rounded-xl shadow-lg transition"
              id="mobile-btn-register"
            >
              Register Team Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
