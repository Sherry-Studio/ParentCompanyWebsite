import React from 'react';
import { Compass, Target, Shield, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PILLARS } from '../data/companyData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-[#5E3122]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-[#1D4533] mb-4">
            <span className="w-4 h-[1px] bg-[#1D4533]" aria-hidden="true" />
            <Compass className="w-3.5 h-3.5" />
            <span>Corporate Stewardship & Mandate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D4533] tracking-tight mb-4">
            About Septima Group
          </h2>
          <p className="text-lg text-[#5E3122] font-medium leading-relaxed opacity-90">
            Founded as an umbrella parent institution, Septima Group provides the structural foundation,
            long-term capital, and cross-discipline governance that enable specialized ventures to excel in their domains.
          </p>
        </motion.div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-xl bg-white shadow-md border-b-4 border-[#1D4533] hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-[#F9D2BA] text-[#1D4533] flex items-center justify-center font-black mb-6 shadow-xs border border-[#1D4533]/10">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1D4533] mb-3 uppercase tracking-tight">Our Mission</h3>
            <p className="text-[#5E3122] font-medium leading-relaxed mb-4">
              To steward focused creative and technical teams by handling operational complexities,
              ensuring disciplined capitalization, and insulating developers and studio leaders so they can focus
              uncompromisingly on product craft.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5E3122] font-semibold border-t border-[#F7EAE0] pt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D4533] shrink-0 mt-0.5" />
                <span>Protecting creator autonomy within each portfolio entity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D4533] shrink-0 mt-0.5" />
                <span>Consolidating enterprise overhead, legal, and operational systems</span>
              </li>
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-xl bg-white shadow-md border-b-4 border-[#1D4533] hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-[#1D4533] text-[#F9D2BA] flex items-center justify-center font-black mb-6 shadow-xs border border-[#F9D2BA]/30">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1D4533] mb-3 uppercase tracking-tight">Our Vision</h3>
            <p className="text-[#5E3122] font-medium leading-relaxed mb-4">
              To cultivate a resilient constellation of high-impact technology and interactive entertainment companies
              known globally for engineering rigor, narrative depth, and enduring value creation.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5E3122] font-semibold border-t border-[#F7EAE0] pt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D4533] shrink-0 mt-0.5" />
                <span>Decade-scale commitment to technological resilience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D4533] shrink-0 mt-0.5" />
                <span>Direct alignment between holding governance and engineering teams</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* The Holding Model / What We Represent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="p-8 md:p-10 rounded-2xl bg-[#1D4533] text-[#F7EAE0] mb-16 shadow-xl border-t-4 border-[#F9D2BA]"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F9D2BA]">
              Holding Model Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
              What Septima Group Represents as a Parent Brand
            </h3>
            <p className="text-[#F7EAE0]/90 leading-relaxed text-sm sm:text-base font-medium">
              Unlike traditional conglomerates that impose rigid corporate hierarchies, Septima Group operates
              as an umbrella guild. We believe specialized ventures flourish when guided by distinct brand identities,
              dedicated engineering philosophies, and focused customer relationships, underpinned by institutional stability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#2a6148]">
            {PILLARS.map((pillar, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bold text-[#F9D2BA] text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#255741] text-[#F9D2BA] text-xs flex items-center justify-center font-black border border-[#F9D2BA]/20">
                    0{idx + 1}
                  </span>
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#F7EAE0]/80 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Founding Story & Milestones (Clean designated placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-xl bg-white shadow-sm border-2 border-dashed border-[#1D4533]/25 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E8DACD]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#F9D2BA] text-[#1D4533]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black uppercase tracking-wider text-[#1D4533]">Founding Story & Heritage</h4>
                <p className="text-xs text-[#5E3122]/75 font-medium">Genesis, formation milestones, and historical archive</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded bg-[#F7EAE0] text-[#1D4533] border border-[#1D4533]/15">
              <Clock className="w-3.5 h-3.5" />
              <span>Section Placeholder — To Be Populated</span>
            </span>
          </div>

          <div className="text-sm text-[#5E3122]/85 max-w-none space-y-3 font-medium">
            <p>
              <em>
                [Placeholder: Detailed chronological background documenting the inception of Septima Group,
                original founder insights, and key portfolio milestones will be published in this section upon executive ratification.]
              </em>
            </p>
            <p className="text-xs text-[#5E3122]/70 font-normal">
              For archival documents or corporate history inquiries in the interim, please reach out to our corporate communications office via the contact section below.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
