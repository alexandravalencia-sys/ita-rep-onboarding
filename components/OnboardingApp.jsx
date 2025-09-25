"use client";
import React, { useState, useEffect } from "react";

const BRAND = { green:"#1e3a34", gold:"#c9a646", offwhite:"#f7f6f2" };
const LOGO = "/Logo_LEXVOYAGE_transparent.png"; // file already in /public

const PLANNET_LINK = "https://www.plannetmarketing.com/alexy";
const WHATSAPP_LINK = "https://wa.me/447857047339";
const CALENDLY_LINK = "https://calendly.com/alexandravalencia-";
const CONTACT_EMAIL = "alexandravalencia.traveladvisor@gmail.com";

const benefits = [
  { title:"Earn on travel you book", desc:"Agent commission on hotels, flights, cruises, packages and more via approved suppliers." },
  { title:"Training & certifications", desc:"Supplier academies, webinars and InteleTravel University." },
  { title:"Personal travel perks", desc:"Occasional FAMs & agent rates (where offered). Not guaranteed." },
  { title:"Work from anywhere", desc:"Build part-time or full-time with low overheads." },
  { title:"Dedicated support", desc:"Back-office tools, supplier helplines & agent community." },
];

const Card = ({children,className=""}) => <div className={`card ${className}`}><div className="p-5 sm:p-6">{children}</div></div>;
const Btn  = ({children,href,onClick,variant="primary",disabled}) =>
  href ? (
    <a className={`btn ${variant==="primary"?"btn-primary":variant==="gold"?"btn-gold":"btn-outline"}`} href={disabled?undefined:href} target="_blank" rel="noreferrer" aria-disabled={disabled}>{children}</a>
  ) : (
    <button className={`btn ${variant==="primary"?"btn-primary":variant==="gold"?"btn-gold":"btn-outline"}`} onClick={disabled?undefined:onClick} disabled={disabled}>{children}</button>
  );

const Note = ({children}) => (
  <div className="note flex items-start gap-2">
    <svg className="w-4 h-4 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 6a.75.75 0 1 0-1.5 0v6.5a.75.75 0 0 0 1.5 0V8.25ZM12 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clipRule="evenodd"/></svg>
    <span>{children}</span>
  </div>
);

function StepBadge({ n, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold border"
        style={{
          backgroundColor: active ? BRAND.green : "#fff",
          color: active ? "#fff" : done ? BRAND.green : "#6b7280",
          borderColor: active ? BRAND.green : "#d1d5db",
        }}
      >
        {done ? "✓" : n}
      </div>
    </div>
  );
}

export default function OnboardingApp() {
  const [step, setStep] = useState(1);
  const total = 6;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("itaRepWizard") || "{}");
    if (saved.step) setStep(saved.step);
    if (saved.name) setName(saved.name);
    if (saved.email) setEmail(saved.email);
  }, []);
  useEffect(() => {
    localStorage.setItem("itaRepWizard", JSON.stringify({ step, name, email }));
  }, [step, name, email]);

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const canProceed = step !== 1 || (name.trim().length > 1 && emailOk);
  const next = () => {
    if (step === 1 && !canProceed) { setShowErrors(true); return; }
    setShowErrors(false); setStep(s => Math.min(total, s+1));
  };

  const Progress = () => {
    const pct = Math.round(((step - 1) / (total - 1)) * 100);
    return (
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{pct}%</span></div>
        <div className="progress-track"><div className="progress-bar" style={{ width: `${pct}%` }} /></div>
      </div>
    );
  };

  const StepHeader = ({ title, subtitle }) => (
    <div className="mb-4">
      <div className="text-xs uppercase tracking-wider text-gray-500">Step {step} of {total}</div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{color: BRAND.green}}>{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );

  const DesktopNav = () => (
    <div className="hidden lg:flex items-center justify-between gap-3">
      <button className="btn btn-outline" onClick={() => setStep(s => Math.max(1, s-1))} disabled={step===1}>← Back</button>
      <div className="flex items-center gap-2">
        <button className="btn btn-outline" onClick={() => setStep(1)}>Start again</button>
        <Btn onClick={next} disabled={!canProceed}>{step===total ? "Finish" : "Next →"}</Btn>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-900" style={{ background: `linear-gradient(180deg, ${BRAND.offwhite}, #ffffff)` }}>
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-24 lg:pb-10">
        {/* Hero */}
        <div className="mb-8 sm:mb-12 text-center">
          <img src={LOGO} alt="LEXVOYAGE" className="h-16 sm:h-20 w-auto mx-auto mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{color: BRAND.green}}>
            Join LEXVOYAGE as an ITA & Rep
          </h1>
          <p className="mt-2 text-gray-600">A curated, mobile-first enrolment — clear, elegant, and fast.</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Btn href={PLANNET_LINK}>Start enrolment</Btn>
            <Btn href={CALENDLY_LINK} variant="outline">Book a call</Btn>
          </div>
        </div>

        {/* Progress + Required details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <Card className="lg:col-span-2"><Progress /></Card>
          <Card>
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Your name *</label>
                  <input className="input mt-1" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" />
                  {showErrors && name.trim().length <= 1 && <p className="text-xs text-red-600 mt-1">Please enter your name.</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <input className="input mt-1" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@email.com" />
                  {showErrors && !emailOk && <p className="text-xs text-red-600 mt-1">Please enter a valid email.</p>}
                </div>
              </div>
              <div className="text-xs text-gray-500">We’ll save this locally so you can continue later.</div>
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold" style={{color: BRAND.green}}>Benefits of becoming an ITA</h3>
              <button className="text-xs px-2 py-1 rounded-lg border" onClick={() => navigator.clipboard.writeText(benefits.map(b => `• ${b.title} — ${b.desc}`).join("\n"))}>Copy perks</button>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none mt-3">
              {benefits.map((b, i) => (
                <li key={i} className="p-4 rounded-xl border bg-white/80">
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{b.desc}</div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4">No guarantee of income. Perks and rates are at supplier discretion and may change.</p>
          </Card>
        </div>

        {/* Steps (clickable stepper is in the sidebar) */}
        {/* ... keep your existing steps or the version I shared earlier ... */}

        {/* Sticky mobile nav */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden border-t border-gray-200 bg-white/90 backdrop-blur px-4 py-3 flex items-center justify-between">
          <button className="btn btn-outline" onClick={() => setStep(s=>Math.max(1,s-1))} disabled={step===1}>Back</button>
          <Btn onClick={next} disabled={!canProceed}>{step===total?"Finish":"Next →"}</Btn>
        </div>
      </div>
    </div>
  );
}
