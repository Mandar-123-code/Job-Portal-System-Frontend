import { Link } from "react-router-dom";

function Privacy() {
  const policies = [
    {
      title: "1. Information We Collect",
      items: [
        "**Account Profile Details:** Name, email address, password hash, and active platform account type (Candidate or Recruiter).",
        "**Resume & Credentials:** Educations, work history, skill arrays, and portfolios uploaded to help candidates get noticed.",
        "**Usage Analytics:** Device configurations, screen metrics, debounced search log histories, and page access durations.",
      ],
      icon: "📁",
    },
    {
      title: "2. How We Safeguard Your Data",
      items: [
        "**Zero Third-Party Selling:** We maintain an absolute guarantee that we *never* sell, trade, or distribute your private contact details to advertising databases.",
        "**Advanced Database Encryption:** All user passwords are irreversibly salted and encrypted using robust cryptological hashing models in Mongoose.",
        "**Role Isolation & Bounds:** Candidate applications are locked so that only the designated, authenticated recruiter of the job listing is authorized to inspect candidate details.",
      ],
      icon: "🛡️",
    },
    {
      title: "3. Retention and Deletion",
      items: [
        "**Total Candidate Ownership:** You retain full ownership of your credentials. You can update, hide, or completely erase your profile database record from the profile tab at any point.",
        "**Application Logs:** Withdrawn job applications are deleted cleanly and permanently from our server systems instantly.",
      ],
      icon: "⏳",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            Security & Trust
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Last Updated: May 17, 2026. Your privacy and credentials are fully protected by industry-standard secure socket layers and zero data-broker distribution rules.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {policies.map((p, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
                <span className="text-2xl">{p.icon}</span>
                <h2 className="text-xl font-bold text-gray-900">{p.title}</h2>
              </div>
              <ul className="space-y-3 pl-2">
                {p.items.map((item, idx) => {
                  const parts = item.split("**");
                  return (
                    <li key={idx} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-500 shrink-0 mt-1">✔</span>
                      <span>
                        {parts.length === 3 ? (
                          <>
                            <strong className="text-gray-900 font-bold">{parts[1]}</strong>
                            {parts[2]}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Reassurance Callout */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-3xl text-center space-y-3">
          <h3 className="font-bold text-emerald-800 text-base">Have Privacy Inquiries?</h3>
          <p className="text-emerald-700 text-xs leading-relaxed max-w-lg mx-auto">
            If you have questions about how we process data, request information extracts, or wish to invoke deletion procedures, contact our Data Integrity Support directly at any time.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Contact DPO Officer
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Privacy;
