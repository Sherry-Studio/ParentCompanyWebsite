import React, { useState } from 'react';
import { Check, Copy, CheckCircle2, AlertCircle, Linkedin, Github, Twitter } from 'lucide-react';
import { MaskLine } from '../lib/anim';
import { COMPANY_INFO } from '../data/companyData';
import { ContactFormData, SubmissionStatus } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<SubmissionStatus>({ state: 'idle', message: '' });
  const [copied, setCopied] = useState(false);

  const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_ID || 'xbjnqzzq';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in Name, Email and Message.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ state: 'submitting', message: 'Sending…' });
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Inquiry via Septima Group website',
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus({ state: 'success', message: 'Thanks — your message has reached the studio.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json().catch(() => null);
        setStatus({
          state: 'error',
          message: data?.errors?.[0]?.message || `Something went wrong. Email us at ${COMPANY_INFO.contactEmail}`,
        });
      }
    } catch {
      setStatus({ state: 'error', message: `Network issue. Email us directly at ${COMPANY_INFO.contactEmail}` });
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(COMPANY_INFO.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const field =
    'w-full border-b border-forest/25 bg-transparent py-3 text-forest placeholder:text-clay/40 focus:border-forest focus:outline-none transition-colors';

  return (
    <section id="contact" className="relative bg-paper text-forest">
      <div className="u-container grid gap-14 py-24 md:grid-cols-2 md:py-36">
        <div>
          <span className="t-eyebrow text-clay/70">08 — Contact</span>
          <h2 className="t-h2 mt-5">
            <MaskLine text="Start a" />
            <span className="t-serif italic font-normal">conversation.</span>
          </h2>
          <p className="mt-6 max-w-sm text-clay/80">
            For product partnerships, custom builds, or press. We read everything that comes through.
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="group mt-10 flex items-center gap-3 text-lg font-extrabold tracking-tight"
          >
            {COMPANY_INFO.contactEmail}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-forest/25 text-forest transition-colors group-hover:bg-forest group-hover:text-cream">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-3.5 w-3.5" />}
            </span>
          </button>

          <div className="mt-8 flex gap-3">
            {[
              { href: COMPANY_INFO.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: COMPANY_INFO.socials.github, Icon: Github, label: 'GitHub' },
              { href: COMPANY_INFO.socials.x, Icon: Twitter, label: 'X' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Septima Group on ${label}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="mt-10 text-xs text-clay/55">
            {COMPANY_INFO.legalName} · {COMPANY_INFO.corporateAddress}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="corporate-contact-form">
          {status.state === 'success' && (
            <div className="flex items-start gap-3 rounded-lg border border-forest/20 bg-forest/5 p-4 text-sm animate-fadeIn">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
              <p>{status.message}</p>
            </div>
          )}
          {status.state === 'error' && (
            <div className="flex items-start gap-3 rounded-lg border border-clay/30 bg-clay/5 p-4 text-sm animate-fadeIn">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
              <p>{status.message}</p>
            </div>
          )}

          <label className="block">
            <span className="t-eyebrow text-clay/60">Name *</span>
            <input name="name" value={formData.name} onChange={handleChange} required className={field} placeholder="Your name" />
          </label>
          <label className="block">
            <span className="t-eyebrow text-clay/60">Email *</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={field} placeholder="you@company.com" />
          </label>
          <label className="block">
            <span className="t-eyebrow text-clay/60">Subject</span>
            <input name="subject" value={formData.subject} onChange={handleChange} className={field} placeholder="Product · Custom build · Press" />
          </label>
          <label className="block">
            <span className="t-eyebrow text-clay/60">Message *</span>
            <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required className={`${field} resize-y`} placeholder="What are you building?" />
          </label>

          <button
            type="submit"
            id="contact-submit-btn"
            disabled={status.state === 'submitting'}
            data-cursor="Send"
            className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-forest px-8 py-3.5 t-eyebrow text-cream transition-colors hover:bg-ink disabled:opacity-50"
          >
            {status.state === 'submitting' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
};
