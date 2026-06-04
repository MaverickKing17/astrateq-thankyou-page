/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Lock, Tag, Code2, RefreshCw, BadgePercent, EyeOff, ShieldAlert, Check 
} from 'lucide-react';
import { BenefitItem } from '../types';

export default function BenefitsSection() {
  const benefits: BenefitItem[] = [
    {
      id: 'priority-release',
      title: 'Priority Release Access',
      description: 'Secures your spot first-in-line to request production physical hardware when localized shipments dispatch.',
      badge: 'Tier 1 Priority',
      iconName: 'Lock'
    },
    {
      id: 'founding-member',
      title: 'Founding Pricing Eligibility',
      description: 'Guarantees protection against inflation or base price increases. Lock in early-adopter hardware bundles.',
      badge: 'Save 20%',
      iconName: 'Tag'
    },
    {
      id: 'dev-updates',
      title: 'Development Updates',
      description: 'Follow design logbooks, mechanical blueprints, and localized testing on frozen Canadian terrain.',
      badge: 'Behind-the-Scenes',
      iconName: 'Code2'
    },
    {
      id: 'compat-updates',
      title: 'Compatibility Status Updates',
      description: 'Receive personalized logs notifying you as firmware is custom-coded for your precise vehicle model and year.',
      badge: 'Custom Match',
      iconName: 'RefreshCw'
    },
    {
      id: 'hardware-credit',
      title: 'Early Hardware Balance Credit',
      description: 'A special founder credit of $25.00 CAD will be credited to your account and applied automatically at checkout.',
      badge: '$25 CAD Included',
      iconName: 'BadgePercent'
    },
    {
      id: 'privacy-preview',
      title: 'Privacy Vehicle Intel Preview',
      description: 'Get developer tools and sandbox firmware previews to audit local encryption systems and OBD protocols.',
      badge: 'AES-256 Logs',
      iconName: 'EyeOff'
    }
  ];

  const renderIcon = (iconName: string) => {
    const classProps = "w-5 h-5 text-astrateq-cyan";
    switch(iconName) {
      case 'Lock': return <Lock className={classProps} />;
      case 'Tag': return <Tag className={classProps} />;
      case 'Code2': return <Code2 className={classProps} />;
      case 'RefreshCw': return <RefreshCw className={classProps} />;
      case 'BadgePercent': return <BadgePercent className={classProps} />;
      case 'EyeOff': return <EyeOff className={classProps} />;
      default: return <Lock className={classProps} />;
    }
  };

  return (
    <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-6" id="founder-benefits">
      <div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-astrateq-cyan font-bold block">
          FOUNDING SUITE
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
          Your Early Access Benefits
        </h2>
        <p className="text-xs text-white max-w-md mt-1 font-semibold">
          Each priority position receives the following credentials, discount thresholds, and private support keys.
        </p>
      </div>

      {/* Grid Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((benefit, i) => (
          <motion.div 
            key={benefit.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-xl bg-gradient-to-br from-astrateq-cyan/35 via-astrateq-blue/25 to-emerald-500/15 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.06)] hover:shadow-[0_0_25px_rgba(34,211,238,0.22)] hover:from-astrateq-cyan hover:via-astrateq-blue hover:to-emerald-500 transition-all duration-300 h-full"
            id={`benefit-${benefit.id}`}
          >
            <div className="bg-astrateq-card rounded-[11px] p-5 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-3">
                {/* Icon & Badge row */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-astrateq-cyan/10 flex items-center justify-center border border-astrateq-cyan/15">
                    {renderIcon(benefit.iconName)}
                  </div>
                  {benefit.badge && (
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-bold uppercase tracking-wider">
                      {benefit.badge}
                    </span>
                  )}
                </div>

                {/* Title and Description */}
                <h3 className="text-sm font-semibold font-display text-white tracking-wide">
                  {benefit.title}
                </h3>

                <p className="text-[11.5px] text-white leading-relaxed font-sans font-medium">
                  {benefit.description}
                </p>
              </div>

              <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-200 font-bold uppercase tracking-widest">
                  BENEFIT SECURED
                </span>
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
