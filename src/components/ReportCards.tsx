/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Download, Calendar, Clock, FileText, CheckCircle2, ChevronRight, Eye, Sparkles, Shield, Cpu, Share2, Mail, ExternalLink, HelpCircle
} from 'lucide-react';
import { ReservationDetails } from '../types';

interface ReportDetails {
  id: string;
  title: string;
  description: string;
  badge: string;
  buttonText: string;
  fileLink: string;
  readTime: string;
  fileSize: string;
  icon: React.ElementType;
  accentClass: string;
  summary: string;
  toc: string[];
}

interface ReportCardsProps {
  details: ReservationDetails;
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
  onShowNotification: (message: string) => void;
}

export default function ReportCards({ details, onLogEvent, onShowNotification }: ReportCardsProps) {
  const [selectedReportId, setSelectedReportId] = useState<string | null>('astrateq-vehicle-intelligence-assessment');
  const [shareInputEmail, setShareInputEmail] = useState(details.email);
  const [shareStatus, setShareStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const reports: ReportDetails[] = [
    {
      id: 'astrateq-vehicle-intelligence-assessment',
      title: 'Astrateq Vehicle Intelligence Assessment',
      description: `Personalized Compatibility & Readiness Evaluation for your ${details.vehicleYear} ${details.vehicleMake} ${details.vehicleModel}`,
      badge: 'Compatibility Assessment',
      buttonText: 'Download Report',
      fileLink: '/reports/Astrateq-Vehicle-Intelligence-Assessment.pdf',
      readTime: '8 min read',
      fileSize: '1.2 MB',
      icon: Cpu,
      accentClass: 'text-astrateq-cyan border-astrateq-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]',
      summary: `A thorough diagnostic audit analyzing parameters of the OBD-II network interface on-device. Evaluates controller area network (CAN) latency, automated pre-warm timing triggers for severe Canadian winter climates, and local visual lane-keeping optimization models tailored specifically to your vehicle configuration.`,
      toc: [
        'Executive Summary & OBD-II Integration Blueprint',
        'CAN-Bus Latency Vector Profiles',
        'Canadian Sub-Zero Active Thermal Control Calibration',
        'Winter Lane-Tracking Computer Vision Weight Alignments',
        'Localized Inferences vs. Cloud Decentralization Model',
      ]
    },
    {
      id: 'astrateq-founding-member-guide',
      title: 'Astrateq Founding Member Guide',
      description: 'Exclusive Access Benefits, VIP Privileges & Launch Instructions',
      badge: 'Founding Member',
      buttonText: 'Download Guide',
      fileLink: '/reports/Astrateq-Founding-Member-Guide.pdf',
      readTime: '12 min read',
      fileSize: '2.4 MB',
      icon: Sparkles,
      accentClass: 'text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      summary: 'Your comprehensive handbook to navigating Astrateq’s pilot manufacturing batch program. Details exclusive member benefits including premium high-grip anodized brackets, prioritized Waterloo hardware fitting appointment codes, and complimentary telemetry module firmware updates for life.',
      toc: [
        'Welcome Note from Waterloo Prototyping Labs',
        'Your Reserved Priority Queue Allocation Status',
        'Exclusive Hardware Pack details & Mount Kits',
        'Waterloo and Montreal Regional Calibration Depots',
        'Firmware Beta Testing Calendar & Release Tracks',
      ]
    },
    {
      id: 'astrateq-zero-cloud-privacy-manifesto',
      title: 'Astrateq Zero-Cloud Privacy Manifesto',
      description: 'A New Standard For Vehicle Intelligence Ownership & Decoupled Compute',
      badge: 'Privacy Philosophy',
      buttonText: 'Download Manifesto',
      fileLink: '/reports/Astrateq-Zero-Cloud-Privacy-Manifesto.pdf',
      readTime: '6 min read',
      fileSize: '880 KB',
      icon: Shield,
      accentClass: 'text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]',
      summary: 'Our foundational treatise detailing how the Sentinel Edge Bundle ensures total absolute user privacy. Outlines the mathematics of local computer vision weights, physical OBD hardware-wire isolation, and localized ped/license blurring engines built strictly to exceed PIPEDA guidelines.',
      toc: [
        'The Ephemeral Compute Mandate',
        'Zero Cloud Transmission Mechanical Jumper Options',
        'PIPEDA and Quebec Law 25 Compliance Matrix',
        'Automated On-Device Edge Video Redaction Matrices',
        'Audit Verification: Open Hardware Schematic Access',
      ]
    }
  ];

  const handleDownload = (report: ReportDetails) => {
    // Open in new tab
    window.open(report.fileLink, '_blank');
    
    // Log required analytics event
    onLogEvent('report_download', {
      report_name: report.title,
      download_timestamp: new Date().toISOString(),
      reservation_id: details.reservationId,
      vehicle_class: `${details.vehicleYear} ${details.vehicleMake} ${details.vehicleModel}`
    });

    onShowNotification(`"${report.title}" download triggered successfully.`);
  };

  const handleEmailRequest = (buttonType: string) => {
    onLogEvent('email_request', {
      button_type: buttonType,
      target_email: shareInputEmail,
      reservation_id: details.reservationId,
      timestamp: new Date().toISOString()
    });

    setShareStatus('sending');
    setTimeout(() => {
      setShareStatus('success');
      onShowNotification('Coming Soon - This will hook into your custom Resend email action.');
      setTimeout(() => setShareStatus('idle'), 3000);
    }, 1500);
  };

  const handleResourceShare = (reportTitle: string) => {
    onLogEvent('resource_share', {
      report_name: reportTitle,
      reservation_id: details.reservationId,
      timestamp: new Date().toISOString()
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(`reports.astrateqgadgets.com - Download "${reportTitle}" as a premium priority access member!`);
      onShowNotification('Report link copied to clipboard.');
    } else {
      onShowNotification('Coming Soon - Share feature activation.');
    }
  };

  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8" id="reports-section-wrapper">
      
      {/* LEFT COLUMN: The Three Download Cards */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-sm font-bold font-mono tracking-wider text-slate-400 uppercase flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-astrateq-cyan" />
            SECURE REQUISITION MODULES
          </h3>
          <span className="text-[10px] font-mono text-[#2563eb] font-bold bg-[#2563eb]/10 border border-[#2563eb]/20 px-2.5 py-0.5 rounded">
            AUTHORIZED USER
          </span>
        </div>

        <div className="space-y-4">
          {reports.map((report) => {
            const IconComponent = report.icon;
            const isSelected = selectedReportId === report.id;

            return (
              <motion.div
                key={report.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group rounded-2xl p-[1px] relative cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-astrateq-cyan/40 via-[#2563eb]/40 to-emerald-400/30 shadow-[0_0_25px_rgba(34,211,238,0.12)]' 
                    : 'bg-white/5 hover:bg-white/10 shadow-md border border-white/5'
                }`}
                onClick={() => {
                  setSelectedReportId(report.id);
                  onLogEvent('report_card_selected', { report_name: report.title });
                }}
              >
                {/* Active scan highlight bars on outer border */}
                {isSelected && (
                  <div className="absolute top-0 right-10 w-20 h-[1.5px] bg-astrateq-cyan animate-pulse"></div>
                )}

                <div className="rounded-[15px] bg-[#0c0f1d]/90 p-5 sm:p-6 space-y-4">
                  {/* Card Badge and Specs */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#22d3ee] font-extrabold bg-[#22d3ee]/10 px-2 py-0.5 rounded border border-[#22d3ee]/20 shadow-[0_0_8px_rgba(34,211,238,0.1)]">
                      {report.badge}
                    </span>
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {report.readTime}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {report.fileSize}
                      </span>
                      <span className="text-[9px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded-sm">
                        PDF
                      </span>
                    </div>
                  </div>

                  {/* Icon + Title Block */}
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl border flex-shrink-0 bg-slate-900 ${report.accentClass}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-base font-bold text-white leading-tight font-display group-hover:text-astrateq-cyan transition-colors">
                        {report.title}
                      </h4>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans font-medium">
                        {report.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Block */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReportId(report.id);
                        onLogEvent('report_card_selected', { report_name: report.title, mode: 'preview' });
                      }}
                      className="text-[10px] font-bold tracking-widest uppercase font-mono text-slate-400 hover:text-white transition-colors flex items-center space-x-1 py-1.5 px-3 bg-white/5 rounded"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Intel</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResourceShare(report.title);
                        }}
                        className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                        title="Copy Share Link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(report);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-astrateq-cyan to-[#2563eb] text-slate-950 hover:from-white hover:to-white hover:text-slate-900 rounded-lg text-[10.5px] font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] select-none hover:shadow-cyan-glow cursor-pointer"
                        id={`btn-dl-${report.id}`}
                      >
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{report.buttonText}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: EXECUTIVE PREVIEW PANEL */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div id="executive-preview-panel" className="rounded-2xl border border-white/5 bg-[#0a0e1c] p-6 flex flex-col space-y-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
          {/* Cyber accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_70%)] blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] font-mono tracking-widest text-[#2563eb] font-extrabold uppercase">
              REAL-TIME INSIGHT DECRYPTER
            </span>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SYNCHRONIZED</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedReport.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-[9.5px] font-mono uppercase bg-white/5 px-2.5 py-1 rounded text-slate-300 border border-white/5">
                  Index Block ID: {selectedReport.id.toUpperCase().slice(0, 15)}...
                </span>

                <h4 className="text-lg font-bold font-display text-white leading-snug">
                  {selectedReport.title}
                </h4>

                {/* Simulated Document preview sheet */}
                <div className="border border-white/10 bg-slate-950 p-4 rounded-xl space-y-3 shadow-inner">
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 border-b border-white/5 pb-2">
                    <span>DOCUMENT SECURED // BATCH_1</span>
                    <span>SIZE: {selectedReport.fileSize}</span>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-mono font-bold tracking-wider text-astrateq-cyan uppercase mb-1">
                      EXECUTIVE SYNOPSIS
                    </h5>
                    <p className="text-[11px] text-slate-200 leading-relaxed font-sans font-medium">
                      {selectedReport.summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    TABLE OF CONTENTS
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedReport.toc.map((chapter, i) => (
                      <li key={i} className="flex items-start text-[11px] text-slate-200 font-sans font-medium">
                        <ChevronRight className="w-3.5 h-3.5 text-astrateq-cyan flex-shrink-0 mt-0.5 mr-1.5" />
                        <span className="flex-1 leading-normal pb-0.5 border-b border-dashed border-white/5 group hover:border-white/20 transition-colors">
                          <span className="font-bold text-slate-400 font-mono mr-1.5">0{i+1}.</span>
                          {chapter}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4 mt-auto">
                <div className="bg-[#22d3ee]/5 border border-astrateq-cyan/20 px-3.5 py-3 rounded-xl flex items-center space-x-3 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-astrateq-cyan flex-shrink-0" />
                  <span className="text-[10.5px] text-slate-200 leading-relaxed font-sans font-medium">
                    This file has been digitally watermarked under Canadian customer registration token <span className="text-white font-bold font-mono">{details.reservationId}</span>. All accesses are tracked on local sandbox state.
                  </span>
                </div>

                <button
                  onClick={() => handleDownload(selectedReport)}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg font-sans uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 stroke-[2]" />
                  <span>Download Complete PDF Manual</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* EMAIL INTEGRATION PREPARATION BLOCK ("Share By Email") */}
        <div className="rounded-2xl border border-white/5 bg-[#090d19] p-5 sm:p-6 space-y-4 relative shadow-md" id="share-by-email-box">
          <div className="flex items-center space-x-2">
            <Mail className="w-4.5 h-4.5 text-astrateq-cyan animate-pulse" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Share By Email
            </h4>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
            Send an instant automated download package with all registered documentation straight to your inbox safely.
          </p>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={shareInputEmail}
                onChange={(e) => setShareInputEmail(e.target.value)}
                placeholder="Submit driver's email..."
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-astrateq-cyan font-mono"
              />
              <span className="absolute right-3.5 top-3 text-[9px] font-mono text-slate-500 uppercase font-semibold">
                SMTP READY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => handleEmailRequest('email_my_reports')}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold font-mono text-white tracking-wide transition-all select-none hover:scale-[1.01]"
                title="Email Me My Reports"
              >
                <Mail className="w-3.5 h-3.5 text-astrateq-cyan" />
                <span>Email Me My Reports</span>
              </button>

              <button
                onClick={() => handleEmailRequest('request_updated_assessment')}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold font-mono text-white tracking-wide transition-all select-none hover:scale-[1.01]"
                title="Request Updated Assessment"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Request Updated Assessment</span>
              </button>
            </div>

            <AnimatePresence>
              {shareStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-950 border border-white/10 rounded-lg p-2.5 text-center text-[10px] font-mono leading-relaxed"
                >
                  {shareStatus === 'sending' ? (
                    <span className="text-astrateq-cyan flex items-center justify-center space-x-1.5 animate-pulse">
                      <span>SMTP RELAY ENQUEUING TRANSFERS...</span>
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-extrabold flex items-center justify-center space-x-1.5">
                      <span>✓ COMING SOON (RESEND INTEGRATION ACTIVE)</span>
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
}
