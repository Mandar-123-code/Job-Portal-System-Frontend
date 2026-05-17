import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobsService";
import JobSearchBar from "../components/JobSearchBar";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import { buildJobSearchParams } from "../utils/jobSearchData";

const STATS = [
  { value: "45K+", label: "Active jobs" },
  { value: "12K+", label: "Companies hiring" },
  { value: "2M+", label: "Candidates" },
  { value: "98%", label: "Satisfaction rate" },
];

const CATEGORIES = [
  { name: "Engineering", icon: "💻", query: "engineer developer" },
  { name: "Design", icon: "🎨", query: "designer ux ui" },
  { name: "Product", icon: "📦", query: "product manager" },
  { name: "Marketing", icon: "📣", query: "marketing" },
  { name: "Sales", icon: "🤝", query: "sales" },
  { name: "Remote", icon: "🌎", query: "remote", location: "Remote" },
];

const TRUSTED = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Stripe",
  "Adobe",
  "Tesla",
];

const STEPS = [
  {
    step: "01",
    title: "Search & filter",
    desc: "Use keywords, company, location, and experience filters to narrow thousands of roles.",
  },
  {
    step: "02",
    title: "Apply in one click",
    desc: "Submit applications with your profile and track status from your dashboard.",
  },
  {
    step: "03",
    title: "Get hired",
    desc: "Connect with recruiters directly and land your next role faster.",
  },
];

function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const highlight = (text) => text;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const list = await getAllJobs();
        setJobs(list);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = jobs.slice(0, 3);
  const jobCount = jobs.length;

  const handleSearch = () => {
    const qs = buildJobSearchParams({
      q: search,
      location: locationFilter,
      company: companyFilter,
      experience: experienceFilter,
      sort: sortBy,
    });
    navigate(qs ? `/jobs?${qs}` : "/jobs");
  };

  const quickSearch = (q, location = "") => {
    setSearch(q);
    setLocationFilter(location);
    setCompanyFilter("");
    setExperienceFilter("");
    const qs = buildJobSearchParams({ q, location });
    navigate(qs ? `/jobs?${qs}` : "/jobs");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-200 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {jobCount > 0
                ? `${jobCount.toLocaleString()}+ jobs live now`
                : "New roles added daily"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
              Find work you{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                love
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Discover opportunities at top companies worldwide. Search by role,
              company, location, and experience — just like on leading job
              boards.
            </p>
          </div>

          {/* Hero search — same filters as Jobs page */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-950/40 border border-white/20 p-4 sm:p-6">
            <JobSearchBar
              variant="hero"
              jobs={jobs}
              search={search}
              onSearchChange={setSearch}
              companyFilter={companyFilter}
              onCompanyFilterChange={setCompanyFilter}
              locationFilter={locationFilter}
              onLocationFilterChange={setLocationFilter}
              experienceFilter={experienceFilter}
              onExperienceFilterChange={setExperienceFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onSubmit={handleSearch}
              submitLabel="Search Jobs"
            />
          </div>

          {/* Quick category chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-3xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => quickSearch(cat.query, cat.location || "")}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2 rounded-full transition-colors"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 sm:-mt-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 p-4 sm:p-5 text-center"
            >
              <p className="text-2xl sm:text-3xl font-black text-indigo-600">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted by */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          Trusted by professionals at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {TRUSTED.map((name) => (
            <span
              key={name}
              className="text-lg sm:text-xl font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-100 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How JobPortal works
            </h2>
            <p className="text-slate-500 mt-2 max-w-lg mx-auto">
              From search to offer — a streamlined path built for modern job
              seekers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="relative p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <span className="text-4xl font-black text-indigo-400">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured openings
            </h2>
            <p className="text-slate-500 mt-1">
              Hand-picked roles from verified employers
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center text-sm font-bold text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-300 bg-indigo-50/50 px-5 py-2.5 rounded-xl transition-colors"
          >
            View all jobs →
          </Link>
        </div>

        {loading ? (
          <Loader variant="grid" message="Loading featured jobs..." count={3} />
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                role={role}
                applied={false}
                onApply={() => navigate("/login")}
                onWithdraw={() => {}}
                onDelete={() => {}}
                highlight={highlight}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-500">
              No jobs posted yet. Check back soon!
            </p>
            <Link
              to="/jobs"
              className="inline-block mt-4 text-indigo-600 font-semibold hover:underline"
            >
              Browse jobs
            </Link>
          </div>
        )}
      </section>

      {/* Dual CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 sm:p-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold">For job seekers</h3>
            <p className="text-indigo-100 mt-2 text-sm sm:text-base leading-relaxed">
              Create a free profile, apply to roles, and track every application
              in one place.
            </p>
            {!token ? (
              <Link
                to="/signup"
                className="inline-block mt-6 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Get started free
              </Link>
            ) : role === "candidate" ? (
              <Link
                to="/my-applications"
                className="inline-block mt-6 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                My applications
              </Link>
            ) : (
              <Link
                to="/jobs"
                className="inline-block mt-6 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Browse jobs
              </Link>
            )}
          </div>
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white border border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold">For employers</h3>
            <p className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
              Post openings, review applicants, and hire qualified talent from
              our global network.
            </p>
            {!token ? (
              <Link
                to="/signup"
                className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Post a job
              </Link>
            ) : role === "recruiter" ? (
              <Link
                to="/create-job"
                className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Create listing
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Recruiter dashboard
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
