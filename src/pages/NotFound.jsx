import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-2xl w-full text-center rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/40">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-indigo-100 bg-indigo-50 text-indigo-600 text-3xl font-extrabold">
          404
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
          Oops, this page can't be found.
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mb-8 leading-7">
          The page you are trying to reach doesn't exist or has been moved. Let's get you back to where the work happens.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-700"
          >
            Back to homepage
          </Link>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Browse open roles
          </Link>
        </div>
      </div>
    </div>
  );
}
