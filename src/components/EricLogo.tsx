/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface EricLogoProps {
  className?: string;
  showText?: boolean;
}

export const EricLogo: React.FC<EricLogoProps> = ({ className = "h-10 w-10", showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 shrink-0`} id="eric-identity-container">
      <svg
        viewBox="0 0 500 500"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="eric-vector-svg-logo"
      >
        <defs>
          {/* Blue Gradient */}
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0047AB" />
            <stop offset="100%" stopColor="#002D62" />
          </linearGradient>

          {/* Yellow Gradient */}
          <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>

          {/* Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#816223" />
          </linearGradient>

          {/* Silver Gradient */}
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#C0C0C0" />
            <stop offset="100%" stopColor="#505050" />
          </linearGradient>
          
          {/* Dark Metal Shadow Effect */}
          <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="3" stdDeviation="4" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. OUTER DECORATIVE SEMI-CIRCULAR SHIELDS (The multi-colored rings) */}
        {/* Outer Silver Ring */}
        <path
          d="M 450,250 A 200,200 0 1,0 120,410"
          stroke="url(#silverGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        {/* Middle Gold Ring */}
          <path
          d="M 435,250 A 185,185 0 1,0 135,395"
          stroke="url(#goldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner Blue Ring */}
        <path
          d="M 420,250 A 170,170 0 1,0 150,380"
          stroke="url(#blueGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2. THREE CHEVRONS (Fwd Arrows) facing upper-right */}
        <g filter="url(#dropShadow)">
          {/* First Chevron - Gold/Yellow */}
          <path
            d="M 280,110 L 335,110 L 390,230 L 335,340 L 285,340 L 338,230 Z"
            fill="url(#goldGrad)"
          />
          {/* Second Chevron - Silver */}
          <path
            d="M 330,150 L 375,150 L 410,230 L 375,305 L 332,305 L 368,230 Z"
            fill="url(#silverGrad)"
          />
          {/* Third Chevron - Royal/Cobalt Blue */}
          <path
            d="M 370,185 L 405,185 L 425,230 L 405,275 L 372,275 L 392,230 Z"
            fill="url(#blueGrad)"
          />
        </g>

        {/* 3. DETAILED EAGLE HEAD facing left */}
        <g filter="url(#dropShadow)">
          {/* Eagle Base Feather Structure */}
          <path
            d="M 245,390 
               C 230,390 205,385 185,365 
               C 165,345 155,315 155,275 
               C 155,250 162,230 175,210 
               C 188,190 207,175 235,170 
               C 255,165 275,172 290,185 
               C 275,190 250,200 240,215 
               C 230,230 235,245 250,250 
               C 265,255 285,248 295,235 
               C 300,225 302,215 300,205 
               C 310,218 315,235 315,255 
               C 315,295 295,355 245,390 Z"
            fill="url(#silverGrad)"
          />

          {/* Eagle Beak & Sharp Head Contours */}
          <path
            d="M 175,210 
               C 150,215 110,220 90,250 
               C 80,265 78,280 82,295 
               C 86,310 93,315 97,315 
               C 101,315 105,302 110,290 
               C 115,278 128,265 145,260 
               C 160,255 170,260 175,265
               C 170,255 165,245 168,235
               C 171,225 178,215 175,210 Z"
            fill="url(#silverGrad)"
            stroke="#D0D0D0"
            strokeWidth="1.5"
          />

          {/* Eagle Eye */}
          <circle cx="155" cy="225" r="7" fill="#151515" />
          <path d="M 145,218 Q 155,221 165,218" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="153" cy="223" r="2.5" fill="#FFFFFF" />

          {/* Feather Details (overlapping curved cuts) */}
          <path d="M 180,285 Q 210,310 240,300" stroke="#8A8A8A" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 170,320 Q 200,345 230,330" stroke="#8A8A8A" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 195,250 Q 220,268 250,260" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 210,210 Q 235,230 265,220" stroke="#8A8A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
      
      {showText && (
        <div className="flex flex-col text-left font-sans select-none">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black tracking-tighter text-[#002D62] bg-gradient-to-r from-[#0047AB] via-[#C5A059] to-[#002D62] bg-clip-text text-transparent leading-none">
              ERIC
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
