/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ReservationDetails, AnalyticsEvent } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SummaryCard from './components/SummaryCard';
import ReportCards from './components/ReportCards';
import TimelineSection from './components/TimelineSection';
import BenefitsSection from './components/BenefitsSection';
import AnalyticsObserver from './components/AnalyticsObserver';
import Footer from './components/Footer';
import InfoHubModal, { PolicyTab } from './components/InfoHubModal';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, AlertCircle } from 'lucide-react';

export default function App() {
  // Main priority customer state (personalized vehicle details scan/preset)
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails>({
    reservationId: '#AST-7X2K-9E84',
    email: 'kingnarmer702@gmail.com',
    vehicleYear: '2023',
    vehicleMake: 'Toyota',
    vehicleModel: 'RAV4 Prime',
    region: 'Canada',
    batch: 'Batch 1 Early Access',
    deposit: '100% Refundable',
    dataPolicy: '100% Local / Zero Cloud'
  });

  // Captured analytics list tracker
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  // Info Hub Modal state for Canadian AI-powered policy pages
  const [isInfoHubOpen, setIsInfoHubOpen] = useState(false);
  const [infoHubTab, setInfoHubTab] = useState<PolicyTab>('privacy');

  // Custom toast notification system for premium feedback feel
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleOpenInfoHub = (tab: PolicyTab) => {
    setInfoHubTab(tab);
    setIsInfoHubOpen(true);
    logEvent('info_hub_view', { action: 'open_modal', source: `footer_link_${tab}` });
  };

  // Telemetry logger callback matching all specifications
  const logEvent = (eventName: string, parameters: Record<string, string | number | boolean>) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(11, 19);
    setEvents(prev => [...prev, { timestamp, eventName, parameters }]);
  };

  // Helper dispatcher to update customer states
  const updateDetails = (newDetails: Partial<ReservationDetails>) => {
    setReservationDetails(prev => ({
      ...prev,
      ...newDetails
    }));
  };

  // Hook to pull dynamic details from URL parameters if preset
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idQuery = params.get('reservation_id') || params.get('id');
    const emailQuery = params.get('customer_email') || params.get('email');
    const yearQuery = params.get('vehicle_year') || params.get('year');
    const makeQuery = params.get('vehicle_make') || params.get('make');
    const modelQuery = params.get('vehicle_model') || params.get('model');
    const regionQuery = params.get('region');

    const overrides: Partial<ReservationDetails> = {};
    if (idQuery) overrides.reservationId = idQuery;
    if (emailQuery) overrides.email = emailQuery;
    if (yearQuery) overrides.vehicleYear = yearQuery;
    if (makeQuery) overrides.vehicleMake = makeQuery;
    if (modelQuery) overrides.vehicleModel = modelQuery;
    if (regionQuery) overrides.region = regionQuery;

    if (Object.keys(overrides).length > 0) {
      setReservationDetails(prev => ({
        ...prev,
        ...overrides
      }));
      // Emit tracking log signifying loaded overriding fields
      logEvent('reservation_confirmed_view', { 
        source: 'url_query_parameters', 
        applied_overrides: JSON.stringify(overrides) 
      });
    }

    // Capture first visit page view analytics
    logEvent('portal_page_view', { referrer: document.referrer || 'direct', screen: 'home' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#060810] text-slate-100 overflow-x-hidden relative font-sans select-none">
      
      {/* Background visual light leak and colorful glowing energy spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Deep navy backplate */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070913] via-[#090d19] to-[#04060d]"></div>
        
        {/* Soft cyan gradient aura glowing from top-left */}
        <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.07)_0%,transparent_70%)] blur-3xl opacity-90 animate-pulse animate-duration-10000"></div>
        
        {/* Glowing royal blue energetic bubble in center right */}
        <div className="absolute top-[25%] right-[-5%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] blur-3xl opacity-80"></div>
        
        {/* Gentle supportive emerald aura blooming in bottom left */}
        <div className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(16,185,129,0.03)_0%,transparent_70%)] blur-3xl opacity-75"></div>
        
        {/* Top-center premium visual beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[850px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06)_0%,rgba(37,99,235,0.03)_30%,rgba(16,185,129,0.02)_65%,transparent_100%)]"></div>
        
        {/* Tech line grid overlay with subtle opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] opacity-35"></div>
      </div>
      
      {/* 1. Header & Brand Navigation */}
      <Header onLogEvent={logEvent} />

      {/* Main Flow Content Grid */}
      <main className="flex-1 flex flex-col space-y-4">
        
        {/* 2. Hero Section - Astrateq Reports Library Setup */}
        <HeroSection onLogEvent={logEvent} />

        {/* 3. FOUNDING MEMBER SECTION (Priority Access Resources Indicator block) */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-2">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/5 bg-gradient-to-r from-[#11162d] to-[#0a0d1d] p-6 shadow-md relative overflow-hidden"
            id="priority-access-resources-section"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-astrateq-cyan"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-astrateq-cyan font-extrabold flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-astrateq-cyan animate-pulse" />
                  Priority Access Resources
                </span>
                <p className="text-[12.5px] text-slate-100 leading-relaxed font-sans font-medium max-w-4xl">
                  These resources have been prepared exclusively for Astrateq Priority Access members and provide insight into our compatibility methodology, founding member benefits, and privacy-first engineering philosophy.
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded text-[10px] font-mono text-emerald-400 font-bold">
                <Shield className="w-3.5 h-3.5 mr-1" />
                <span>SECURED NODE ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4. Priority Credentials Summary & Sandbox Controls (OBD-II Scanning / Preset Choice) */}
        <SummaryCard 
          details={reservationDetails} 
          onUpdateDetails={updateDetails} 
          onLogEvent={logEvent} 
        />

        {/* 5. Requisition Modules (Three download cards and interactive executive preview panel) */}
        <ReportCards 
          details={reservationDetails} 
          onLogEvent={logEvent}
          onShowNotification={showNotification}
        />

        {/* 6. Dynamic Calibration/Timeline Schedule */}
        <TimelineSection onLogEvent={logEvent} />

        {/* 7. Premium Built pillars */}
        <BenefitsSection />

        {/* 8. Notice Banner */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-3">
          <div className="rounded-xl border border-dashed border-white/5 bg-white/5 p-4 text-center">
            <span className="text-[11.5px] text-slate-300 font-mono tracking-wide leading-relaxed font-semibold">
              🇨🇦 Astrateq Gadgets is currently in pre-launch validation. Your reservation helps us measure demand, prioritize compatible vehicles, and prepare for supplier and production planning. Done under Canadian pre-release compliance guidelines.
            </span>
          </div>
        </div>

        {/* 9. Telemetry Terminal Observer logs */}
        <AnalyticsObserver 
          events={events} 
          onClearEvents={() => setEvents([])} 
        />
      </main>

      {/* 10. Footer Section */}
      <Footer onOpenInfoHub={handleOpenInfoHub} />

      {/* Info Hub Overlay Modal */}
      <InfoHubModal
        isOpen={isInfoHubOpen}
        initialTab={infoHubTab}
        onClose={() => setIsInfoHubOpen(false)}
        onLogEvent={logEvent}
      />

      {/* Dynamic Floating Toast Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0c1020] border-2 border-astrateq-cyan px-5 py-3.5 rounded-xl shadow-[0_4px_30px_rgba(34,211,238,0.25)] flex items-center space-x-3 text-white max-w-sm sm:max-w-md"
          >
            <AlertCircle className="w-5 h-5 text-astrateq-cyan flex-shrink-0 animate-bounce" />
            <span className="text-xs font-mono font-bold leading-normal">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
