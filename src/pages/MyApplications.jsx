import { useEffect, useState } from "react";
import { getMyApplications, withdrawApplication } from "../services/applicationService";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        if (isMounted) setLoading(true);
        if (isMounted) setError("");
        const data = await getMyApplications();
        if (isMounted) {
          setApps(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setError("Failed to load applications");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "", // 'withdraw', 'message'
    title: "",
    message: "",
    confirmLabel: "",
    cancelLabel: "",
    onConfirm: null,
    isDanger: false,
    jobTitle: "",
    company: "",
  });

  const showModal = (options) => {
    setModal({
      isOpen: true,
      type: options.type,
      title: options.title,
      message: options.message,
      confirmLabel: options.confirmLabel || "Confirm",
      cancelLabel: options.cancelLabel || "Cancel",
      onConfirm: options.onConfirm,
      isDanger: !!options.isDanger,
      jobTitle: options.jobTitle || "",
      company: options.company || "",
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleWithdraw = (appId) => {
    const app = apps.find(a => a._id === appId);
    const jobTitle = app?.jobId?.title || "Job Unavailable";
    const company = app?.jobId?.company || "Company Unavailable";

    showModal({
      type: 'withdraw',
      title: 'Withdraw Application',
      message: 'Are you sure you want to withdraw your application? This action is permanent and cannot be undone.',
      jobTitle,
      company,
      confirmLabel: 'Yes, Withdraw',
      cancelLabel: 'Keep Application',
      isDanger: true,
      onConfirm: async () => {
        try {
          setError("");
          await withdrawApplication(appId);
          setApps((prev) => prev.filter((a) => a._id !== appId));
          
          showModal({
            type: 'message',
            title: 'Application Withdrawn',
            message: 'Your application has been successfully removed.',
            isDanger: false,
          });
        } catch (err) {
          showModal({
            type: 'message',
            title: 'Withdrawal Failed',
            message: err?.response?.data?.message || 'Failed to withdraw application.',
            isDanger: true,
          });
        }
      }
    });
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "interviewing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default: // 'applied'
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "🎉 Offer Received";
      case "rejected":
        return "❌ Closed / Rejected";
      case "interviewing":
        return "📅 Interviewing";
      default:
        return "📨 Application Submitted";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Applications
            </h1>
            <p className="text-gray-500 mt-1">Track and manage the jobs you have applied for</p>
          </div>

          <Link
            to="/jobs"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-colors text-sm"
          >
            Explore More Jobs
          </Link>
        </div>

        {/* Stats Section */}
        {!loading && !error && apps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-400 block mb-1">Total Applied</span>
              <span className="text-3xl font-bold text-gray-900">{apps.length}</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-400 block mb-1">Under Review</span>
              <span className="text-3xl font-bold text-amber-600">
                {apps.filter((a) => a.status === "interviewing" || !a.status || a.status === "applied").length}
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-400 block mb-1">Offers Received</span>
              <span className="text-3xl font-bold text-emerald-600">
                {apps.filter((a) => a.status === "accepted").length}
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-center mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <Loader variant="cards" message="Loading your applications..." count={3} />
        )}

        {/* Empty State */}
        {!loading && apps.length === 0 && !error && (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100 max-w-xl mx-auto mt-8">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl mx-auto mb-6 text-2xl font-bold">
              💼
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Applications Found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't submitted any job applications yet. Let's find your dream job now!
            </p>
            <Link
              to="/jobs"
              className="inline-flex bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Search Jobs
            </Link>
          </div>
        )}

        {/* List of Applications */}
        <div className="grid gap-6">
          {apps.map((a) => (
            <div
              key={a._id}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                  {a.jobId?.company || "Company Unavailable"}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {a.jobId?.title || "Job Unavailable"}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    📍 {a.jobId?.location || "N/A"}
                  </span>
                  {a.jobId?.salary && (
                    <span className="flex items-center gap-1 font-semibold text-gray-800">
                      💵 {a.jobId.salary}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <span className={`w-full md:w-auto text-center px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusStyles(a.status || 'applied')}`}>
                  {getStatusLabel(a.status || 'applied')}
                </span>

                {(!a.status || a.status === 'applied') ? (
                  <button
                    onClick={() => handleWithdraw(a._id)}
                    className="text-xs text-rose-600 hover:text-rose-800 hover:underline font-semibold focus:outline-none transition-colors cursor-pointer"
                  >
                    Withdraw Application
                  </button>
                ) : (
                  <span 
                    className="text-xs text-gray-400 cursor-not-allowed bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200" 
                    title="Applications under active review or finalized cannot be withdrawn."
                  >
                    🚫 Cannot Withdraw
                  </span>
                )}

                <span className="text-xs text-gray-400 mt-1">
                  Applied on {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Custom Premium Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-all">
            
            {/* Icon based on type */}
            <div className="flex items-center justify-center mb-6">
              {modal.type === 'message' && (
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${modal.isDanger ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {modal.isDanger ? '⚠️' : '🎉'}
                </div>
              )}
              {modal.type === 'withdraw' && (
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-3xl">
                  ⚠️
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {modal.title}
            </h3>

            {/* Dynamic Context (Job Title & Company) */}
            {(modal.jobTitle || modal.company) && (
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4 text-center">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">{modal.company}</span>
                <span className="text-base font-bold text-gray-800">{modal.jobTitle}</span>
              </div>
            )}

            {/* Message */}
            <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
              {modal.message}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {modal.type !== 'message' ? (
                <>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                  >
                    {modal.cancelLabel}
                  </button>
                  <button
                    onClick={() => {
                      modal.onConfirm && modal.onConfirm();
                      closeModal();
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl text-white font-semibold shadow-md transition-all duration-200 text-sm cursor-pointer hover:-translate-y-0.5 ${
                      modal.isDanger 
                        ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' 
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                    }`}
                  >
                    {modal.confirmLabel}
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  className="w-full py-3 px-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors text-sm cursor-pointer shadow-md"
                >
                  Okay
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default MyApplications;