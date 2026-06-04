/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Twitter, Facebook, Link2, Instagram, Check, Mail, Sparkles, Send, ArrowRight, ExternalLink, ShieldCheck 
} from 'lucide-react';

interface MarketingProps {
  customerEmail: string;
  reservationId: string;
  vehicleName: string;
  onLogEvent: (eventName: string, params: Record<string, string | number | boolean>) => void;
}

export default function MarketingSection({ customerEmail, reservationId, vehicleName, onLogEvent }: MarketingProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentCount, setEmailSentCount] = useState(1);
  const [showStatus, setShowStatus] = useState<string>('');

  const shareText = `I just secured early access to Astrateq Gadgets — a privacy-first vehicle intelligence system built for Canadian drivers. (ID: ${reservationId})`;

  const handleShareClick = (platform: string) => {
    onLogEvent('share_clicked', { platform, reservationId, vehicle: vehicleName });
    if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://astrateqgadgets.com')}`, '_blank');
    } else if (platform === 'instagram') {
      onLogEvent('follow_social_clicked', { channel: 'instagram' });
      alert('Simulating navigation to Astrateq Gadgets Instagram profile.');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://astrateqgadgets.com/priority-access');
    setCopiedLink(true);
    onLogEvent('share_clicked', { action: 'copy_page_link' });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedQuote(true);
    onLogEvent('share_clicked', { action: 'copy_suggested_tweet' });
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const handleResendEmail = () => {
    if (emailSending) return;
    setEmailSending(true);
    onLogEvent('reservation_confirmed_view', { action: 'requested_email_resend', email: customerEmail });

    setTimeout(() => {
      setEmailSending(false);
      setEmailSentCount(prev => prev + 1);
      setShowStatus(`Confirmation email successfully re-dispatched to ${customerEmail}!`);
      setTimeout(() => setShowStatus(''), 5000);
    }, 2200);
  };

  const handleFollowClick = (channel: string) => {
    onLogEvent('follow_social_clicked', { platform: channel });
    alert(`Thank you for following Astrateq Gadgets on ${channel}! Early access logs and beta firmware invites are released regularly.`);
  };

  return (
    <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8" id="marketing-activities">
      
      {/* 1. Social Share Column */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-4 rounded-2xl border border-astrateq-border/60 bg-[#070b12] p-6 lg:p-7 flex flex-col justify-between space-y-6"
        id="col-social-share"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-astrateq-cyan animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">
              SHARE THE MOVEMENT
            </span>
          </div>

          <h3 className="text-base font-bold font-display text-white">
            Help Shape the Future of Vehicle Intelligence
          </h3>

          <p className="text-[11px] text-slate-400 leading-normal">
            Know someone who cares about privacy, vehicle safety, or smarter driving? Share Astrateq Gadgets with them to support Canadian compute.
          </p>

          {/* Social Buttons Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleShareClick('x')}
              className="flex items-center justify-center space-x-2 bg-astrateq-card hover:bg-slate-900 border border-astrateq-border hover:border-slate-700 p-2.5 rounded-lg text-xs font-semibold text-slate-200 transition-all hover:scale-[1.02]"
            >
              <Twitter className="w-3.5 h-3.5 text-astrateq-cyan" />
              <span>Share on X</span>
            </button>

            <button 
              onClick={() => handleShareClick('facebook')}
              className="flex items-center justify-center space-x-2 bg-astrateq-card hover:bg-slate-900 border border-astrateq-border hover:border-slate-700 p-2.5 rounded-lg text-xs font-semibold text-slate-200 transition-all hover:scale-[1.02]"
            >
              <Facebook className="w-3.5 h-3.5 text-astrateq-blue" />
              <span>Facebook</span>
            </button>

            <button 
              onClick={handleCopyLink}
              className="flex items-center justify-center space-x-2 bg-astrateq-card hover:bg-slate-900 border border-astrateq-border hover:border-slate-700 p-2.5 rounded-lg text-xs font-semibold text-slate-200 transition-all hover:scale-[1.02]"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>

            <button 
              onClick={() => handleShareClick('instagram')}
              className="flex items-center justify-center space-x-2 bg-astrateq-card hover:bg-slate-900 border border-astrateq-border hover:border-slate-700 p-2.5 rounded-lg text-xs font-semibold text-slate-200 transition-all hover:scale-[1.02]"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-500" />
              <span>Visit IG</span>
            </button>
          </div>

          {/* Copy-Paste Quote Card */}
          <div className="bg-[#0b101b] border border-astrateq-border/40 p-4 rounded-xl space-y-2 text-left relative overflow-hidden">
            <span className="text-[8.5px] font-mono uppercase text-slate-500 font-bold block">
              Suggested Copy
            </span>
            <blockquote className="text-[10px] text-slate-300 italic font-medium leading-relaxed font-sans select-all pr-2">
              "{shareText}"
            </blockquote>
            <button 
              onClick={handleCopyQuote}
              className="flex items-center justify-center w-full space-x-1.5 mt-2.5 text-[9px] font-mono uppercase font-bold text-slate-400 hover:text-white border border-dashed border-astrateq-border hover:border-slate-600 bg-slate-950 px-2.5 py-1.5 rounded-md transition-all"
            >
              {copiedQuote ? <Check className="w-3 h-3 text-emerald-400" /> : <Link2 className="w-3 h-3" />}
              <span>{copiedQuote ? 'Copied Content' : 'Copy suggested copy'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Interactive Email Check Column */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-4 rounded-2xl border border-astrateq-border/60 bg-[#070b12] p-6 lg:p-7 flex flex-col justify-between space-y-6"
        id="col-email-reminder"
      >
        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-astrateq-cyan" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">
              EMAIL DISPATCH
            </span>
          </div>

          <h3 className="text-base font-bold font-display text-white">
            Check Your Inbox
          </h3>

          <p className="text-[11px] text-slate-400 leading-normal mb-2">
            We’ve sent a confirmation email with your reservation details and next steps to <span className="text-white font-mono">{customerEmail}</span>. If you don't see it, check Promotions or Spam and mark Astrateq as safe.
          </p>

          {/* Envelope Graphic Animation Widget */}
          <div className="relative border border-slate-800 bg-black/50 p-4 rounded-xl flex flex-col items-center justify-center space-y-3 h-40 overflow-hidden cursor-pointer mt-auto" onClick={handleResendEmail}>
            <AnimatePresence mode="wait">
              {emailSending ? (
                <motion.div 
                  key="sending"
                  className="flex flex-col items-center space-y-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-10 h-10 border-2 border-astrateq-cyan border-t-transparent rounded-full flex items-center justify-center"
                  />
                  <span className="text-[10px] font-mono text-astrateq-cyan">Constructing payload...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="static"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col items-center space-y-1.5 text-center group"
                >
                  <div className="relative">
                    <Mail className="w-12 h-12 text-slate-700 group-hover:text-astrateq-cyan transition-colors" />
                    <Send className="w-4 h-4 text-astrateq-cyan absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[9px] font-mono uppercase text-slate-500 group-hover:text-slate-300 transition-colors">
                    Click to Resend Email
                  </span>
                  <span className="text-[8px] font-mono text-slate-600">
                    Dispatched count: {emailSentCount}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Accent */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-28 h-20 bg-astrateq-cyan/5 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Action button in box / Toast simulator inline */}
        <div>
          <AnimatePresence>
            {showStatus && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg text-center leading-normal mb-2"
              >
                {showStatus}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleResendEmail}
            disabled={emailSending}
            className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-bold transition-all border border-astrateq-cyan bg-astrateq-cyan/5 hover:bg-[#22d3ee] hover:text-slate-950 text-astrateq-cyan"
            id="btn-resend-confirmation"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{emailSending ? 'Resending...' : 'Resend Confirmation Email'}</span>
          </button>
        </div>
      </motion.div>

      {/* 3. Final Checkout CTA Column */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-4 rounded-2xl border border-astrateq-cyan/20 bg-[#070b12] p-6 lg:p-7 flex flex-col justify-between space-y-6 shadow-[0_0_40px_rgba(34,211,238,0.03)] relative"
        id="col-final-ctas"
      >
        {/* Cyan premium border overlay top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-astrateq-cyan/60 to-transparent"></div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
              PORTAL COMPLETE
            </span>
          </div>

          <h3 className="text-base font-bold font-display text-white">
            You're In. We'll Take It From Here.
          </h3>

          <p className="text-[11px] text-slate-400 leading-normal">
            We're building the future of vehicle intelligence with local privacy, hardware-accelerated security, and true transparency at the core.
          </p>
        </div>

        {/* CTA Button vertical stack */}
        <div className="space-y-2.5">
          {/* Main Primary White Button */}
          <button 
            onClick={() => {
              onLogEvent('return_home_clicked', { anchor: 'marketing_main_cta' });
              alert('Simulating navigation back to AstrateqGadgets.com Main Portal');
            }}
            className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-between shadow-xl transition-all sm:text-xs group"
            id="btn-cta-return"
          >
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Return to AstrateqGadgets.com</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-900 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Social Follow */}
          <button 
            onClick={() => handleFollowClick('X')}
            className="w-full flex items-center justify-between border border-astrateq-border hover:border-white/20 bg-astrateq-card hover:bg-slate-900 text-xs font-semibold py-3 px-4 rounded-xl text-slate-300 hover:text-white transition-all group"
            id="btn-cta-follow"
          >
            <span>Follow Astrateq Gadgets</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </button>

          {/* Review Compatibility Details */}
          <button 
            onClick={() => {
              const element = document.getElementById('what-happens-next');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                onLogEvent('reservation_confirmed_view', { action: 'scroll_to_compatibility' });
              }
            }}
            className="w-full flex items-center justify-between border border-astrateq-border hover:border-white/20 bg-astrateq-card hover:bg-slate-900 text-xs font-semibold py-3 px-4 rounded-xl text-slate-300 hover:text-white transition-all group"
            id="btn-cta-review"
          >
            <span>Review Compatibility Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-45 transition-transform" />
          </button>
        </div>

      </motion.div>
    </section>
  );
}
