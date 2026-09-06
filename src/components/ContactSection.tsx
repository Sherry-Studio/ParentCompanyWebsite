import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, Linkedin, Github, Twitter, MapPin, Building } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ContactFormData, SubmissionStatus } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<SubmissionStatus>({
    state: 'idle',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  // Formspree endpoint configuration
  // You can set VITE_FORMSPREE_ID in your .env or replace this default form ID
  const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_ID || 'xbjnqzzq';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        state: 'error',
        message: 'Please fill in all required fields (Name, Email, and Message).',
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        state: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setStatus({ state: 'submitting', message: 'Transmitting inquiry...' });

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Inquiry via Septima Group Corporate Website',
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({
          state: 'success',
          message: 'Thank you. Your message has been routed to Septima Group corporate communications.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json().catch(() => null);
        // If Formspree ID is unconfigured or returns error, provide graceful explanation
        setStatus({
          state: 'error',
          message:
            data?.errors?.[0]?.message ||
            'Notice: Formspree endpoint returned a response issue. Please email us directly at ' +
              COMPANY_INFO.contactEmail,
        });
      }
    } catch (err) {
      // In local preview/sandboxes without network access, show friendly fallback
      setStatus({
        state: 'error',
        message:
          'Network connection interrupted. You can also reach our desk directly at ' +
          COMPANY_INFO.contactEmail,
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_INFO.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-[#5E3122]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Corporate Channels & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-[#1D4533] mb-4">
                <span className="w-4 h-[1px] bg-[#1D4533]" aria-hidden="true" />
                <Mail className="w-3.5 h-3.5" />
                <span>Executive Office & Channels</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D4533] tracking-tight mb-4">
                Contact Septima Group
              </h2>
              <p className="text-base text-[#5E3122] font-medium leading-relaxed mb-8 opacity-90">
                For venture incubation, institutional inquiries, strategic partnerships, or press briefings,
                reach our corporate team through the form or our direct lines.
              </p>

              {/* Primary Contact Card */}
              <div className="p-6 rounded-xl bg-white shadow-md border-b-4 border-[#1D4533] mb-6">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D4533] mb-2">
                  Direct Inquiries & Press
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-bold text-[#1D4533] select-all font-mono">
                    {COMPANY_INFO.contactEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded bg-[#F9D2BA] text-[#1D4533] hover:bg-[#f7c0a0] transition-colors shadow-xs"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-800" />
                        <span className="text-green-800">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Company Information & Headquarters */}
              <div className="space-y-4 mb-8 text-xs font-medium text-[#5E3122]">
                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-[#1D4533] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1D4533]">Legal Entity:</span>{' '}
                    {COMPANY_INFO.legalName}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1D4533] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1D4533]">Location:</span>{' '}
                    {COMPANY_INFO.corporateAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-6 border-t border-[#5E3122]/15">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D4533] mb-3">
                Corporate Social Presence
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1D4533] border border-[#F9D2BA]/30 flex items-center justify-center text-[#F9D2BA] hover:bg-[#F9D2BA] hover:text-[#1D4533] transition-colors shadow-xs"
                  aria-label="Septima Group on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1D4533] border border-[#F9D2BA]/30 flex items-center justify-center text-[#F9D2BA] hover:bg-[#F9D2BA] hover:text-[#1D4533] transition-colors shadow-xs"
                  aria-label="Septima Group on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1D4533] border border-[#F9D2BA]/30 flex items-center justify-center text-[#F9D2BA] hover:bg-[#F9D2BA] hover:text-[#1D4533] transition-colors shadow-xs"
                  aria-label="Septima Group on X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#1D4533] text-white shadow-xl border-t-4 border-[#F9D2BA]">
              <h3 className="text-xs uppercase tracking-[0.2em] font-black text-[#F9D2BA] mb-1">
                Direct Inquiry Form
              </h3>
              <p className="text-xs text-[#F7EAE0]/75 mb-6 font-medium">
                Client-side transmission powered by Formspree. No server or database dependencies.
              </p>

              {/* Status Alert Banner */}
              {status.state === 'success' && (
                <div className="p-4 mb-6 rounded-lg bg-emerald-950/80 border border-emerald-400 text-emerald-100 text-sm flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-white">Message Dispatched</strong>
                    <p className="mt-0.5 text-xs text-emerald-200">{status.message}</p>
                  </div>
                </div>
              )}

              {status.state === 'error' && (
                <div className="p-4 mb-6 rounded-lg bg-amber-950/80 border border-amber-400 text-amber-100 text-sm flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-white">Notice</strong>
                    <p className="mt-0.5 text-xs text-amber-200">{status.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" id="corporate-contact-form">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[10px] font-black uppercase tracking-widest text-[#F9D2BA] mb-1.5"
                  >
                    Full Name <span className="text-[#F9D2BA]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#F9D2BA] focus:ring-1 focus:ring-[#F9D2BA] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[10px] font-black uppercase tracking-widest text-[#F9D2BA] mb-1.5"
                  >
                    Corporate or Personal Email <span className="text-[#F9D2BA]">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#F9D2BA] focus:ring-1 focus:ring-[#F9D2BA] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[10px] font-black uppercase tracking-widest text-[#F9D2BA] mb-1.5"
                  >
                    Subject / Nature of Inquiry
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Partnership, Venture Proposal, Media, or General"
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#F9D2BA] focus:ring-1 focus:ring-[#F9D2BA] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] font-black uppercase tracking-widest text-[#F9D2BA] mb-1.5"
                  >
                    Message <span className="text-[#F9D2BA]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please outline the purpose of your inquiry..."
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#F9D2BA] focus:ring-1 focus:ring-[#F9D2BA] transition-all resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={status.state === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#F9D2BA] text-[#1D4533] font-black text-xs uppercase tracking-widest hover:bg-white active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                  >
                    {status.state === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1D4533] border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
