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
      <div className="flex items-center space-x-2.5 mb-4 sm:mb-0 cursor-pointer group" onClick={handleBackHome}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-astrateq-cyan via-astrateq-blue to-black p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-105">
          <div className="w-full h-full bg-astrateq-dark rounded-[7px] flex items-center justify-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-5 h-5 text-astrateq-cyan stroke-[2.5]"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-wider font-display text-white uppercase sm:text-lg">
            Astrateq
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#64748b] uppercase font-semibold leading-none">
            Vehicle Intelligence
          </span>
        </div>
      </div>

      {/* Badges and Call to Action */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-astrateq-card border border-astrateq-border px-3.5 py-1.5 rounded-full cyan-badge-glow">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-astrateq-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-astrateq-cyan"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-astrateq-cyan font-mono">
            Priority Access Confirmed
          </span>
        </div>

        <button 
          onClick={handleBackHome}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-medium border border-astrateq-border/80 hover:border-white/20 bg-astrateq-card px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-900 group"
          id="btn-back-home"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </button>
      </div>
    </motion.header>
  );
}
