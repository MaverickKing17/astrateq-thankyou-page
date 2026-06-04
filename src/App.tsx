/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ReservationDetails, AnalyticsEvent } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SummaryCard from './components/SummaryCard';
import TimelineSection from './components/TimelineSection';
import BenefitsSection from './components/BenefitsSection';
import MarketingSection from './components/MarketingSection';
import AnalyticsObserver from './components/AnalyticsObserver';
import Footer from './components/Footer';

export default function App() {
  // Main priority customer state
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

  // Telemetry logger callback
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080b16] text-slate-100 overflow-x-hidden relative font-sans">
      
      {/* Background visual light leak and colorful glowing energy spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Deep navy backplate */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d1a] via-[#0e1426] to-[#060810]"></div>
        
        {/* Soft cyan gradient aura glowing from top-left */}
        <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] blur-3xl opacity-90 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        {/* Glowing royal blue energetic bubble in center right */}
        <div className="absolute top-[25%] right-[-5%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,transparent_70%)] blur-3xl opacity-80"></div>
        
        {/* Gentle supportive emerald aura blooming in bottom left to balance confirmation message */}
        <div className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(16,185,129,0.04)_0%,transparent_70%)] blur-3xl opacity-75"></div>
        
        {/* Top-center premium visual beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[850px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.07)_0%,rgba(37,99,235,0.04)_30%,rgba(16,185,129,0.03)_65%,transparent_100%)]"></div>
        
        {/* Tech line grid overlay with subtle opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
      </div>
      
      {/* 1. Header */}
      <Header onLogEvent={logEvent} />

      {/* Main Flow Content Grid */}
      <main className="flex-1 flex flex-col space-y-4">
        
        {/* 2. Hero Section with secured validation alerts */}
        <HeroSection onLogEvent={logEvent} />

        {/* 3. Interactive Summary Card (Data sandbox) */}
        <SummaryCard 
          details={reservationDetails} 
          onUpdateDetails={updateDetails} 
          onLogEvent={logEvent} 
        />

        {/* 4. What Happens Next - Custom Timeline */}
        <TimelineSection onLogEvent={logEvent} />

        {/* 5. Early Access Benefits (Founder suite) */}
        <BenefitsSection />

        {/* 6. High-conversion Marketing Columns: Shape Future / Resend Email / Next Actions */}
        <MarketingSection 
          customerEmail={reservationDetails.email} 
          reservationId={reservationDetails.reservationId}
          vehicleName={`${reservationDetails.vehicleYear} ${reservationDetails.vehicleMake} ${reservationDetails.vehicleModel}`}
          onLogEvent={logEvent} 
        />

        {/* 7. Important Transparency notice banner before footer */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-3">
          <div className="rounded-xl border border-dashed border-white/5 bg-white/5 p-4 text-center">
            <span className="text-[11px] text-slate-500 font-mono tracking-wide leading-relaxed">
              🇨🇦 Astrateq Gadgets is currently in pre-launch validation. Your reservation helps us measure demand, prioritize compatible vehicles, and prepare for supplier and production planning. Done under Canadian pre-release compliance guidelines.
            </span>
          </div>
        </div>

        {/* 8. Interactive Telemetry Capture Terminal */}
        <AnalyticsObserver 
          events={events} 
          onClearEvents={() => setEvents([])} 
        />
      </main>

      {/* 9. Footing links & global credentials */}
      <Footer />
    </div>
  );
}
