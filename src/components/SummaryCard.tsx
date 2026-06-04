/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, Edit2, ShieldAlert, BadgeInfo, Save, Sliders, ChevronDown, RefreshCw 
} from 'lucide-react';
import { ReservationDetails } from '../types';

interface SummaryCardProps {
  details: ReservationDetails;
  onUpdateDetails: (newDetails: Partial<ReservationDetails>) => void;
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function SummaryCard({ details, onUpdateDetails, onLogEvent }: SummaryCardProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showRegionTooltip, setShowRegionTooltip] = useState(false);

  // Form local state
  const [emailInput, setEmailInput] = useState(details.email);
  const [yearInput, setYearInput] = useState(details.vehicleYear);
  const [makeInput, setMakeInput] = useState(details.vehicleMake);
  const [modelInput, setModelInput] = useState(details.vehicleModel);
  const [resIdInput, setResIdInput] = useState(details.reservationId);

  const handleCopyId = () => {
    navigator.clipboard.writeText(details.reservationId);
    setCopiedId(true);
    onLogEvent('share_clicked', { action: 'copy_reservation_id', value: details.reservationId });
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDetails({
      email: emailInput,
      vehicleYear: yearInput,
      vehicleMake: makeInput,
      vehicleModel: modelInput,
      reservationId: resIdInput
    });
    setIsEditing(false);
    onLogEvent('reservation_confirmed_view', { 
      action: 'update_reservation_details',
      vehicle: `${yearInput} ${makeInput} ${modelInput}`,
      email: emailInput
    });
  };

  const handleResetToPreset = (preset: 'tesla' | 'toyota' | 'ford') => {
    const presets = {
      tesla: {
        year: '2024',
        make: 'Tesla',
        model: 'Model Y AWD',
        id: '#AST-9Y3K-8W12'
      },
      toyota: {
        year: '2023',
        make: 'Toyota',
        model: 'RAV4 Prime',
        id: '#AST-7X2K-9E84'
      },
      ford: {
        year: '2022',
        make: 'Ford',
        model: 'F-150 Lightning',
        id: '#AST-2N5A-3V98'
      }
    };

    const choice = presets[preset];
    setEmailInput('kingnarmer702@gmail.com');
    setYearInput(choice.year);
    setMakeInput(choice.make);
    setModelInput(choice.model);
    setResIdInput(choice.id);

    onUpdateDetails({
      email: 'kingnarmer702@gmail.com',
      vehicleYear: choice.year,
      vehicleMake: choice.make,
      vehicleModel: choice.model,
      reservationId: choice.id
    });

    onLogEvent('reservation_confirmed_view', {
      action: 'applied_preset',
      presetType: preset,
      vehicle: `${choice.year} ${choice.make} ${choice.model}`
    });
  };

