/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldAlert, Cpu, HeartHandshake, ShieldCheck } from 'lucide-react';
const productImage = new URL('../assets/images/edge_sentinel_1780609099164.png', import.meta.url).href;

interface HeroProps {
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function HeroSection({ onLogEvent }: HeroProps) {
  // Fire views when mounted
  React.useEffect(() => {
    onLogEvent('thank_you_page_view', { status: 'secured', source: 'hero_mount' });
    onLogEvent('reservation_confirmed_view', { priority: 'batch_1', region: 'Canada' });
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 px-4 md:px-8 max-w-7xl mx-auto" id="astrateq-hero">
      {/* Left Column: Thank You Text / Alert */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="lg:col-span-6 flex flex-col justify-center space-y-6"
      >
        <span className="text-xs uppercase font-mono tracking-widest text-[#2563eb] font-semibold">
          Thank you
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1]">
          Your Priority <br />
          <span className="bg-gradient-to-r from-white via-slate-200 to-astrateq-cyan bg-clip-text text-transparent">
            Reservation Is Secured.
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl leading-relaxed">
          Thank you for joining the first Astrateq Gadgets early access release. Your position has been recorded, and we'll keep you updated as we move toward product release.
        </p>

        {/* Premium Confirmation Alert Block */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="flex items-start space-x-4 bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.03)] card-blur"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-emerald-400 uppercase font-display">
              Reservation Confirmed
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
              You are officially on the priority access list. Your Hardware Balance Credit is ready.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column: Premium High-Trust Interactive Card */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="lg:col-span-6"
      >
        <div className="relative group rounded-3xl bg-gradient-to-b from-astrateq-border/80 to-transparent p-[1.5px] shadow-[0_0_50px_rgba(34,211,238,0.05)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(34,211,238,0.1)]">
          {/* Cyan Glow Lines */}
          <div className="absolute top-0 right-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-astrateq-cyan to-transparent"></div>
          <div className="absolute bottom-0 left-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-astrateq-cyan/40 to-transparent"></div>

          <div className="rounded-[23px] bg-[#070b12] p-6 sm:p-8 space-y-6">
            
            {/* Card Header Info */}
            <div className="flex items-center justify-between border-b border-astrateq-border/40 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 font-semibold">
                  ASTRATEQ
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Edge Sentinel
                </h2>
                <span className="text-xs text-astrateq-cyan font-semibold block mt-0.5 font-mono">
                  OBD-II + Dual Cam Bundle
                </span>
              </div>
              <div className="flex items-center space-x-1.5 bg-astrateq-cyan/10 border border-astrateq-cyan/20 rounded-lg px-2.5 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-astrateq-cyan animate-pulse" />
                <span className="text-[9px] font-mono tracking-wider font-bold text-astrateq-cyan uppercase">
                  AES-256 Encrypted
                </span>
              </div>
            </div>

            {/* Generated Image Asset frame */}
            <div className="relative rounded-2xl border border-astrateq-border/50 bg-black/40 overflow-hidden group/img h-52 flex items-center justify-center">
              {/* Product render from path */}
              <img 
                src={productImage} 
                alt="Astrateq Edge Sentinel - OBD-II and Dual Camera Bundle" 
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover/img:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Tech Spec overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black/60 backdrop-blur-md border border-white/5 py-2 px-3.5 rounded-xl">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-astrateq-cyan mr-1.5 animate-pulse"></span>
                  Ready for Validation
                </span>
                <span className="text-[9px] font-mono font-bold bg-[#1e293b]/50 border border-slate-700 px-2 py-0.5 rounded text-white">
                  v1.2.0-beta
                </span>
              </div>
            </div>

            {/* Tech pillars checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#0b101b] border border-astrateq-border/30 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-astrateq-cyan/20">
                <ShieldCheck className="w-4 h-4 text-astrateq-cyan mb-1.5" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                  100% Local
                </span>
                <span className="text-[8px] text-slate-500 font-mono text-center">
                  Zero Cloud Records
                </span>
              </div>

              <div className="bg-[#0b101b] border border-astrateq-border/30 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-astrateq-cyan/20">
                <Cpu className="w-4 h-4 text-astrateq-cyan mb-1.5" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                  Edge Compute
                </span>
                <span className="text-[8px] text-slate-500 font-mono text-center">
                  Real-Time AI Processing
                </span>
              </div>

              <div className="bg-[#0b101b] border border-astrateq-border/30 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-astrateq-cyan/20">
                <HeartHandshake className="w-4 h-4 text-astrateq-cyan mb-1.5" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                  Privacy-First
                </span>
                <span className="text-[8px] text-slate-500 font-mono text-center">
                  Built In Canada 🇨🇦
                </span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
