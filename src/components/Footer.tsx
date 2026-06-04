/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950/60 border-t border-astrateq-border/40 py-10 px-4 md:px-8 mt-12" id="astrateq-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Branding & description block */}
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center space-x-2">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-4 h-4 text-astrateq-cyan stroke-[2.5]"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="font-bold tracking-wider font-display uppercase text-white hover:text-white transition-all text-sm">
              ASTRATEQ GADGETS
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
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Simulating Privacy Shield policy display.'); }} className="hover:text-white transition-all">Privacy Policy</a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Simulating Terms & Conditions agreement page.'); }} className="hover:text-white transition-all">Terms of Service</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); alert('Simulating contact portal: support@astrateqgadgets.com'); }} className="hover:text-white transition-all">Contact Us</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); alert('Simulating localized FAQ knowledge library.'); }} className="hover:text-white transition-all">FAQ / Troubleshooting</a>
        </div>
      </div>

      {/* Under-footer disclosure segment */}
      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-mono">
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
