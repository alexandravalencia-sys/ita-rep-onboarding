"use client";
import React, { useState, useEffect } from "react";

// ===== Brand tokens =====
const BRAND = {
  green: "#1e3a34", // deep bottle green
  gold: "#c9a646",  // soft brushed gold
  offwhite: "#f7f6f2",
  ink: "#111111",
};

// Use the exact filenames you uploaded to /public
const LOGOS = {
  color: "/Logo_LEXVOYAGE_transparent.png",
  white: "/LEXVOYAGE_logo_white_transparent.png",
  black: "/Logo_LEXVOYAGE_black.png",
};

const PLANNET_LINK = "https://www.plannetmarketing.com/alexy";
const WHATSAPP_LINK = "https://wa.me/447857047339";
const CALENDLY_LINK = "https://calendly.com/alexandravalencia-";
const CONTACT_EMAIL = "alexandravalencia.traveladvisor@gmail.com";

// ===== Small UI helpers =====
function StepBadge({ n, active, done }) {
  return (
    <div className={`flex items-center gap-2 ${done ? "opacity-60" : ""}`}>
      <div
        className="h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold border"
        style={{
          backgroundColor: active ? BRAND.green : "#fff",
          color: active ? "#fff" : done ? BRAND.green : "#6b7280",
          borderColor: active ? BRAND.green : "#D1D5DB",
        }}
      >
        {done ? "✓" : n}
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/90 backdrop-blur rounded-3xl shadow-lg border border-white/40 ${className}`}
    >
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

function CTA({ href, onClick, children, variant = "primary" }) {
  const base =
    "px-4 sm:px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed text-center inline-flex items-center justify-center";
  const style =
    variant === "primary"
      ? { backgroundColor: BRAND.green, color: "#fff" }
      : variant === "gold"
      ? { backgroundColor: BRAND.gold, color: "#111" }
      : { border: "1px solid #D1D5DB", color: "#111", backgroundColor: "#fff" };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={base} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={base} style={style}>
      {children}
    </button>
  );
}

function Note({ children }) {
  return (
    <div className="flex gap-3 p-3 rounded-xl text-sm"
         style={{ background:"#FFFBEB", border:"1px solid #FDE68A", color:"#92400E" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
           fill="currentColor" className="w-5 h-5 shrink-0">
        <path fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 6a.75.75 0 1 0-1.5 0v6.5a.75.75 0 0 0 1.5 0V8.25ZM12 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
              clipRule="evenodd"/>
      </svg>
      <div>{children}</div>
    </div>
  );
}

function TickItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
           fill="currentColor" className="w-5 h-5 mt-0.5" style={{ color:"#059669" }}>
        <path fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.38-1.38a.75.75 0 0 0-1.06 1.06l1.91 1.91a.75.75 0 0 0 1.06 0l5.25-5.25Z"
              clipRule="evenodd"/>
      </svg>
      <span>{children}</span>
    </li>
  );
}

const benefits = [
  { title: "Earn on travel you book", desc: "Receive travel agent commission on hotels, flights, cruises, packages and more through approved suppliers." },
  { title: "Training & certifications", desc: "Supplier academies, webinars and InteleTravel University to build confidence." },
  { title: "Personal travel perks", desc: "From FAM opportunities to agent-only rates (where available). Perks vary and aren’t guaranteed." },
  { title: "Work from anywhere", desc: "Build your client book part-time or full-time with low overheads." },
  { title: "Dedicated support", desc: "Back-office tools, supplier helplines and a community of agents." },
];

function Progress({ step, total }) {
  const pct = Math.round(((step - 1) / (total - 1)) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: BRAND.green }} />
      </div>
    </div>
  );
}

function CopyText({ text, label = "Copy" }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600);} catch (e) {}
      }}
      className="text-xs px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      {ok ? "Copied ✔" : label}
    </button>
  );
}

function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3"
              style={{ background:"#F8FAFC" }}>
        <div className="text-left font-semibold">{title}</div>
        <div>{open ? "−" : "+"}</div>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

function SaveBar({ name, email, onClear }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
      <div className="flex-1">
        Progress saved for <span className="font-semibold">{name || "Guest"}</span>{email ? ` · ${email}` : ""}
      </div>
      <button
        onClick={() => { onClear?.(); setSaved(true); setTimeout(() => setSaved(false), 1600); }}
        className="px-3 py-2 rounded-lg hover:bg-gray-50"
        style={{ border:"1px solid #D1D5DB" }}
      >
        {saved ? "Cleared ✔" : "Clear local data"}
      </button>
    </div>
  );
}

// ===== Main App =====
export default function App() {
  const [step, setStep] = useState(1);
  const total = 6;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("itaRepWizard") || "{}");
    if (saved.step) setStep(saved.step);
    if (saved.name) setName(saved.name);
    if (saved.email) setEmail(saved.email);
  }, []);
  useEffect(() => {
    localStorage.setItem("itaRepWizard", JSON.stringify({ step, name, email }));
  }, [step, name, email]);

  const StepHeader = ({ title, subtitle }) => (
    <div className="mb-4">
      <div className="text-xs uppercase tracking-wider text-gray-500">Step {step} of {total}</div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{color: BRAND.green}}>{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );

  const Nav = () => (
    <div className="flex items-center justify-between gap-3">
      <button
        className="px-4 py-2 rounded-xl hover:bg-gray-50 disabled:opacity-40"
        style={{ border:"1px solid #D1D5DB" }}
        onClick={() => setStep((s) => Math.max(1, s - 1))}
        disabled={step === 1}
      >
        ← Back
      </button>
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 rounded-xl hover:bg-gray-50"
          style={{ border:"1px solid #D1D5DB" }}
          onClick={() => setStep(1)}
        >
          Start again
        </button>
        <CTA onClick={() => setStep((s) => Math.min(total, s + 1))}>
          {step === total ? "Finish" : "Next →"}
        </CTA>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-900"
         style={{ background: `radial-gradient(1000px 600px at 20% -10%, ${BRAND.offwhite}, #ffffff 50%), linear-gradient(120deg, ${BRAND.offwhite}, #ffffff)` }}>
      <div className="max-w-5xl mx-auto px-4 pb-28 pt-6 sm:pt-10">
        {/* Luxe header */}
        <div className="mb-6 sm:mb-10 flex flex-col items-center text-center">
          <img src={LOGOS.color} alt="LEXVOYAGE" className="h-16 sm:h-20 w-auto mb-3" />
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight" style={{color: BRAND.green}}>
            Join LEXVOYAGE as an ITA & Rep
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            A curated, step-by-step enrolment—clear, elegant, and mobile-friendly.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <CTA href={PLANNET_LINK}>Start enrolment</CTA>
            <CTA href={CALENDLY_LINK} variant="outline">Book a call</CTA>
          </div>
        </div>

        {/* Progress & Save */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <Card className="lg:col-span-2"><Progress step={step} total={total} /></Card>
          <Card>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input className="px-3 py-2 border border-gray-300 rounded-xl" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="px-3 py-2 border border-gray-300 rounded-xl" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <SaveBar name={name} email={email} onClear={() => { localStorage.removeItem("itaRepWizard"); setName(""); setEmail(""); setStep(1); }} />
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold" style={{color: BRAND.green}}>Benefits of becoming an ITA</h3>
              <CopyText label="Copy perks" text={benefits.map(b => `• ${b.title} — ${b.desc}`).join("\n")} />
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none mt-3">
              {benefits.map((b, i) => (
                <li key={i} className="p-4 rounded-xl border border-gray-200 bg-white/80">
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{b.desc}</div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4">No guarantee of income. Perks, rates and offers are at supplier discretion and may change.</p>
          </Card>
        </div>

        {/* Wizard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-5">
            {step === 1 && (
              <Card>
                <StepHeader title="Create your PlanNet Marketing Rep account" subtitle="Unlock your Virtual Office to purchase the ITA." />
                <Note>Date of birth must be entered in US format: <strong>MM/DD/YYYY</strong>.</Note>
                <div className="mt-4 space-y-4">
                  <ol className="space-y-3 list-decimal pl-6">
                    <li>
                      Open the enrolment link{" "}
                      <a className="text-blue-600 underline" href={PLANNET_LINK} target="_blank" rel="noreferrer">
                        plannetmarketing.com/alexy
                      </a>{" "}
                      <CTA href={PLANNET_LINK}>Open enrolment</CTA>
                    </li>
                    <li>Ensure the <strong>UK flag</strong> is selected (top-right) if the UK is your base country.</li>
                    <li>Go to <strong>Your Business → Learn More</strong>.</li>
                    <li>Scroll and click <strong>Enrol Now</strong> (you may be asked to click it twice).</li>
                    <li>Choose your Rep option:
                      <ul className="list-disc pl-6 mt-2 text-sm">
                        <li><strong>Rep only</strong> for $19.95</li>
                        <li><strong>Rep + Mobile App</strong> for $20.95</li>
                      </ul>
                    </li>
                    <li>Select <strong>Individual</strong>.</li>
                    <li>Complete your personal and account information (keep the boxes checked to receive important updates).</li>
                    <li>Set a password (use the <strong>ⓘ</strong> icon to view requirements).</li>
                    <li>Enter your address and payment details. If your billing address differs, select <em>Use a different address</em> and enter the registered billing address.</li>
                    <li>Select your <strong>Username</strong> and <strong>Display name</strong> (check the <strong>ⓘ</strong> guidance).</li>
                    <li>Tick <strong>I agree</strong> and <strong>I am not a robot</strong>, then click <strong>Submit & Create my account</strong>.</li>
                  </ol>
                </div>
                <div className="mt-6 flex justify-between">
                  <div className="text-sm text-gray-500">Having trouble? Take screenshots of any error and contact your sponsor.</div>
                  <Nav />
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <StepHeader title="Verify your email & log into your Virtual Office" subtitle="Look for the confirmation email from PlanNet Marketing." />
                <ol className="space-y-3 list-decimal pl-6">
                  <li>Open the confirmation email and complete verification.</li>
                  <li>Log in to your <strong>Virtual Office</strong> (PlanNet Marketing).</li>
                  <li>Confirm the <strong>UK flag</strong> is visible in the top-right.</li>
                </ol>
                <div className="mt-6"><Nav /></div>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <StepHeader title="Purchase your InteleTravel ITA" subtitle="This is where you become an Independent Travel Agent." />
                <Note>Your <strong>NI number</strong> is requested as a unique reference for commission payments. It is <em>not</em> used for tax filing by InteleTravel.</Note>
                <ol className="space-y-3 list-decimal pl-6 mt-4">
                  <li>Inside Virtual Office, scroll the left-hand menu and click <strong>Purchase ITA Now</strong>.</li>
                  <li>Confirm the <strong>Country = United Kingdom</strong>.</li>
                  <li>Most fields are pre-filled; add any missing details.</li>
                  <li>Enter your <strong>NI number</strong> (for commission reference).</li>
                  <li>Complete payment details and answer the required questions.</li>
                  <li>Initial the agreement boxes to confirm you agree, then click <strong>Enrol Now</strong>.</li>
                </ol>
                <div className="mt-6"><Nav /></div>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <StepHeader title="Final checks" subtitle="Make sure you can access the essentials before you celebrate." />
                <ul className="space-y-3 list-none">
                  <TickItem>Log in to <strong>InteleTravel Back Office</strong> and locate your training dashboard.</TickItem>
                  <TickItem>Find your unique <strong>Agent ID</strong> and save it securely.</TickItem>
                  <TickItem>Whitelist official emails so you never miss supplier updates.</TickItem>
                  <TickItem>Join the team community group shared by your sponsor.</TickItem>
                </ul>
                <div className="mt-6"><Nav /></div>
              </Card>
            )}

            {step === 5 && (
              <Card>
                <StepHeader title="You’re set!" subtitle="Elegant next steps to get your first wins." />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <div className="font-semibold mb-2">Quick wins (today)</div>
                    <ul className="list-disc pl-6 text-sm space-y-2">
                      <li>Complete your introductory compliance/training modules.</li>
                      <li>Announce your new travel service on social media (soft launch).</li>
                      <li>Make a list of 20 travellers you could serve next.</li>
                      <li>Set up your booking enquiry form and email signature.</li>
                    </ul>
                  </Card>
                  <Card>
                    <div className="font-semibold mb-2">Build momentum (this week)</div>
                    <ul className="list-disc pl-6 text-sm space-y-2">
                      <li>Register with 3–5 core UK suppliers.</li>
                      <li>Schedule two learning sessions (60–90 mins).</li>
                      <li>Create a simple client intake questionnaire.</li>
                      <li>Prepare a practice quote to learn the system.</li>
                    </ul>
                  </Card>
                </div>
                <div className="mt-6"><Nav /></div>
              </Card>
            )}

            {step === 6 && (
              <Card>
                <StepHeader title="Summary & resources" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Collapsible title="Key links" defaultOpen>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li>
                        PlanNet enrolment:{" "}
                        <a className="text-blue-600 underline" href={PLANNET_LINK} target="_blank" rel="noreferrer">
                          plannetmarketing.com/alexy
                        </a>{" "}
                        <CopyText text={PLANNET_LINK} />
                      </li>
                      <li>Virtual Office: check your confirmation email for login.</li>
                      <li>InteleTravel Back Office: provided after ITA purchase.</li>
                    </ul>
                  </Collapsible>
                  <Collapsible title="FAQs">
                    <div className="space-y-3 text-sm">
                      <div><div className="font-semibold">Why the US date format?</div> Some systems are US-based and require <strong>MM/DD/YYYY</strong>.</div>
                      <div><div className="font-semibold">Is my NI number used for tax?</div> No—only as a unique reference for commission payments.</div>
                      <div><div className="font-semibold">Do you guarantee income?</div> No. Earnings depend on your effort, bookings, and market conditions.</div>
                    </div>
                  </Collapsible>
                </div>
                <div className="mt-6"><Nav /></div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <Card>
              {[1,2,3,4,5,6].map((n) => (
                <button key={n} onClick={() => setStep(n)} className="w-full flex items-center gap-3 mb-3 last:mb-0 text-left hover:bg-gray-50 rounded-xl px-2 py-2">
                  <StepBadge n={n} active={step === n} done={step > n} />
                  <div className="font-semibold">{["Rep account","Verify & Virtual Office","Purchase ITA","Final checks","Next steps","Summary"][n-1]}</div>
                </button>
              ))}
            </Card>

            <Card>
              <div className="font-semibold mb-2">Helpful tips</div>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>If a page doesn’t load, try a private/incognito window.</li>
                <li>Keep a note of your username, display name and Agent ID.</li>
                <li>Use a card with the correct billing address.</li>
              </ul>
            </Card>

            <Card>
              <div className="font-semibold mb-1">Need a hand?</div>
              <p className="text-sm text-gray-600 mb-3">If you get stuck, reach out directly and I’ll guide you.</p>
              <div className="grid grid-cols-1 gap-2">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full text-center px-4 py-2 rounded-xl text-white font-semibold hover:opacity-90" style={{background: BRAND.green}}>WhatsApp me</a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="w-full text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-50" style={{border:"1px solid #D1D5DB"}}>Email: {CONTACT_EMAIL}</a>
                <a href={CALENDLY_LINK} target="_blank" rel="noreferrer" className="w-full text-center px-4 py-2 rounded-xl text-black font-semibold hover:opacity-90" style={{background: BRAND.gold}}>Book a call (Calendly)</a>
              </div>
            </Card>
          </div>
        </div>

        {/* Sticky mobile nav */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden border-t border-gray-200 bg-white/90 backdrop-blur px-4 py-3 flex items-center justify-between">
          <button className="px-4 py-2 rounded-xl" style={{border:"1px solid #D1D5DB"}} onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>Back</button>
          <CTA onClick={() => setStep((s) => Math.min(total, s + 1))}>{step === total ? "Finish" : "Next →"}</CTA>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          This guide is provided for convenience only and is not official PlanNet Marketing or InteleTravel material. Always follow on-screen instructions and official policies.
        </p>
      </div>
    </div>
  );
}
