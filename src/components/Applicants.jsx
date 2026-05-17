import { useEffect, useState } from "react";
import { getApplicants, updateApplicationStatus } from "../services/applicationService";
import Loader from "./Loader";

function Applicants({ jobId }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        if (isMounted) setLoading(true);
        if (isMounted) setError("");

        const data = await getApplicants(jobId);

        if (isMounted) {
          setApps(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) {
          // Silently suppress 403 "Not allowed" — recruiter doesn't own this job
          const status = err?.response?.status;
          if (status === 403) {
            setApps([]);
          } else {
            setError(err?.response?.data?.message || "Failed to load applicants");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (jobId) {
      load();
    }

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      setApps((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
      );
      alert("Application status updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update application status.");
    }
  };

  if (!jobId) return null;

  if (loading)
    return (
      <Loader
        variant="inline"
        size="sm"
        message="Loading applicants..."
        className="mt-2"
      />
    );

  if (error)
    return (
      <p className="text-red-500 text-sm mt-2">
        {error}
      </p>
    );

  if (apps.length === 0)
    return (
      <p className="text-gray-500 text-sm mt-2">
        No Applicants Yet
      </p>
    );

  return (
    <div className="mt-4 space-y-3">
      {apps.map((a) => {
        const name = a.applicantId?.name || "Unknown Candidate";
        const email = a.applicantId?.email || "N/A";
        const initial = name.charAt(0).toUpperCase();

        return (
          <div
            key={a._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors gap-3"
          >
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {initial}
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 leading-tight">
                  {name}
                </h4>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  ✉️ {email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
              <div className="relative">
                <select
                  value={a.status || "applied"}
                  onChange={(e) => handleStatusChange(a._id, e.target.value)}
                  className="text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg pl-2.5 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 cursor-pointer appearance-none"
                >
                  <option value="applied">📨 Applied</option>
                  <option value="interviewing">📅 Interviewing</option>
                  <option value="accepted">🎉 Accepted</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>

              <a
                href={`mailto:${email}`}
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Applicants;