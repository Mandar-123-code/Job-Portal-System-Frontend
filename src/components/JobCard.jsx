import { getExperienceLevel } from "../utils/jobSearchData";

export default function JobCard({
  job,
  role,
  applied,
  applicationId,
  applicationStatus,
  onApply,
  onWithdraw,
  onDelete,
  highlight,
  currentUserId,
}) {
  const isExpired = job.expiresAt
    ? new Date(job.expiresAt) < new Date()
    : false;
  const daysLeft = job.expiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(job.expiresAt) - new Date()) / (1000 * 60 * 60 * 24),
        ),
      )
    : null;

  const normalizedRole = String(role || "").toLowerCase();
  const normalizedUserId = currentUserId ? String(currentUserId).trim() : "";

  const getOwnerId = (createdBy) => {
    if (!createdBy) return null;
    if (typeof createdBy === "string") return createdBy;
    if (createdBy._id) return String(createdBy._id);
    if (createdBy.id) return String(createdBy.id);
    if (typeof createdBy.toString === "function") return createdBy.toString();
    return null;
  };

  return (
    <article className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between h-full relative group">
      <div>
        {/* Header section with Company logo & title */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0 uppercase tracking-wider group-hover:scale-105 transition-transform duration-300">
            {job.company
              ? job.company
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")
              : "JP"}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors duration-200">
              {highlight(job.title)}
            </h3>
            <p className="text-sm font-semibold text-gray-500 mt-0.5">
              {highlight(job.company)}
            </p>
          </div>
        </div>

        {/* Dynamic Professional Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          {/* Salary Badge */}
          {job.salary && (
            <span className="flex items-center gap-1.5 bg-emerald-50/70 border border-emerald-100/80 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl">
              💵 {job.salary}
            </span>
          )}

          {/* Location Badge */}
          {job.location && (
            <span className="flex items-center gap-1.5 bg-blue-50/70 border border-blue-100/80 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl">
              📍 {job.location}
            </span>
          )}

          {/* Experience Badge */}
          {(() => {
            const exp = job.experience || getExperienceLevel(job);
            if (exp === "Senior") {
              return (
                <span className="flex items-center gap-1.5 bg-purple-50/75 border border-purple-100/80 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                  👑 Senior
                </span>
              );
            }
            if (exp === "Fresher") {
              return (
                <span className="flex items-center gap-1.5 bg-sky-50/75 border border-sky-100/80 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                  🎓 Entry-Level
                </span>
              );
            }
            return (
              <span className="flex items-center gap-1.5 bg-slate-50/75 border border-slate-100/80 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                💻 Mid-Level
              </span>
            );
          })()}

          {/* Days Left Badge */}
          {daysLeft !== null && !isExpired && (
            <span
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border ${
                daysLeft <= 3
                  ? "bg-rose-50 border-rose-100 text-rose-600"
                  : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}
            >
              ⏳ {daysLeft}d left
            </span>
          )}

          {isExpired && (
            <span className="flex items-center gap-1 bg-red-50 border border-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-xl">
              🚫 Expired
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="mt-5 text-gray-600 text-sm leading-relaxed line-clamp-3 border-t border-gray-50 pt-4">
          {highlight(job.description)}
        </p>
      </div>

      {/* Card Footer section */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
        <div className="text-xs font-medium text-gray-400 flex items-center gap-1">
          📅 Posted{" "}
          {job.postedAt
            ? new Date(job.postedAt).toLocaleDateString()
            : job.createdAt
              ? new Date(job.createdAt).toLocaleDateString()
              : ""}
        </div>

        <div className="flex items-center gap-2">
          {(() => {
            if (normalizedRole === "recruiter") {
              const ownerId = getOwnerId(job?.createdBy);
              const isOwner = ownerId && normalizedUserId && ownerId === normalizedUserId;

              if (!isOwner) {
                console.debug("JobCard: recruiter not owner", {
                  jobId: job._id,
                  ownerId,
                  currentUserId: normalizedUserId,
                });
              }

              if (isOwner) {
                return (
                  <button
                    type="button"
                    onClick={() => onDelete && onDelete(job._id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100 hover:border-rose-600 shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    Delete Job
                  </button>
                );
              }
              return null;
            }

            if (role === "candidate" || !role) {
              return (
                <div className="flex items-center gap-2">
                  {/* Apply Button */}
                  {!applied ? (
                    <button
                      onClick={() => onApply && onApply(job._id)}
                      disabled={isExpired}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all duration-300 shrink-0 cursor-pointer ${
                        isExpired
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      {isExpired ? "Expired" : "Apply Now ➔"}
                    </button>
                  ) : (
                    /* Applied State with Withdraw controller if eligible */
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl text-[10px] border border-emerald-100 uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        Applied ✓
                      </span>
                      {!applicationStatus || applicationStatus === "applied" ? (
                        <button
                          onClick={() => onWithdraw && onWithdraw(applicationId)}
                          className="text-[10px] text-rose-600 hover:text-rose-800 hover:underline font-extrabold focus:outline-none transition-colors cursor-pointer"
                        >
                          Withdraw
                        </button>
                      ) : (
                        <span
                          className="text-[9px] text-gray-400 font-semibold"
                          title="Under review or accepted applications cannot be withdrawn."
                        >
                          🔒 In Pipeline
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })()}
        </div>
      </div>
    </article>
  );
}
