import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, Check, CheckCircle2, Copy, Linkedin, Plus } from 'lucide-react';
import { COMPANY_INFO, FAQS, SERVICES } from '../data/companyData';
import { ContactFormData, SubmissionStatus } from '../types';
import { SectionHeading } from '../components/Decor';
import { Reveal } from '../lib/anim';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>({ state: 'idle', message: '' });
  const [copied, setCopied] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_ID || 'xbjnqzzq';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in your name, email and a short message.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ state: 'error', message: 'That email address does not look right.' });
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
          company: formData.company || '—',
          service: formData.service || 'Not specified',
          subject: `New enquiry via ${COMPANY_INFO.name} website`,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus({
          state: 'success',
          message: 'Thanks — your message is through. We reply within one business day.',
        });
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      } else {
        const data = await res.json().catch(() => null);
        setStatus({
          state: 'error',
          message:
            data?.errors?.[0]?.message ||
            `Something went wrong. Email us directly at ${COMPANY_INFO.contactEmail}`,
        });
      }
    } catch {
      setStatus({
        state: 'error',
        message: `Network issue. Email us directly at ${COMPANY_INFO.contactEmail}`,
      });
    }
  };

  const copyEmail = async (address: string) => {
    try {
      await navigator.clipboard?.writeText(address);
      setCopied(address);
      window.setTimeout(() => setCopied(null), 2200);
    } catch {
      /* clipboard unavailable — the address is visible anyway */
    }
  };

  const field =
    'w-full border-b border-navy-soft/20 bg-transparent py-3 text-navy-soft placeholder:text-navy-soft/35 focus:border-signal focus:outline-none transition-colors';

  return (
    <section id="contact" className="relative overflow-hidden bg-chalk py-24 text-navy-soft md:py-36">
      <div className="u-container relative z-10 grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            tone="light"
            eyebrow="Contact"
            title="Tell us what"
            accent="you are building."
            lead="A short call is usually enough to tell whether we are the right team. No pitch deck, no obligation."
          />

          <Reveal delay={0.1}>
            <div className="mt-10">
              <span className="t-eyebrow text-navy-soft/45">Email us</span>
              <ul className="mt-4 space-y-2.5">
                {COMPANY_INFO.contactEmails.map((address, i) => (
                  <li key={address} className="flex items-center gap-3">
                    <a
                      href={`mailto:${address}`}
                      className={`link-underline font-bold tracking-[-0.02em] ${
                        i === 0 ? 'text-lg' : 'text-base text-navy-soft/75'
                      }`}
                    >
                      {address}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyEmail(address)}
                      aria-label={`Copy email address ${address}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-soft/20 transition-colors hover:bg-navy-soft hover:text-mist"
                    >
                      {copied === address ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Byesplus on LinkedIn"
                className="mt-7 inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy-soft/20 transition-colors hover:bg-navy-soft hover:text-mist"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* FAQ */}
          <div className="mt-14 border-t border-navy-soft/12">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="border-b border-navy-soft/12">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-sm font-semibold">{faq.q}</span>
                    <Plus
                      className={`h-4 w-4 shrink-0 text-signal-deep transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <p className="pb-6 pr-8 text-sm leading-relaxed text-navy-soft/65">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            id="contact-form"
            className="flex flex-col gap-7 rounded-3xl border border-navy-soft/12 bg-mist/60 p-8 md:p-10"
            noValidate
          >
            <AnimatePresence>
              {status.state === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-signal/35 bg-signal/10 p-4 text-sm"
                  role="status"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-signal-deep" aria-hidden="true" />
                  <p>{status.message}</p>
                </motion.div>
              )}
              {status.state === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.07] p-4 text-sm"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <p>{status.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="t-eyebrow text-navy-soft/50">Name *</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className={field}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="t-eyebrow text-navy-soft/50">Email *</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={field}
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="t-eyebrow text-navy-soft/50">Company</span>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className={field}
                  placeholder="Company name"
                />
              </label>
              <label className="block">
                <span className="t-eyebrow text-navy-soft/50">What do you need?</span>
                <select name="service" value={formData.service} onChange={handleChange} className={field}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="t-eyebrow text-navy-soft/50">Message *</span>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className={`${field} resize-y`}
                placeholder="What are you trying to build, fix or automate?"
              />
            </label>

            <button
              type="submit"
              disabled={status.state === 'submitting'}
              data-cursor="Send"
              className="btn-signal t-eyebrow mt-1 self-start disabled:cursor-not-allowed disabled:opacity-55"
            >
              {status.state === 'submitting' ? 'Sending…' : 'Send message'}
              <span aria-hidden="true">+</span>
            </button>

            <p className="t-mono text-[11px] leading-relaxed text-navy-soft/45">
              We use your details only to reply to this enquiry.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
