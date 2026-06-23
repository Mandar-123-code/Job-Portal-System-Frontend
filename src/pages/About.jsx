import { Link } from "react-router-dom";

function About() {
  const stats = [
    { label: "Active Job Openings", value: "45,000+", icon: "💼" },
    { label: "Trusted Employers", value: "12,000+", icon: "🏢" },
    { label: "Success Matches", value: "85%", icon: "🤝" },
    { label: "Support Team Response", value: "< 2 Hours", icon: "⚡" },
  ];

  const values = [
    {
      title: "Trust & Transparency",
      desc: "No ghost jobs, no hidden fee traps. We audit recruiters to ensure all opportunities are 100% active, legitimate, and safe.",
      icon: "🤝",
      bg: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Candidate-First Focus",
      desc: "Job search should be exciting, not exhausting. We offer simple application tracking, direct contacts, and transparent progress indicators.",
      icon: "👤",
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Next-Gen Discovery",
      desc: "Intelligent debounced index filtering and rapid response triggers make finding the exact matching location or salary package a breeze.",
      icon: "⚡",
      bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
            Our Journey & Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Connecting Global Talent with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Perfect Opportunities
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            CareerFlow was founded with a single mission: to break down barriers
            between passionate talent and fast-growing organizations worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-3">{stat.icon}</span>
              <span className="text-2xl font-black text-gray-900">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Our Story Block */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Why We Started CareerFlow
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We realized that standard recruitment platforms are filled with
              confusing interfaces, silent rejections, and untrustworthy
              listings.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              We decided to build a platform that focuses heavily on clean user
              aesthetics, bulletproof security checks (ensuring recruiters can't
              apply to candidate roles, for example!), and rich interactive
              widgets that make the recruitment process fully transparent.
            </p>
            <div className="flex gap-4">
              <Link
                to="/jobs"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-colors text-sm"
              >
                Browse All Jobs
              </Link>
              <Link
                to="/contact"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Get In Touch
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-550 to-purple-650 p-8 rounded-2xl text-white space-y-4 shadow-lg flex flex-col justify-center min-h-[300px]">
            <div className="text-3xl">🎯</div>
            <h3 className="text-xl font-bold text-black">Our Global Purpose</h3>
            <p className="text-pink-400 text-sm leading-relaxed">
              "We believe that a person's dream job shouldn't be gated by
              geography or complex processes. Our goal is to create a
              frictionless workspace ecosystem."
            </p>
            <div className="border-t border-indigo-400/30 pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-xs">
                JP
              </div>
              <div>
                <div className="font-bold text-xs">The CareerFlow Team</div>
                <div className="text-[10px] text-indigo-600">
                  Global Recruitment Devs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${v.bg}`}
                >
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
