/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Cpu, Database, Eye } from 'lucide-react';
const productImage = new URL('../assets/images/edge_sentinel_1780609099164.png', import.meta.url).href;

interface HeroProps {
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function HeroSection({ onLogEvent }: HeroProps) {
  // Fire portal views when mounted
  React.useEffect(() => {
    onLogEvent('portal_page_view', { status: 'secure_auth', source: 'reports_portal_mount' });
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 px-4 md:px-8 max-w-7xl mx-auto items-center" id="astrateq-hero-section">
      {/* Left Column: Premium Title & Subtitle Branding */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="lg:col-span-7 flex flex-col space-y-5"
      >
        <div className="inline-flex items-center space-x-2 bg-astrateq-cyan/10 border border-astrateq-cyan/25 px-3.5 py-1.5 rounded-full w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-astrateq-cyan animate-pulse"></span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#22d3ee] font-extrabold">
            reports.astrateqgadgets.com (Active Core)
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold tracking-tighter text-white font-display leading-[0.92]">
          Astrateq <span className="text-astrateq-cyan">Reports</span> <br />
          Library
        </h1>
        
        <h2 className="text-lg sm:text-xl font-medium text-slate-300 font-sans tracking-tight max-w-xl">
          Exclusive Resources For Priority Access Members
        </h2>

        <p className="text-[12.5px] text-slate-300 max-w-lg leading-relaxed font-sans font-medium">
          Welcome to your central downloadable hub. As an Astrateq priority member, explore on-device compatibility diagnostics, founding cohort guidance manuals, and hardware build blueprints, compiled natively for secure local deployment.
        </p>

        {/* High-Trust Verification indicator */}
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PIPEDA Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">
            <Cpu className="w-4 h-4 text-astrateq-cyan" />
            <span>On-Device Decoupled Compute</span>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Premium Vehicle Intelligence Imagery Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        className="lg:col-span-5"
      >
        <div className="relative group rounded-3xl bg-gradient-to-r from-astrateq-cyan/40 via-[#2563eb]/40 to-emerald-400/20 p-[1.5px] shadow-[0_0_40px_rgba(34,211,238,0.12)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          
          <div className="rounded-[23px] bg-[#090c17] p-5 sm:p-6 space-y-4">
            
            {/* Embedded Mini Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold block uppercase">
                  HARDWARE ACCELERATION PROFILE
                </span>
                <span className="text-xs text-white font-mono font-bold">
                  Astrateq Sentinel Edge Unit
                </span>
              </div>
              <div className="px-2 py-0.5 rounded border border-[#22d3ee]/20 bg-[#22d3ee]/5 text-[9px] font-mono font-bold text-astrateq-cyan">
                LOCAL AI
              </div>
            </div>

            {/* High fidelity image element with cyan border and glow */}
            <div className="relative rounded-xl border border-white/5 bg-slate-950 overflow-hidden h-44 flex items-center justify-center">
              <img 
                src={productImage} 
                alt="Astrateq Edge Sentinel Premium Vehicle Intel Hardware" 
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center bg-black/70 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-lg">
                <span className="text-[9px] font-mono text-white flex items-center font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-astrateq-cyan mr-1.5 animate-pulse shadow-[0_0_6px_#22d3ee]"></span>
                  DIAGNOSTIC LINK ENGAGED
                </span>
                <span className="text-[8px] font-mono font-bold bg-[#1e293b]/50 border border-slate-700 px-1.5 py-0.5 rounded text-white-400">
                  HW BETA V1.2
                </span>
              </div>
            </div>

            {/* Micro details panel */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="block text-slate-300 font-bold uppercase">CAN BUS READ</span>
                <span className="text-white font-semibold">125 frames/sec</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="block text-slate-300 font-bold uppercase">INFERENCE</span>
                <span className="text-[#22d3ee] font-extrabold">4ms latency</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
