/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Compass, Mail, ShoppingBag, ArrowRight, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { TimelineStep } from '../types';

interface TimelineProps {
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function TimelineSection({ onLogEvent }: TimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(2); // Step 2 is typically the next active focus phase after securement

  const steps: TimelineStep[] = [
    {
      id: 1,
      label: 'Reservation Secured',
      description: 'You\'re officially verified on the priority release queue.',
      status: 'completed',
      detailedText: 'Your queue priority is preserved indefinitely. Your deposit is recorded as 100% risk-free. A welcome confirmation notification is on its way to your designated inbox.'
    },
    {
      id: 2,
      label: 'Compatibility Audit',
      description: 'We match your OBD-II logs to validate localized compatibility.',
      status: 'active',
      detailedText: 'Our engineering teams review vehicle architectures (CAN-bus wiring, voltage capacities, dash layout clearances) to perfect immediate calibration on launch day.'
    },
    {
      id: 3,
      label: 'Development Logs',
      description: 'Follow telemetry milestones and build hardware updates.',
      status: 'upcoming',
      detailedText: 'No spam. Direct developer bulletins detailing product certifications (CE/FCC/ISED Canada), firmware encryption keys, and hardware design revisions.'
    },
    {
      id: 4,
      label: 'Final Order Window',
      description: 'Access founding member prices to secure your shipment.',
      status: 'upcoming',
      detailedText: 'When localized Canadian deployment is live, you will be invited via private link to convert your priority spot into a direct fast-shipment order and pay the founding balance.'
    }
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    onLogEvent('reservation_confirmed_view', { 
      action: 'view_timeline_step', 
      stepId: stepId, 
      label: steps[stepId - 1].label 
    });
  };

  const currentStepData = steps.find(s => s.id === activeStep) || steps[1];

  const getStepIcon = (id: number, status: string) => {
    switch(id) {
      case 1:
        return <CheckCircle2 className={`w-5 h-5 ${status === 'completed' ? 'text-emerald-400' : 'text-slate-500'}`} />;
      case 2:
        return <Compass className={`w-5 h-5 ${status === 'active' ? 'text-astrateq-cyan' : 'text-slate-500'}`} />;
      case 3:
        return <Mail className="w-5 h-5 text-slate-500" />;
      case 4:
        return <ShoppingBag className="w-5 h-5 text-slate-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8" id="what-happens-next">
      
      {/* List Layout Panel */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-astrateq-cyan font-bold block">
            HOW IT WORKS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
            What Happens Next Timeline
          </h2>
          <p className="text-xs text-slate-400 max-w-md mt-1 leading-relaxed">
            Click on any phase to review advanced technical parameters and milestone securement tasks.
          </p>
        </div>

        {/* Vertical/Horizontal Timeline Component */}
        <div className="relative pl-1 md:pl-4 space-y-6">
          {/* Vertical connection line */}
          <div className="absolute left-[21px] md:left-[33px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-emerald-500 via-astrateq-cyan to-white/5"></div>

          {steps.map((step) => {
            const isSelected = activeStep === step.id;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <motion.div 
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`relative flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected 
                    ? 'bg-astrateq-card border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.03)]' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
                whileHover={{ x: isSelected ? 0 : 4 }}
              >
                {/* Step indicator circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500/10 border-2 border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : isActive
                        ? 'bg-astrateq-cyan/10 border-2 border-astrateq-cyan shadow-[0_0_15px_rgba(34,211,238,0.35)]'
                        : 'bg-astrateq-card border border-white/10'
                  }`}>
                    {getStepIcon(step.id, step.status)}
                  </div>
                  {/* Small step digit */}
                  <span className="absolute -bottom-1 -right-1 bg-slate-900 border border-slate-800 text-[8px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center text-slate-400">
                    {step.id}
                  </span>
                </div>

                {/* Text summary */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-sm font-semibold font-display ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {step.label}
                    </h3>
                    {isCompleted && (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold">
                        Secured
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-astrateq-cyan/10 text-astrateq-cyan border border-astrateq-cyan/20 uppercase font-bold animate-pulse">
                        Next Focus
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal truncate">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center justify-center self-center text-slate-600">
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'rotate-90 text-astrateq-cyan' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Showcase Panel */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-2xl bg-gradient-to-r from-astrateq-cyan/35 via-astrateq-blue/25 to-emerald-500/30 p-[1.5px] shadow-[0_0_25px_rgba(34,211,238,0.12)] hover:shadow-[0_0_35px_rgba(34,211,238,0.22)] transition-all duration-500"
          >
            <div className="h-full rounded-[15px] bg-astrateq-card p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Design detail accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-astrateq-cyan/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#2563eb] font-bold uppercase p-1.5 bg-white/5 border border-white/5 rounded">
                    Phase 0{currentStepData.id} Info
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Milestone validation
                  </span>
                </div>

                <h2 className="text-lg font-bold font-display text-white">
                  Detailed Outlook — {currentStepData.label}
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {currentStepData.detailedText}
                </p>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                    Actionable Task Indicators
                  </span>
                  
                  <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span>Canadian Driver Compatibility Matching</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                    <span>OBD-II Telemetry Calibration Drafts</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <span>Physical Hardware Balance Allocator</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start space-x-2.5 mt-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-[10px] text-slate-400 leading-normal font-sans">
                  No automatic billing will occur. Your reservation is merely a priority queuing placeholder, and hardware conversion is 100% voluntary.
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
