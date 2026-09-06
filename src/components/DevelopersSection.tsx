import React from 'react';
import { ExternalLink, Users, ArrowUpRight, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { DEVELOPERS_DIRECTORY } from '../data/companyData';
import { DeveloperItem } from '../types';

export const DevelopersSection: React.FC = () => {
  return (
    <section id="developers" className="py-16 md:py-24 border-t border-[#5E3122]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-[#1D4533] mb-4">
            <span className="w-4 h-[1px] bg-[#1D4533]" aria-hidden="true" />
            <Users className="w-3.5 h-3.5" />
            <span>Core Engineering & Talent Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D4533] tracking-tight mb-4">
            Engineers & Contributors
          </h2>
          <p className="text-base sm:text-lg text-[#5E3122] font-medium leading-relaxed opacity-90">
            The builders shaping our ventures. Each profile links directly to that developer's personal portfolio
            and independent repositories.
          </p>
        </motion.div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {DEVELOPERS_DIRECTORY.map((dev: DeveloperItem, index: number) => {
            return (
              <motion.a
                key={dev.id}
                href={dev.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`dev-profile-${dev.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative flex items-center justify-between p-5 rounded-xl bg-white shadow-md border-b-4 border-[#1D4533] hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                aria-label={`View ${dev.name}'s portfolio`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Avatar / Monogram Mark with circular Sophisticated Dark border */}
                  <div
                    className="w-12 h-12 rounded-full bg-[#1D4533] border-2 border-[#F9D2BA] flex items-center justify-center font-black text-xs tracking-tight text-[#F9D2BA] shrink-0 transition-transform group-hover:scale-105 shadow-xs"
                  >
                    {dev.avatarInitials}
                  </div>

                  {/* Name and Discipline */}
                  <div className="min-w-0 pr-2">
                    <h3 className="text-base font-bold text-[#1D4533] group-hover:text-[#5E3122] transition-colors truncate">
                      {dev.name}
                    </h3>
                    <p className="text-xs font-black uppercase tracking-wider text-[#5E3122] truncate mt-0.5">
                      {dev.role}
                    </p>
                    <p className="text-[11px] text-[#5E3122]/70 truncate mt-0.5 font-medium">
                      {dev.specialty}
                    </p>
                  </div>
                </div>

                {/* External Link Action */}
                <div className="w-9 h-9 rounded bg-[#F9D2BA] flex items-center justify-center text-[#1D4533] group-hover:bg-[#1D4533] group-hover:text-[#F9D2BA] shrink-0 transition-all shadow-xs">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Directory Architecture Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white shadow-sm border border-[#1D4533]/15 text-xs text-[#5E3122]">
          <div className="flex items-center gap-2 font-medium">
            <Code2 className="w-4 h-4 text-[#1D4533] shrink-0" />
            <span>
              <strong className="text-[#1D4533]">Developer Governance:</strong> Septima Group does not host internal resumes or walled bios.
              Engineers maintain full ownership of their personal portfolio domains and open-source contributions.
            </span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1D4533] bg-[#F9D2BA] px-3 py-1.5 rounded whitespace-nowrap shadow-xs">
            {DEVELOPERS_DIRECTORY.length} Listed Specialists
          </span>
        </div>
      </div>
    </section>
  );
};
