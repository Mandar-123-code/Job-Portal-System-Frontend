import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function FooterSection({ title, sectionId, openSection, onToggle, children }) {
  const isOpen = openSection === sectionId;

  return (
    <div className="border-b border-slate-200/60 md:border-0 pb-4 md:pb-0 last:border-0 last:pb-0">
      <button
        type="button"
        onClick={() => onToggle(sectionId)}
        className="flex w-full items-center justify-between gap-3 py-1 md:pointer-events-none md:cursor-default"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs text-left">
          {title}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform md:hidden ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div className={`${isOpen ? "block" : "hidden"} md:block mt-4 md:mt-5`}>
        {children}
      </div>
    </div>
  );
}

function Footer() {
  const role = localStorage.getItem("role");
  const isCandidate = role === "candidate";
  const isRecruiter = role === "recruiter";
  const location = useLocation();

  const [modalData, setModalData] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) => {
    return isActive(path)
      ? "text-indigo-600 font-bold hover:text-indigo-700 transition-all duration-200"
      : "text-slate-500 hover:text-indigo-600 transition-all duration-200";
  };

  const handleEmployerClick = (e, pageName) => {
    e.preventDefault();
    setModalData({
      title: "💼 Employer Account Required",
      message: `The "${pageName}" section is reserved exclusively for Recruiters and Employers.`,
      submessage: "As a Candidate, all JobPortal services—including searching, filtering, and applying for jobs—are completely 100% free for you! 🌟"
    });
  };

  const handleCandidateClick = (e, pageName) => {
    e.preventDefault();
    setModalData({
      title: "👤 Candidate Account Required",
      message: `The "${pageName}" section is reserved exclusively for Candidates and Job Seekers.`,
      submessage: "As a Recruiter, you can post jobs, review incoming resumes, and hire top talent directly from your Recruiter Dashboard! 🚀"
    });
  };

  const toggleSection = (sectionId) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 mt-auto relative transition-all duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">

          {/* Logo & Pitch Info */}
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link to="/" className="flex items-center gap-3 mb-4 sm:mb-5 group">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3256/3256163.png"
                  alt="JobPortal Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                JobPortal
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-0 lg:mb-6 max-w-sm mx-auto lg:mx-0">
              Connecting brilliant, ambitious professionals with state-of-the-art companies across the globe. Your next premier career transformation starts right here.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FooterSection
              title="For Candidates"
              sectionId="candidates"
              openSection={openSection}
              onToggle={toggleSection}
            >
              <ul className="space-y-3 text-sm flex flex-col items-start">
                <li><Link to="/jobs" className={linkClass("/jobs")}>Browse Jobs</Link></li>
                <li>
                  {isRecruiter ? (
                    <button
                      onClick={(e) => handleCandidateClick(e, "My Applications")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      My Applications
                    </button>
                  ) : (
                    <Link to="/my-applications" className={linkClass("/my-applications")}>My Applications</Link>
                  )}
                </li>
                <li>
                  {isRecruiter ? (
                    <button
                      onClick={(e) => handleCandidateClick(e, "Candidate Profile")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      Candidate Profile
                    </button>
                  ) : (
                    <Link to="/profile" className={linkClass("/profile")}>Candidate Profile</Link>
                  )}
                </li>
                <li>
                  {isRecruiter ? (
                    <button
                      onClick={(e) => handleCandidateClick(e, "Job Alerts")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      Job Alerts
                    </button>
                  ) : (
                    <Link to="/job-alerts" className={linkClass("/job-alerts")}>Job Alerts</Link>
                  )}
                </li>
              </ul>
            </FooterSection>

            <FooterSection
              title="For Employers"
              sectionId="employers"
              openSection={openSection}
              onToggle={toggleSection}
            >
              <ul className="space-y-3 text-sm flex flex-col items-start">
                <li>
                  {isCandidate ? (
                    <button
                      onClick={(e) => handleEmployerClick(e, "Post a Job")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      Post a Job
                    </button>
                  ) : (
                    <Link to="/create-job" className={linkClass("/create-job")}>Post a Job</Link>
                  )}
                </li>
                <li>
                  {isCandidate ? (
                    <button
                      onClick={(e) => handleEmployerClick(e, "Recruiter Dashboard")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      Recruiter Dashboard
                    </button>
                  ) : (
                    <Link to="/dashboard" className={linkClass("/dashboard")}>Recruiter Dashboard</Link>
                  )}
                </li>
                <li>
                  {isCandidate ? (
                    <button
                      onClick={(e) => handleEmployerClick(e, "Pricing Plans")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      Pricing Plans
                    </button>
                  ) : (
                    <Link to="/pricing" className={linkClass("/pricing")}>Pricing Plans</Link>
                  )}
                </li>
                <li>
                  {isCandidate ? (
                    <button
                      onClick={(e) => handleEmployerClick(e, "Hiring Solutions")}
                      className="text-left text-slate-400 cursor-not-allowed hover:text-slate-400 transition-colors focus:outline-none font-medium"
                    >
                      Hiring Solutions
                    </button>
                  ) : (
                    <Link to="/hiring-solutions" className={linkClass("/hiring-solutions")}>Hiring Solutions</Link>
                  )}
                </li>
              </ul>
            </FooterSection>

            <FooterSection
              title="Legal & Support"
              sectionId="legal"
              openSection={openSection}
              onToggle={toggleSection}
            >
              <ul className="space-y-3 text-sm flex flex-col items-start sm:col-span-2 lg:col-span-1">
                <li><Link to="/about" className={linkClass("/about")}>About Us</Link></li>
                <li><Link to="/contact" className={linkClass("/contact")}>Contact Support</Link></li>
                <li><Link to="/privacy" className={linkClass("/privacy")}>Privacy Policy</Link></li>
                <li><Link to="/terms" className={linkClass("/terms")}>Terms of Service</Link></li>
              </ul>
            </FooterSection>
          </div>

        </div>

        {/* Footer Base divider */}
        <div className="border-t border-slate-200/60 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-xs font-medium text-slate-400 max-w-md leading-relaxed">
            &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
            <span className="hidden sm:inline"> Created with absolute precision.</span>
          </p>

          <div className="flex gap-3 sm:gap-4 shrink-0">
            <a href="#" className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all duration-300" title="Twitter" aria-label="Twitter">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all duration-300" title="LinkedIn" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Modern Centered Overlay Modal for Restriction Messages */}
      {modalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 max-h-[90dvh] overflow-y-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl sm:text-2xl mx-auto mb-4 shadow-inner">
              🔒
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 text-center mb-2 tracking-tight">
              {modalData.title}
            </h3>

            <p className="text-slate-600 text-sm text-center leading-relaxed mb-5">
              {modalData.message}
            </p>

            <div className="bg-indigo-50/50 border border-indigo-100/60 p-3 sm:p-4 rounded-2xl text-center">
              <p className="text-indigo-700 text-xs font-semibold leading-relaxed">
                {modalData.submessage}
              </p>
            </div>

            <button
              onClick={() => setModalData(null)}
              className="mt-5 sm:mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition-all cursor-pointer text-sm"
            >
              Got it, Thanks!
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
