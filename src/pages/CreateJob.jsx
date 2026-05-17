import { useState } from "react";
import { createJob } from "../services/jobsService";
import { useNavigate } from "react-router-dom";
import { ButtonLoader } from "../components/Loader";

const EXPERIENCE_LEVELS = [
  { value: "Fresher", label: "Entry-Level / Fresher", icon: "🎓", desc: "0–2 years experience" },
  { value: "Mid-Level", label: "Mid-Level", icon: "💻", desc: "2–5 years experience" },
  { value: "Senior", label: "Senior / Lead", icon: "👑", desc: "5+ years experience" },
];

function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("Mid-Level");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!title || !company || !location || !salary || !description) {
      return "All fields are required";
    }
    if (title.length < 3) return "Title must be at least 3 characters";
    if (description.length < 10) return "Description must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createJob({ title, company, location, salary, description, experience });

      setSuccess("Job published successfully! Redirecting to dashboard...");
      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");
      setExperience("Mid-Level");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create job. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const filledCount = [title, company, location, salary, description].filter(Boolean).length;
  const progress = Math.round((filledCount / 5) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl shadow-lg shadow-indigo-200/50 mb-5">
            📝
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Post a New Position
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Your listing will be visible to thousands of talented candidates worldwide
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completion</span>
            <span className={`text-xs font-extrabold ${progress === 100 ? 'text-emerald-600' : 'text-indigo-600'}`}>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${progress === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-indigo-400 to-purple-500'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-100/50 border border-gray-100/80">

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold p-4 rounded-2xl mb-6">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold p-4 rounded-2xl mb-6">
              <span className="text-lg">🎉</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Job Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2.5">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior React Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Company + Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2.5">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-gray-50/80 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all font-medium placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2.5">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Remote or Bangalore, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50/80 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Salary / Compensation
              </label>
              <input
                type="text"
                placeholder="e.g. ₹12 LPA, $120,000, or €85,000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Experience Level Selector */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Experience Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl.value}
                    type="button"
                    onClick={() => setExperience(lvl.value)}
                    className={`relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer group ${
                      experience === lvl.value
                        ? 'border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-100/50 scale-[1.02]'
                        : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                    }`}
                  >
                    <span className="text-2xl">{lvl.icon}</span>
                    <span className={`text-sm font-bold ${experience === lvl.value ? 'text-indigo-700' : 'text-gray-700'}`}>
                      {lvl.label}
                    </span>
                    <span className={`text-[11px] font-medium ${experience === lvl.value ? 'text-indigo-500' : 'text-gray-400'}`}>
                      {lvl.desc}
                    </span>
                    {experience === lvl.value && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2.5">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Job Description
              </label>
              <textarea
                placeholder="Describe the role, responsibilities, required skills, and benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-200 text-gray-900 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 focus:bg-white outline-none transition-all font-medium placeholder:text-gray-400 h-44 resize-none leading-relaxed"
              />
              <div className="flex justify-end mt-1.5">
                <span className={`text-[11px] font-semibold ${description.length >= 10 ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {description.length} characters {description.length < 10 && '(min 10)'}
                </span>
              </div>
            </div>

            {/* Preview Card */}
            {title && company && (
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl p-5 border border-indigo-100/50">
                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-3">Live Preview</div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                    {company.split(' ').map(s => s[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{company}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {salary && (
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-100">
                          💵 {salary}
                        </span>
                      )}
                      {location && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg border border-blue-100">
                          📍 {location}
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                        experience === "Senior" ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        experience === "Fresher" ? 'bg-sky-50 text-sky-700 border-sky-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                        {EXPERIENCE_LEVELS.find(l => l.value === experience)?.icon} {experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || progress < 100}
              className={`w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all duration-300 cursor-pointer ${
                progress === 100
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } disabled:opacity-60`}
            >
              {loading ? (
                <ButtonLoader text="Publishing..." />
              ) : progress === 100 ? "Publish Job Listing →" : "Complete all fields to publish"}
            </button>

          </form>
        </div>

        {/* Footer Tip */}
        <p className="text-center text-xs text-gray-400 mt-6">
          💡 Tip: Detailed job descriptions attract 3x more qualified applicants
        </p>
      </div>
    </div>
  );
}

export default CreateJob;