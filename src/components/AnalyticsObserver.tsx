/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Copy, Check, Trash2, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { AnalyticsEvent } from '../types';

interface ObserverProps {
  events: AnalyticsEvent[];
  onClearEvents: () => void;
}

export default function AnalyticsObserver({ events, onClearEvents }: ObserverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLogs, setCopiedLogs] = useState(false);

  const handleCopyLogs = () => {
    const logString = JSON.stringify(events, null, 2);
    navigator.clipboard.writeText(logString);
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-6" id="analytics-telemetry-observer">
      <div className="rounded-xl border border-astrateq-cyan/15 bg-slate-950/80 backdrop-blur-md overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.01)]">
        
        {/* Toggle Bar */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-5 py-3.5 cursor-pointer bg-slate-950 hover:bg-slate-900/60 select-none border-b border-slate-900 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-astrateq-cyan animate-pulse"></div>
            <Terminal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono font-bold text-slate-300">
              Astrateq Telemetry Console
            </span>
            <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-500">
              {events.length} logs captured
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
            <span>{isOpen ? 'Collapse console' : 'Expand captured events'}</span>
            {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
          </div>
        </div>

        {/* Console Contents */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 leading-normal">
                  The following system-level callbacks simulate native tracking pixels (`thank_you_page_view`, `reservation_confirmed_view`, etc.) configured on physical triggers.
                </span>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleCopyLogs}
                    disabled={events.length === 0}
                    className="flex items-center space-x-1.5 text-[10px] font-mono uppercase bg-slate-900 hover:border-slate-700 px-3 py-1.5 rounded text-slate-300 border border-slate-800 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    {copiedLogs ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLogs ? 'Copied' : 'Copy Logs'}</span>
                  </button>

                  <button 
                    onClick={onClearEvents}
                    disabled={events.length === 0}
                    className="flex items-center space-x-1.5 text-[10px] font-mono uppercase bg-slate-900/50 hover:bg-red-950/20 px-3 py-1.5 rounded text-red-400 border border-slate-800 hover:border-red-500/10 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {/* Log Feed */}
              <div className="bg-black/60 rounded-lg p-4 font-mono text-[10px] border border-slate-900 h-44 overflow-y-auto space-y-2 select-text">
                {events.length === 0 ? (
                  <div className="text-slate-600 flex items-center justify-center h-full">
                    No logs recorded. Interact inside the cards or click summary panels to emit tracking telemetry.
                  </div>
                ) : (
                  [...events].reverse().map((event, idx) => (
                    <div key={idx} className="border-b border-slate-950 pb-2 last:border-b-0">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-slate-400 font-semibold">{event.timestamp}</span>
                        <span className="bg-astrateq-cyan/10 px-1.5 rounded text-astrateq-cyan border border-astrateq-cyan/20">
                          {event.eventName}
                        </span>
                      </div>
                      <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap mt-1 leading-normal pl-4 border-l border-slate-800">
                        {JSON.stringify(event.parameters, null, 2)}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
