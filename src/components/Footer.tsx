/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PolicyTab } from './InfoHubModal';

interface FooterProps {
  onOpenInfoHub: (tab: PolicyTab) => void;
}

export default function Footer({ onOpenInfoHub }: FooterProps) {
  return (
    <footer className="w-full bg-astrateq-dark/80 border-t border-white/5 py-10 px-4 md:px-8 mt-12 backdrop-blur-md" id="astrateq-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Branding & description block */}
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-black/20 shadow-[0_0_10px_rgba(34,211,238,0.15)] flex-shrink-0">
              <img 
                src="https://i.ibb.co/4g7ffGv4/Gemini-Generated-Image-pta8i9pta8i9pta8.png" 
                alt="Astrateq Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold tracking-wider font-display uppercase text-white hover:text-white transition-all text-sm">
              ASTRATEQ <span className="text-astrateq-cyan">GADGETS</span>
            </span>
          </div>
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#64748b]">
            Drive Safer. Drive Smarter.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed pt-1">
            Privacy-first automotive computing built to survive brutal freeze cycles, empowering drivers with localized onboard intelligence.
          </p>
        </div>

        {/* Links stack */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-400 font-medium">
          <button onClick={() => onOpenInfoHub('privacy')} className="hover:text-white transition-all focus:outline-none cursor-pointer">Privacy Policy</button>
          <button onClick={() => onOpenInfoHub('terms')} className="hover:text-white transition-all focus:outline-none cursor-pointer">Terms of Service</button>
          <button onClick={() => onOpenInfoHub('contact')} className="hover:text-white transition-all focus:outline-none cursor-pointer">Contact Us</button>
          <button onClick={() => onOpenInfoHub('faq')} className="hover:text-white transition-all focus:outline-none cursor-pointer">FAQ / Troubleshooting</button>
        </div>
      </div>

      {/* Under-footer disclosure segment */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center space-x-2 text-center sm:text-left">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span>© 2026 Astrateq Gadgets Inc. All rights reserved. Registered Canadian validation entity.</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>Built in Canada</span>
          <span className="text-xs" role="img" aria-label="Canadian Flag">🇨🇦</span>
        </div>
      </div>
    </footer>
  );
}