  return (
    <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto w-full" id="reservation-summary">
      <div className="rounded-2xl border border-white/5 bg-astrateq-card p-6 lg:p-8 space-y-6 relative overflow-hidden">
        
        {/* Visual Ambient Grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.02),transparent)] pointer-events-none"></div>

        {/* Header Section with Toggle Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center space-x-3">
            <Sliders className="w-5 h-5 text-astrateq-cyan" />
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold block">
                YOUR STATUS DETAILS
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Vehicle Priority Reservation Summary
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 border border-white/5 px-3.5 py-1.5 rounded-lg group"
                id="btn-edit-reservation"
              >
                <Edit2 className="w-3.5 h-3.5 group-hover:scale-105 transition-all text-astrateq-cyan" />
                <span>Customize Details</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-red-400 hover:text-red-300 transition-all border border-red-500/10 hover:border-red-500/20 bg-red-950/20 px-3.5 py-1.5 rounded-lg"
                id="btn-cancel-edit"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Editing Panel (AnimatePresence) */}
        <AnimatePresence mode="wait">
          {isEditing && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSave}
              className="bg-black/45 p-5 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 overflow-hidden"
              id="reservation-edit-form"
            >
              <div className="md:col-span-12 flex flex-wrap gap-2 items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-mono text-slate-400">Quick Sandbox Presets:</span>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => handleResetToPreset('tesla')}
                    className="text-[10px] bg-white/5 border border-white/5 text-slate-300 hover:text-white px-2.5 py-1 rounded hover:border-astrateq-cyan/30 transition-all"
                  >
                    Tesla Model Y
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleResetToPreset('toyota')}
                    className="text-[10px] bg-white/5 border border-white/5 text-slate-300 hover:text-white px-2.5 py-1 rounded hover:border-astrateq-cyan/30 transition-all"
                  >
                    Toyota RAV4 Prime
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleResetToPreset('ford')}
                    className="text-[10px] bg-white/5 border border-white/5 text-slate-300 hover:text-white px-2.5 py-1 rounded hover:border-astrateq-cyan/30 transition-all"
                  >
                    F-150 Lightning
                  </button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5 font-bold">Reservation ID</label>
                <input 
                  type="text" 
                  value={resIdInput}
                  onChange={(e) => setResIdInput(e.target.value)}
                  className="w-full text-xs bg-black/40 border border-white/5 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-astrateq-cyan"
                  placeholder="#AST-7X2K-9E84"
                  required
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5 font-bold">Customer Email</label>
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs bg-black/40 border border-white/5 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-astrateq-cyan"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5 font-bold">Vehicle Year</label>
                <input 
                  type="text" 
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="w-full text-xs bg-black/40 border border-white/5 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-astrateq-cyan"
                  placeholder="2023"
                  required
                />
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5 font-bold">Vehicle Make</label>
                <input 
                  type="text" 
                  value={makeInput}
                  onChange={(e) => setMakeInput(e.target.value)}
                  className="w-full text-xs bg-black/40 border border-white/5 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-astrateq-cyan"
                  placeholder="Toyota"
                  required
                />
              </div>

              <div className="col-span-12 md:col-span-2">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5 font-bold">Vehicle Model</label>
                <input 
                  type="text" 
                  value={modelInput}
                  onChange={(e) => setModelInput(e.target.value)}
                  className="w-full text-xs bg-black/40 border border-white/5 text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-astrateq-cyan"
                  placeholder="RAV4 Hybrid"
                  required
                />
              </div>

              <div className="col-span-12 flex justify-end items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-slate-300 font-medium px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-astrateq-cyan text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center space-x-1.5 transition-all"
                  id="btn-save-reservation"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Structured Grid Layout of Summary Details */}
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-14 gap-y-6 gap-x-4">
          
          {/* Reservation ID */}
          <div className="sm:col-span-6 md:col-span-3 border-r border-white/5 pr-2 lg:pr-4 group flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
              Reservation ID
            </span>
            <div className="flex items-center space-x-2 mt-auto">
              <span className="text-white text-xs lg:text-sm font-bold font-mono truncate">
                {details.reservationId}
              </span>
              <button 
                onClick={handleCopyId}
                className="p-1.5 rounded-md hover:bg-slate-900 border border-transparent hover:border-white/5 text-slate-400 hover:text-astrateq-cyan transition-all"
                title="Copy Reservation ID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Customer Email */}
          <div className="sm:col-span-6 md:col-span-3 border-r border-white/5 pr-2 lg:pr-4 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
              Email Address
            </span>
            <span className="text-slate-300 text-xs lg:text-sm font-medium font-sans truncate mt-auto">
              {details.email}
            </span>
          </div>

          {/* Vehicle */}
          <div className="sm:col-span-6 md:col-span-3 border-r border-white/5 pr-2 lg:pr-4 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
              Vehicle Configured
            </span>
            <span className="text-slate-200 text-xs lg:text-sm font-bold font-sans mt-auto leading-none truncate">
              {details.vehicleYear} {details.vehicleMake} {details.vehicleModel}
            </span>
          </div>

          {/* Region */}
          <div className="sm:col-span-6 md:col-span-2 border-r border-white/5 pr-2 lg:pr-4 relative flex flex-col justify-between h-full min-h-[50px]">
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">
                Canada Region
              </span>
              <button 
                onMouseEnter={() => setShowRegionTooltip(true)}
                onMouseLeave={() => setShowRegionTooltip(false)}
                className="text-slate-600 hover:text-slate-400 font-mono"
              >
                <BadgeInfo className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center space-x-1.5 mt-auto">
              <span className="text-slate-200 text-xs lg:text-sm font-semibold font-mono">
                {details.region}
              </span>
              <span className="text-xs" role="img" aria-label="Canadian Flag">🇨🇦</span>
            </div>

            {/* Region Details Hover Popover */}
            <AnimatePresence>
              {showRegionTooltip && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-12 left-0 w-52 bg-slate-950 border border-white/5 p-3 rounded-lg shadow-xl text-[10px] text-slate-300 font-sans leading-relaxed z-40 card-blur"
                >
                  Authorized Canadian Deployment. Built fully to withstand winter temperature cycles (-40°C).
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Release Batch */}
          <div className="sm:col-span-6 md:col-span-2 border-r border-white/5 pr-2 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
              Production Batch
            </span>
            <span className="text-astrateq-cyan text-xs lg:text-sm font-bold font-mono uppercase mt-auto">
              {details.batch}
            </span>
          </div>

          {/* Deposit Security */}
          <div className="sm:col-span-6 md:col-span-1 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">
              Deposit Risk
            </span>
            <span className="text-emerald-400 text-xs lg:text-sm font-mono font-bold mt-auto whitespace-nowrap">
              {details.deposit}
            </span>
          </div>

        </div>

        {/* Global Security / Integrity Note */}
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start space-x-3 mt-4">
          <ShieldAlert className="w-4 h-4 text-astrateq-cyan flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
            <span className="text-white font-semibold">Zero Cloud Architecture Mandate:</span> All dashcam feeds, diagnostic signals, and cabin parameters generated by the <span className="text-astrateq-cyan font-semibold">Astrateq Edge Sentinel Bundle</span> are calculated instantly inside the on-board computer. No logs are ever shipped to servers. Total privacy securement.
          </div>
        </div>

      </div>
    </section>
  );
}
