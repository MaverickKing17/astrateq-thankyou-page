/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, Edit2, ShieldAlert, BadgeInfo, Save, Sliders, ChevronDown, RefreshCw, Camera
} from 'lucide-react';
import { ReservationDetails } from '../types';
import QrScanner from './QrScanner';

interface SummaryCardProps {
  details: ReservationDetails;
  onUpdateDetails: (newDetails: Partial<ReservationDetails>) => void;
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function SummaryCard({ details, onUpdateDetails, onLogEvent }: SummaryCardProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showRegionTooltip, setShowRegionTooltip] = useState(false);
  const [showSuccessCheck, setShowSuccessCheck] = useState(false);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Form local state
  const [emailInput, setEmailInput] = useState(details.email);
  const [yearInput, setYearInput] = useState(details.vehicleYear);
  const [makeInput, setMakeInput] = useState(details.vehicleMake);
  const [modelInput, setModelInput] = useState(details.vehicleModel);
  const [resIdInput, setResIdInput] = useState(details.reservationId);

  const triggerSuccessAnimation = () => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }
    // Briefly reset to false to restart the draw animation if triggered repeatedly
    setShowSuccessCheck(false);
    setTimeout(() => {
      setShowSuccessCheck(true);
      successTimeoutRef.current = setTimeout(() => {
        setShowSuccessCheck(false);
      }, 4000);
    }, 50);
  };

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
    triggerSuccessAnimation();
    onLogEvent('reservation_confirmed_view', { 
      action: 'update_reservation_details',
      vehicle: `${yearInput} ${makeInput} ${modelInput}`,
      email: emailInput
    });
  };

  const handleScanSuccess = (data: { id: string; email?: string; year?: string; make?: string; model?: string }) => {
    setResIdInput(data.id);
    if (data.email) setEmailInput(data.email);
    if (data.year) setYearInput(data.year);
    if (data.make) setMakeInput(data.make);
    if (data.model) setModelInput(data.model);

    onUpdateDetails({
      reservationId: data.id,
      ...(data.email && { email: data.email }),
      ...(data.year && { vehicleYear: data.year }),
      ...(data.make && { vehicleMake: data.make }),
      ...(data.model && { vehicleModel: data.model }),
    });

    setShowScanner(false);
    triggerSuccessAnimation();

    onLogEvent('reservation_confirmed_view', {
      action: 'qr_scanner_success',
      scannedId: data.id,
      scannedEmail: data.email || details.email
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

    triggerSuccessAnimation();

    onLogEvent('reservation_confirmed_view', {
      action: 'applied_preset',
      presetType: preset,
      vehicle: `${choice.year} ${choice.make} ${choice.model}`
    });
  };

  return (
    <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto w-full" id="reservation-summary">
      <div className="rounded-2xl bg-gradient-to-r from-astrateq-cyan/35 via-astrateq-blue/25 to-emerald-500/30 p-[1.5px] shadow-[0_0_30px_rgba(34,211,238,0.12)] hover:shadow-[0_0_40px_rgba(34,211,238,0.22)] transition-all duration-500">
        <div className="rounded-[15px] bg-astrateq-card p-6 lg:p-8 space-y-6 relative overflow-hidden">
        
        {/* Visual Ambient Grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.02),transparent)] pointer-events-none"></div>

        {/* Header Section with Toggle Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center space-x-3">
            <Sliders className="w-5 h-5 text-astrateq-cyan" />
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-200 font-bold block">
                YOUR STATUS DETAILS
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Vehicle Priority Reservation Summary
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!showScanner ? (
              <button
                onClick={() => {
                  setShowScanner(true);
                  setIsEditing(false);
                  onLogEvent('reservation_confirmed_view', { action: 'open_qr_scanner' });
                }}
                className="flex items-center space-x-1.5 text-xs text-white hover:text-astrateq-cyan font-medium transition-all bg-white/5 hover:bg-white/10 border border-white/5 px-3.5 py-1.5 rounded-lg group"
                id="btn-scan-qr"
              >
                <Camera className="w-3.5 h-3.5 group-hover:scale-105 transition-all text-astrateq-cyan" />
                <span>Scan QR Code</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowScanner(false);
                  onLogEvent('reservation_confirmed_view', { action: 'close_qr_scanner' });
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-all border border-red-500/10 hover:border-red-500/20 bg-red-950/20 px-3.5 py-1.5 rounded-lg"
                id="btn-cancel-scan"
              >
                Close Scanner
              </button>
            )}

            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowScanner(false);
                }}
                className="flex items-center space-x-1.5 text-xs text-white hover:text-white font-medium transition-all bg-white/5 hover:bg-white/10 border border-white/5 px-3.5 py-1.5 rounded-lg group"
                id="btn-edit-reservation"
              >
                <Edit2 className="w-3.5 h-3.5 group-hover:scale-105 transition-all text-astrateq-cyan" />
                <span>Customize Details</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setShowScanner(false);
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-all border border-red-500/10 hover:border-red-500/20 bg-red-950/20 px-3.5 py-1.5 rounded-lg"
                id="btn-cancel-edit"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Success Validation Notification Banner with Animated Check-mark */}
        <AnimatePresence>
          {showSuccessCheck && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-emerald-400"
                  >
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Reservation Details Synced
                  </h4>
                  <p className="text-[11px] text-white/90 font-medium font-sans mt-0.5 leading-normal">
                    Your early access priority queue assignment was successfully validated & updated on-device.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 pl-3">
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-extrabold uppercase bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                  Active Security
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optical QR Scanner Panel */}
        <AnimatePresence mode="wait">
          {showScanner && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-4"
            >
              <QrScanner 
                onScanSuccess={handleScanSuccess} 
                onClose={() => setShowScanner(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

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
                <span className="text-xs font-mono text-white font-semibold">Quick Sandbox Presets:</span>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => handleResetToPreset('tesla')}
                    className="text-[10px] bg-white/5 border border-white/5 text-white hover:text-astrateq-cyan px-2.5 py-1 rounded hover:border-astrateq-cyan/30 transition-all font-medium"
                  >
                    Tesla Model Y
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleResetToPreset('toyota')}
                    className="text-[10px] bg-white/5 border border-white/5 text-white hover:text-astrateq-cyan px-2.5 py-1 rounded hover:border-astrateq-cyan/30 transition-all font-medium"
                  >
                    Toyota RAV4 Prime
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleResetToPreset('ford')}
                    className="text-[10px] bg-white/5 border border-white/5 text-white hover:text-astrateq-cyan px-2.5 py-1 rounded hover:border-astrateq-cyan/30 transition-all font-medium"
                  >
                    F-150 Lightning
                  </button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-100 mb-1.5 font-bold">Reservation ID</label>
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
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-100 mb-1.5 font-bold">Customer Email</label>
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
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-100 mb-1.5 font-bold">Vehicle Year</label>
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
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-100 mb-1.5 font-bold">Vehicle Make</label>
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
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-100 mb-1.5 font-bold">Vehicle Model</label>
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
                  className="text-xs text-white hover:text-slate-100 font-bold px-4 py-2"
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
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-200 font-bold block mb-1">
              Reservation ID
            </span>
            <div className="flex items-center space-x-2 mt-auto">
              <span className="text-white text-xs lg:text-sm font-bold font-mono truncate">
                {details.reservationId}
              </span>
              <button 
                onClick={handleCopyId}
                className="p-1.5 rounded-md hover:bg-slate-900 border border-transparent hover:border-white/5 text-white hover:text-astrateq-cyan transition-all"
                title="Copy Reservation ID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Customer Email */}
          <div className="sm:col-span-6 md:col-span-3 border-r border-white/5 pr-2 lg:pr-4 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-200 font-bold block mb-1">
              Email Address
            </span>
            <span className="text-white text-xs lg:text-sm font-semibold font-sans truncate mt-auto">
              {details.email}
            </span>
          </div>

          {/* Vehicle */}
          <div className="sm:col-span-6 md:col-span-3 border-r border-white/5 pr-2 lg:pr-4 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-200 font-bold block mb-1">
              Vehicle Configured
            </span>
            <span className="text-white text-xs lg:text-sm font-bold font-sans mt-auto leading-none truncate">
              {details.vehicleYear} {details.vehicleMake} {details.vehicleModel}
            </span>
          </div>

          {/* Region */}
          <div className="sm:col-span-6 md:col-span-2 border-r border-white/5 pr-2 lg:pr-4 relative flex flex-col justify-between h-full min-h-[50px]">
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-200 font-bold">
                Canada Region
              </span>
              <button 
                onMouseEnter={() => setShowRegionTooltip(true)}
                onMouseLeave={() => setShowRegionTooltip(false)}
                className="text-white hover:text-slate-200 font-mono"
              >
                <BadgeInfo className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center space-x-1.5 mt-auto">
              <span className="text-white text-xs lg:text-sm font-bold font-mono">
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
                  className="absolute bottom-12 left-0 w-52 bg-slate-950 border border-white/5 p-3 rounded-lg shadow-xl text-[10px] text-white font-sans leading-relaxed z-40 card-blur font-medium"
                >
                  Authorized Canadian Deployment. Built fully to withstand winter temperature cycles (-40°C).
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Release Batch */}
          <div className="sm:col-span-6 md:col-span-2 border-r border-white/5 pr-2 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-200 font-bold block mb-1">
              Production Batch
            </span>
            <span className="text-astrateq-cyan text-xs lg:text-sm font-extrabold font-mono uppercase mt-auto">
              {details.batch}
            </span>
          </div>

          {/* Deposit Security */}
          <div className="sm:col-span-6 md:col-span-1 flex flex-col justify-between h-full min-h-[50px]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-200 font-bold block mb-1">
              Deposit Risk
            </span>
            <span className="text-emerald-400 text-xs lg:text-sm font-mono font-extrabold mt-auto whitespace-nowrap">
              {details.deposit}
            </span>
          </div>

        </div>

        {/* Global Security / Integrity Note */}
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start space-x-3 mt-4">
          <ShieldAlert className="w-4 h-4 text-astrateq-cyan flex-shrink-0 mt-0.5" />
          <div className="text-[11.5px] text-white leading-relaxed font-sans">
            <span className="text-white font-bold">Zero Cloud Architecture Mandate:</span> All dashcam feeds, diagnostic signals, and cabin parameters generated by the <span className="text-astrateq-cyan font-bold">Astrateq Edge Sentinel Bundle</span> are calculated instantly inside the on-board computer. No logs are ever shipped to servers. Total privacy securement.
          </div>
        </div>

      </div>
    </div>
  </section>
  );
}
