/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function Header({ onLogEvent }: HeaderProps) {
  const handleBackHome = () => {
    onLogEvent('return_home_clicked', { source: 'header_back_button' });
    alert('Simulating navigation back to AstrateqGadgets.com Home');
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col sm:flex-row items-center justify-between py-6 px-4 md:px-8 bg-astrateq-dark/40 border-b border-astrateq-border/40 backdrop-blur-md sticky top-0 z-50 transition-all duration-300"
      id="astrateq-header"
    >
      {/* Brand Logo & Wordmark */}
      <div className="flex items-center space-x-3 mb-4 sm:mb-0 cursor-pointer group" onClick={handleBackHome}>
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/15 bg-black/40 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:border-astrateq-cyan/40">
          <img 
            src="https://i.ibb.co/4g7ffGv4/Gemini-Generated-Image-pta8i9pta8i9pta8.png" 
            alt="Astrateq Logo" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight font-display text-white uppercase sm:text-lg">
            ASTRATEQ <span className="text-astrateq-cyan">GADGETS</span>
          </span>
          <span className="text-[9px] font-mono tracking-[0.15em] text-slate-500 uppercase font-semibold leading-none mt-0.5">
            Drive Safer. Drive Smarter.
          </span>
        </div>
      </div>

      {/* Badges and Call to Action */}
      <div className="flex items-center space-x-6">
        <div className="px-3 py-1.5 bg-astrateq-cyan/10 border border-astrateq-cyan/30 rounded-full flex items-center space-x-2 shadow-[0_0_12px_rgba(34,211,238,0.1)]">
          <span className="w-2 h-2 bg-astrateq-cyan rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-astrateq-cyan font-mono">
            Priority Access Confirmed
          </span>
        </div>

        <button 
          onClick={handleBackHome}
          className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-opacity flex items-center space-x-1.5 focus:outline-none"
          id="btn-back-home"
        >
          <ArrowLeft className="w-3 h-3 text-astrateq-cyan" />
          <span>Back to Home</span>
        </button>
      </div>
    </motion.header>
  );
}
