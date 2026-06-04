/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldCheck, Scale, MapPin, HelpCircle, Thermometer, Sparkles, Building, Mail, Layers, Phone, HardDrive
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'contact' | 'faq';

interface InfoHubModalProps {
  isOpen: boolean;
  initialTab: PolicyTab;
  onClose: () => void;
  onLogEvent: (eventName: string, parameters: Record<string, string | number | boolean>) => void;
}

export default function InfoHubModal({ isOpen, initialTab, onClose, onLogEvent }: InfoHubModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleTabChange = (tab: PolicyTab) => {
    setActiveTab(tab);
    onLogEvent('info_hub_view', { action: 'switch_tab', targetTab: tab });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="info-hub-overlay">
        {/* Backdrop glass blur blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-[#0d1224] border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col max-h-[85vh] z-10"
          id="info-hub-card"
        >
          {/* Top cyber banner bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-astrateq-cyan via-[#2563eb] to-emerald-400"></div>

          {/* Header block */}
          <div className="p-5 sm:p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-astrateq-cyan/10 border border-astrateq-cyan/20 flex items-center justify-center text-astrateq-cyan shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#2563eb] font-extrabold uppercase">
                  CANADIAN INTEL REPOSITORY
                </span>
                <h2 className="text-base sm:text-lg font-bold font-display text-white">
                  Astrateq Sentinel Knowledge Vault
                </h2>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all focus:outline-none"
              title="Close Vault"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Navigation Tab Rail */}
          <div className="flex border-b border-white/5 bg-slate-950/40 p-2 overflow-x-auto scrollbar-none gap-1 sm:gap-2">
            {[
              { id: 'privacy' as PolicyTab, label: 'Privacy Policy', icon: ShieldCheck },
              { id: 'terms' as PolicyTab, label: 'Terms of Service', icon: Scale },
              { id: 'contact' as PolicyTab, label: 'Contact Us', icon: MapPin },
              { id: 'faq' as PolicyTab, label: 'FAQ & Diagnostics', icon: HelpCircle },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 text-xs font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all focus:outline-none whitespace-nowrap ${
                    isActive 
                      ? 'bg-white/10 border border-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-astrateq-cyan' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Area (Scrollable) */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto text-slate-200 space-y-6 font-sans">
            
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-start space-x-4 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">PIPEDA & Canadian On-Device AI Consent</h3>
                    <p className="text-[11.5px] text-white/90 leading-relaxed font-sans font-medium">
                      Astrateq operates on a strictly non-custodial decentralized computing paradigm. All real-time telemetry processing, lane-tracking algorithms, and computer-vision neural weight calculations occur on-hardware in your vehicle.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <section className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrateq-cyan font-mono">1. Localized Sandboxing & Zero Cloud Transmissions</h4>
                    <p className="text-[11.5px] leading-relaxed text-slate-300">
                      Unlike traditional automotive cloud aggregators, the <span className="text-white font-semibold">Astrateq Edge Sentinel Bundle</span> does not ship raw video grids, in-cabin audio feeds, or localized GPS traces to external databases. All mathematical inferences are completed on our custom NPU processing core within 4 milliseconds.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrateq-cyan font-mono">2. Provincial Privacy Compliance (Quebec Law 25 & PIPEDA)</h4>
                    <p className="text-[11.5px] leading-relaxed text-slate-300">
                      Our system is engineered to satisfy the rigorous privacy directives of the <span className="text-white">Office of the Privacy Commissioner of Canada</span> and Quebec's Law 25. Facial recognition metrics, pedestrians' visages, and other vehicles' license plates are obscured natively on-chip prior to any ephemeral local buffering. No identifying data is persisted.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrateq-cyan font-mono">3. Physical Data Isolation Option</h4>
                    <p className="text-[11.5px] leading-relaxed text-slate-300">
                      The module includes a physical hardware isolation toggle. By pulling the diagnostic jumper pin, you mechanically disconnect all wireless network receivers, forcing the vehicle safety co-pilot to run entirely in an air-gapped system. No remote diagnostics are ever transmitted.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'terms' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-start space-x-4 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                  <Scale className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Transport Canada Safety Guidelines & Agreement</h3>
                    <p className="text-[11.5px] text-white/90 leading-relaxed font-sans font-medium">
                      By reserving your Astrateq Gadgets system, you understand that this diagnostic bundle operates strictly as a passive driver assistance and telemetry scanner, conforming to Canadian Motor Vehicle Safety Standards.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <section className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrateq-cyan font-mono">1. Scope of Passive Driving Assistance</h4>
                    <p className="text-[11.5px] leading-relaxed text-slate-300">
                      The Sentinel Edge compute node reads real-time vehicle metrics via the standardized OBD-II port. Under no circumstances does the hardware take physical control of mechanical nodes, including acceleration, braking circuits, or active power steering racks. It remains a diagnostic co-pilot under direct human responsibility at all times.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrateq-cyan font-mono">2. Extreme Winter Environmental Requirements</h4>
                    <p className="text-[11.5px] leading-relaxed text-slate-300">
                      To safeguard localized neural network inferences, the camera sensor system must be kept clear of severe frost, mud, salt spray, and packed ice. Automated internal lens warmers will actuate to pre-thaw optics, but drivers bear ultimate responsibility for physical vehicle preparation under respective provincial traffic acts.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrateq-cyan font-mono">3. Priority Queue Cancellations</h4>
                    <p className="text-[11.5px] leading-relaxed text-slate-300">
                      This priority queuing program is voluntarily entered and constitutes zero financial obligation. Early access allocation retains your manufacturing batch status position. All hardware evaluation conversions are 100% optional, and depositors may demand instant, painless priority deposit returns.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb]">
                        <Building className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Waterloo Hardware Labs</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                      Focused on physical circuit prototyping, climatic Freeze Chamber torture-tests (-40°C to +85°C), and automotive OBD-II harness safety validations.
                    </p>
                    <div className="text-[11px] font-mono text-white pt-1">
                      180 Columbia St W, Waterloo, ON N2L 3L3
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Montreal Neural Systems</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                      Developing our localized computer vision transformer weights, winter obstacle prediction lattices, and real-time friction evaluation networks.
                    </p>
                    <div className="text-[11px] font-mono text-white pt-1">
                      1000 Rue de la Gauchetière O, Montreal, QC H3B 4W5
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-astrateq-cyan" />
                    Secure Communication & Priority Dispatch
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-mono text-slate-500 block">General Priority Queue Support</span>
                      <a href="mailto:support@astrateqgadgets.ca" className="text-white hover:text-astrateq-cyan font-bold transition-colors">
                        support@astrateqgadgets.ca
                      </a>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-mono text-slate-500 block">Canadian Enterprise Fleet Desk</span>
                      <a href="mailto:fleet@astrateqgadgets.ca" className="text-white hover:text-astrateq-cyan font-bold transition-colors">
                        fleet@astrateqgadgets.ca
                      </a>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-mono text-slate-500 block">Toll-Free Telephone Support</span>
                      <span className="text-white font-bold flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        +1 (800) 555-ASTRA
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-mono text-slate-500 block">Active Status Indicators</span>
                      <span className="text-emerald-400 font-extrabold flex items-center font-mono">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                        ONLINE DESK (EST)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {[
                  {
                    q: 'How does the on-board hardware survive -40°C Canadian deep freezes?',
                    a: 'The Astrateq Edge computer is built strictly to exceed automotive-grade physical constraints. It features self-regulating internal heater coils. When remote vehicle warming triggers, the computational cage pre-warms its high-frequency cores and lens housings to positive tracking temperatures within 45 seconds.',
                    icon: Thermometer,
                    color: 'text-sky-400',
                  },
                  {
                    q: 'Are metric, bilingual, and BC flashing-green road signs supported?',
                    a: 'Yes. Our specialized localized transformer architecture is trained extensively on the diverse range of Canadian road geometries. This includes Quebec French traffic panels, metric speed controls, and regional configurations such as the unique flashing-green lights of British Columbia.',
                    icon: Sparkles,
                    color: 'text-emerald-400',
                  },
                  {
                    q: 'Is the data processing fully local? How do I update localized models?',
                    a: 'Absolutely. We do not transmit frames or coordinates to the cloud. Real-time inference is completed on the local coprocessor. Model updates can be applied securely and air-gapped using an encrypted USB flash drive or a localized Wi-Fi sync in your garage.',
                    icon: HardDrive,
                    color: 'text-[#2563eb]',
                  }
                ].map((faqItem, idx) => {
                  const FAQIcon = faqItem.icon;
                  return (
                    <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2">
                      <div className="flex items-start space-x-3">
                        <FAQIcon className={`w-4 h-4 ${faqItem.color} mt-0.5 flex-shrink-0`} />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide leading-relaxed">
                          {faqItem.q}
                        </h4>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-normal pl-7 font-sans font-medium">
                        {faqItem.a}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}

          </div>

          {/* Footer of modal */}
          <div className="p-4 bg-slate-950/60 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 text-center sm:text-left flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Secure Local Sandbox Session — Astrateq Canada Pre-release Validation Suite
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-1.5 bg-white text-slate-950 font-bold rounded-lg text-xs hover:bg-slate-100 transition-all focus:outline-none"
            >
              Close Vault
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
