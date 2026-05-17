import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DISMISS_KEY = "jobportal_login_toast_dismissed";

function LoginToast() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    if (isLoggedIn || isAuthPage) {
      setVisible(false);
      return;
    }

    if (sessionStorage.getItem(DISMISS_KEY) === "true") {
      return;
    }

    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, [isLoggedIn, isAuthPage, location.pathname]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[60] sm:max-w-sm login-toast-enter"
    >
      <div className="relative flex gap-3 sm:gap-4 items-start bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-900/25 border border-slate-700/50 p-4 pr-11 sm:p-5 sm:pr-12">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-white leading-snug">
            Sign in to get the full experience
          </p>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Apply to jobs, track applications, and manage your profile.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Link
              to="/login"
              onClick={dismiss}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={dismiss}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default LoginToast;
