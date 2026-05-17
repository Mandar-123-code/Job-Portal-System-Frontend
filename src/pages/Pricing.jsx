import { useState } from "react";
import { Link } from "react-router-dom";

function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [activeFaq, setActiveFaq] = useState(null);

  const role = localStorage.getItem("role");
  const isCandidate = role === "candidate";

  const plans = [
    {
      name: "Free",
      description: "Try our core features and post your first role.",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Post 1 active job listing",
        "Standard candidate tracking dashboard",
        "Public job board syndication",
        "Email support (response within 72h)",
      ],
      cta: "Sign Up Free",
      highlight: false,
      isFree: true,
    },
    {
      name: "Starter",
      description: "Ideal for growing teams posting multiple roles.",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Post up to 5 active jobs at a time",
        "Advanced direct candidate match indexing",
        "Shortlist & candidate tagging",
        "Priority email support (under 24h)",
      ],
      cta: "Get Started",
      highlight: false,
      isFree: false,
    },
    {
      name: "Professional",
      description: "Best for scaling companies hiring continuously.",
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        "Unlimited active job postings",
        "Live technical screening challenges",
        "Custom applicant pre-screen forms",
        "Dedicated recruiting expert support",
        "Verified recruiter company badge",
      ],
      cta: "Start Free Trial",
      highlight: true,
      isFree: false,
    },
  ];

  const faqs = [
    {
      q: "Can I cancel or change plans at any time?",
      a: "Yes! You can upgrade, downgrade, or cancel your active subscription at any time directly through the recruiter billing portal. Changes will take effect at the end of the current billing cycle.",
    },
    {
      q: "Is there a free trial option available?",
      a: "Yes, our Professional plan includes a 14-day free trial. You won't be charged until the trial period ends, and you can cancel anytime.",
    },
    {
      q: "Do you offer enterprise-level solutions?",
      a: "We absolutely do. If you have custom ATS integrations, require single sign-on (SSO), or have massive high-volume hiring requirements, contact our corporate sales team for a custom contract.",
    },
  ];

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  if (isCandidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center animate-fade-in">
          <span className="text-6xl block mb-4">💼</span>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Employer Page Only</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Pricing plans and recruiter tools are reserved exclusively for employers and hiring managers. 
            As a candidate, your profile, search features, and job applications are <strong className="text-indigo-600">100% free</strong> forever!
          </p>
          <Link
            to="/jobs"
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors"
          >
            Find a Job Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">
            Fair Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 tracking-tight">
            Plans for Teams of All Sizes
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-3">
            Choose the subscription tier that matches your current recruiting pace. Save up to 20% on our annual commitment plans.
          </p>

          {/* Monthly / Annual Toggle Switch */}
          <div className="flex items-center justify-center gap-4 mt-8 bg-gray-100/50 p-2 rounded-2xl w-fit mx-auto border border-gray-100">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`text-sm font-bold transition-all px-3 py-1.5 rounded-xl focus:outline-none ${
                billingPeriod === "monthly"
                  ? "text-indigo-600 bg-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Monthly billing
            </button>
            
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="w-14 h-8 bg-gray-950 rounded-full p-1 transition-all duration-300 flex items-center relative focus:outline-none shadow-inner cursor-pointer"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow transition-all duration-300 transform ${
                  billingPeriod === "annual" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <button
              onClick={() => setBillingPeriod("annual")}
              className={`text-sm font-bold transition-all px-3 py-1.5 rounded-xl flex items-center gap-1.5 focus:outline-none ${
                billingPeriod === "annual"
                  ? "text-indigo-600 bg-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Annual billing 
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((plan, idx) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <div
                key={idx}
                className={`rounded-3xl p-8 transition-all duration-300 relative border flex flex-col justify-between ${
                  plan.highlight
                    ? "bg-white border-indigo-600 shadow-xl scale-105 z-10"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute top-0 right-8 transform -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 h-12 overflow-hidden">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className={`text-5xl font-extrabold tracking-tight ${plan.highlight ? "text-indigo-600" : "text-gray-900"}`}>
                      ${price}
                    </span>
                    <span className="text-gray-400 text-sm">{billingPeriod === "monthly" ? "/ month" : "/ year" }</span>
                  </div>

                  <ul className="space-y-3.5 border-t border-gray-100 pt-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="text-indigo-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <Link
                    to="/signup"
                    className={`block w-full text-center py-4 rounded-2xl font-bold transition shadow-sm ${
                      plan.highlight
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100"
                        : plan.isFree
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    {plan.isFree ? "No credit card required." : "Cancel anytime. No signup fees."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xl transform transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                      ＋
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 text-sm text-gray-500 border-t border-gray-50 leading-relaxed bg-gray-50/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;
