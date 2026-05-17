import { Link } from "react-router-dom";

function Terms() {
  const clauses = [
    {
      title: "1. Fair Use Guidelines",
      icon: "🤝",
      desc: "By registering on JobPortal, you agree to represent your professional experience, education history, and corporate entity identities truthfully. Impersonation of brands or false candidate profiles is strictly forbidden.",
    },
    {
      title: "2. Recruiter Fair Opportunity Policies",
      icon: "🏢",
      desc: "Recruiters and employers are strictly prohibited from listing duplicate listings, charging application fees under any circumstances, posting fake opportunity bait pages, or requesting candidates to purchase pre-employment tools. We hold a zero-tolerance policy against fraudulent recruitment practices.",
    },
    {
      title: "3. Account Conduct & Safety Bounds",
      icon: "🛡️",
      desc: "We utilize active safeguards to prevent account bridging errors (for example, keeping recruiter profiles locked out of applying for candidate openings, and candidates locked out of modifying company listing parameters). Any deliberate circumvention of role boundaries will trigger immediate system review and possible account deactivation.",
    },
    {
      title: "4. Intellectual Property & Rights",
      icon: "📄",
      desc: "All source files, code, design marks, assets, and layouts are the exclusive property of JobPortal. You may not scrape listings, distribute candidate files, or copy system structure without explicit formal written permission.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
            Legal Framework
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Last Updated: May 17, 2026. By accessing or using the JobPortal interface, you formally agree to comply with our community standard clauses.
          </p>
        </div>

        {/* Clauses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {clauses.map((c, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
                  {c.icon}
                </span>
                <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
                  {c.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pt-2">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Callout Notice */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-6 rounded-3xl text-center space-y-3">
          <h3 className="font-bold text-indigo-800 text-base">Acceptance & Compliance</h3>
          <p className="text-indigo-700 text-xs leading-relaxed max-w-xl mx-auto">
            If you disagree with any terms laid out here, please terminate your platform usage immediately. Violators of fair-use conditions risk permanent hardware and email bans without warning.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Browse Jobs
            </Link>
            <Link
              to="/contact"
              className="inline-flex bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Contact Legal Office
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Terms;
