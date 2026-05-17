import { useState } from "react";
import { ButtonLoader } from "../components/Loader";

function HiringSolutions() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [hires, setHires] = useState("1-5");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");
  const isCandidate = role === "candidate";

  if (isCandidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center animate-fade-in">
          <span className="text-6xl block mb-4">💼</span>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Employer Page Only</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Hiring solutions and enterprise tools are reserved exclusively for employers and hiring managers. 
            As a candidate, your profile, search features, and job applications are <strong className="text-indigo-600">100% free</strong> forever!
          </p>
          <a
            href="/jobs"
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors"
          >
            Find a Job Now
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !company || !date) {
      setError("Please fill out your Name, Work Email, Company, and select a Date.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid work email address.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }) : "";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Left Column: Solutions Information */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">
              Enterprise Suite
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight leading-tight">
              Scale Your Team Wisely
            </h1>
            <p className="text-gray-500 mt-3 leading-relaxed">
              Accelerate your talent acquisition funnel. JobPortal Enterprise brings advanced screening, intelligent analytics, and custom CRM integrations to your hiring pipeline.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex gap-4">
              <span className="text-2xl mt-0.5 shrink-0">🎯</span>
              <div>
                <h4 className="font-bold text-gray-900">Automated Candidate Screening</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Custom evaluation forms filter out unqualified candidates before they reach your queue, saving up to 40% of screening time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl mt-0.5 shrink-0">💻</span>
              <div>
                <h4 className="font-bold text-gray-900">Code Challenges & Testing</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Deploy live assessments for frontend, backend, or fullstack engineers inside candidate profiles to verify technical aptitude instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl mt-0.5 shrink-0">⚡</span>
              <div>
                <h4 className="font-bold text-gray-900">Seamless CRM & ATS Sync</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Connect JobPortal to your company’s internal Workday, Greenhouse, or Lever trackers with secure API webhooks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Demo Scheduler Card */}
        <div className="lg:col-span-3 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          {submitted ? (
            <div className="text-center py-16 px-4 animate-fade-in flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl mb-6 text-3xl shadow-inner">
                📅
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Demo Scheduled!</h2>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                Your hiring consultation has been booked. A calendar invite with video link has been dispatched to your email address.
              </p>
              
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 max-w-md w-full text-left space-y-2 mb-8">
                <p className="text-sm text-gray-700">
                  👤 <strong>Host:</strong> Hiring Specialist Team
                </p>
                <p className="text-sm text-gray-700">
                  🗓️ <strong>Date:</strong> {formattedDate}
                </p>
                <p className="text-sm text-gray-700">
                  ⏱️ <strong>Time:</strong> {time} (Your Local Time)
                </p>
                <p className="text-sm text-gray-700">
                  💻 <strong>Location:</strong> Google Meet / Zoom Conference Link
                </p>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition"
              >
                Schedule Another Time
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900">Request a Product Demo</h2>
              <p className="text-gray-400 text-sm">Schedule a live 15-minute consultation walkthrough with a technical recruitment specialist.</p>
              
              {error && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl border border-red-100">
                  ⚠️ {error}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Monthly Hires</label>
                  <select
                    value={hires}
                    onChange={(e) => setHires(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white cursor-pointer"
                  >
                    <option value="1-5">1 - 5 hires / mo</option>
                    <option value="6-20">6 - 20 hires / mo</option>
                    <option value="21-50">21 - 50 hires / mo</option>
                    <option value="50+">50+ hires / mo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white cursor-pointer text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white cursor-pointer"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors disabled:bg-indigo-400 mt-2"
              >
                {loading ? <ButtonLoader text="Booking slot..." /> : "Confirm Consultation"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default HiringSolutions;
