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
    `block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
      isActive(path)
        ? "bg-indigo-50 text-indigo-600"
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
    <nav className="relative bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 min-h-14 sm:min-h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center min-w-0 shrink">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-1.5 shadow-sm border border-indigo-100/80 group-hover:shadow-md group-hover:border-indigo-200 transition-all duration-300 transform group-hover:-translate-y-0.5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3256/3256163.png"
                alt="JobPortal Logo"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0">
              <span className="block text-base sm:text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 bg-clip-text text-transparent tracking-tight truncate">
                JobPortal
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4 xl:mx-6 min-w-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm.trim())
                navigate(`/jobs?q=${encodeURIComponent(searchTerm)}`);
            }}
            className="w-full relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
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
              placeholder="Search jobs, categories or companies..."
              className="w-full pl-10 pr-4 py-2 bg-slate-200 text-gray-900 border border-slate-100 rounded-full text-sm placeholder-slate-600 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/80 outline-none transition-all duration-300"
            />
          </form>
        </div>

        {/* Right: Desktop Actions */}
        <div className="hidden lg:flex items-center justify-end gap-4 xl:gap-6 shrink-0">
          <Link to="/jobs" className={navLinkClass("/jobs")}>
            Jobs
          </Link>

          {token && role === "recruiter" && (
            <>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link
                to="/create-job"
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Post Job
              </Link>
            </>
          )}

          {token && role === "candidate" && (
            <Link
              to="/my-applications"
              className={`${navLinkClass("/my-applications")} whitespace-nowrap`}
            >
              My Applications
            </Link>
          )}

          <div className="flex items-center gap-3 xl:gap-4 pl-4 xl:pl-5 border-l border-slate-100">
            {token ? (
              <div className="flex items-center gap-3 xl:gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 group cursor-pointer min-w-0"
                >
                  <div
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 ring-offset-2 ${
                      isActive("/profile")
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                        : "bg-indigo-50 text-indigo-700 border-indigo-100 group-hover:bg-indigo-100 group-hover:border-indigo-200"
                    }`}
                  >
                    {name ? name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span
                    className={`text-sm font-semibold truncate max-w-[120px] xl:max-w-none transition-colors ${
                      isActive("/profile")
                        ? "text-indigo-600"
                        : "text-slate-700 group-hover:text-indigo-600"
                    }`}
                  >
                    {name?.split(" ")[0] || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
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
              <div className="flex items-center gap-3 xl:gap-4">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors px-2 cursor-pointer whitespace-nowrap"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white px-4 xl:px-5 py-2.5 rounded-full shadow-md shadow-slate-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: Mobile Controls */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setShowMobileSearch(!showMobileSearch);
              if (!showMobileSearch) setMobileMenuOpen(false);
            }}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            aria-label="Toggle search"
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
              className="p-1"
              aria-label="Profile"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                  isActive("/profile")
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-indigo-50 text-indigo-700 border-indigo-100"
                }`}
              >
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
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
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

      {/* Mobile Search Dropdown */}
      {showMobileSearch && (
        <div className="lg:hidden px-3 sm:px-4 pb-4 pt-2 bg-white border-b border-slate-100 shadow-inner">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowMobileSearch(false);
              if (searchTerm.trim())
                navigate(`/jobs?q=${encodeURIComponent(searchTerm)}`);
            }}
            className="flex items-center relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
              placeholder="Search jobs..."
              className="flex-1 w-full min-w-0 pl-10 pr-[5.5rem] sm:pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm outline-none focus:bg-white focus:border-indigo-400"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 sm:px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-slate-900/20 z-40"
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden absolute left-0 right-0 top-full z-50 bg-white border-b border-slate-100 shadow-lg max-h-[calc(100dvh-3.5rem)] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 space-y-1">
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
                    className="flex items-center justify-center gap-2 mx-1 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold px-4 py-3 rounded-xl shadow-md shadow-indigo-100 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
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

              <div className="border-t border-slate-100 mt-2 pt-2">
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
                      className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 px-1 pt-1">
                    <Link
                      to="/login"
                      className="flex-1 text-center px-4 py-3 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 text-center px-4 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
