/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/") ||
      location.pathname.startsWith(path)
    );
  };

  const navLinkClass = (path) =>
    `text-sm font-semibold relative py-1 transition-all duration-300 ${
      isActive(path)
        ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full"
        : "text-slate-600 hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:rounded-full hover:after:w-full after:transition-all after:duration-300"
    }`;

  const mobileNavLinkClass = (path) =>
    `block w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
      isActive(path)
        ? "bg-indigo-50 text-indigo-600 shadow-sm"
        : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-xl shadow-slate-200/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="flex items-center gap-3 min-w-0"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-100/40 border border-white/50 transition-transform duration-300 group-hover:-translate-y-0.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                >
                  <path
                    d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 8h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12h6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                  CareerFlow
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Modern hiring hub
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 justify-center px-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim()) navigate(`/jobs?q=${encodeURIComponent(searchTerm)}`);
              }}
              className="w-full max-w-xl relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs, companies or skills"
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-500 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all duration-300"
              />
            </form>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link to="/jobs" className={navLinkClass("/jobs")}>Jobs</Link>
            {token && role === "recruiter" && (
              <>
                <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
                <Link
                  to="/create-job"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-indigo-200/40 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  <span className="text-base">＋</span>
                  Post Job
                </Link>
              </>
            )}
            {token && role === "candidate" && (
              <Link to="/my-applications" className={`${navLinkClass("/my-applications")} whitespace-nowrap`}>My Applications</Link>
            )}
            {token ? (
              <div className="flex items-center gap-3 xl:gap-4 pl-4 border-l border-slate-200">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className={`w-9 h-9 rounded-full grid place-items-center text-sm font-bold transition-all duration-300 ${isActive("/profile") ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200/40" : "bg-indigo-50 text-indigo-600"}`}>
                    {name ? name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className={`text-sm font-semibold transition-colors ${isActive("/profile") ? "text-indigo-600" : "text-slate-700 group-hover:text-indigo-600"}`}>
                    {name?.split(" ")[0] || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                  title="Logout"
                  aria-label="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-full shadow-lg shadow-slate-200/30 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                if (!showMobileSearch) setMobileMenuOpen(false);
              }}
              className="p-2 rounded-2xl bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
              aria-label="Search jobs"
              aria-expanded={showMobileSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {token && (
              <Link
                to="/profile"
                className="p-1 rounded-2xl bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Profile"
              >
                <div className={`w-9 h-9 rounded-full grid place-items-center text-sm font-bold ${isActive("/profile") ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700"}`}>
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) setShowMobileSearch(false);
              }}
              className="p-2 rounded-2xl bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {showMobileSearch && (
          <div className="lg:hidden px-4 pb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowMobileSearch(false);
                if (searchTerm.trim()) navigate(`/jobs?q=${encodeURIComponent(searchTerm)}`);
              }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-12 pr-24 py-3 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:bg-white focus:border-indigo-300 transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-200/30 hover:bg-indigo-700 transition-all duration-200"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full z-50 bg-white border-t border-slate-200 shadow-2xl shadow-slate-200/40">
            <div className="space-y-1 py-4 px-4">
              <Link
                to="/jobs"
                className={mobileNavLinkClass("/jobs")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Jobs
              </Link>
              {token && role === "recruiter" && (
                <>
                  <Link
                    to="/dashboard"
                    className={mobileNavLinkClass("/dashboard")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/create-job"
                    className="block rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-200/30 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Post Job
                  </Link>
                </>
              )}
              {token && role === "candidate" && (
                <Link
                  to="/my-applications"
                  className={mobileNavLinkClass("/my-applications")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Applications
                </Link>
              )}
              <div className="border-t border-slate-200 pt-4">
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      className={mobileNavLinkClass("/profile")}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile{name ? ` · ${name.split(" ")[0]}` : ""}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <Link
                      to="/login"
                      className="block rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="block rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-slate-200/30 transition-all duration-200 hover:bg-slate-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
