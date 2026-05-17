import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { getAllJobs, deleteJob } from "../services/jobsService";
import {
  applyJob,
  getMyApplications,
  withdrawApplication,
} from "../services/applicationService";

import Applicants from "../components/Applicants";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import useDebounce from "../utils/useDebounce";
import JobSearchBar from "../components/JobSearchBar";
import { parseJobSearchParams, getExperienceLevel } from "../utils/jobSearchData";

function Jobs() {
  const location = useLocation();
  const initialParams = parseJobSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState(initialParams.q);
  const debouncedSearch = useDebounce(search, 300);
  const [loading, setLoading] = useState(false);
  const [companyFilter, setCompanyFilter] = useState(initialParams.company);
  const [locationFilter, setLocationFilter] = useState(initialParams.location);
  const [experienceFilter, setExperienceFilter] = useState(initialParams.experience);
  const [sortBy, setSortBy] = useState(initialParams.sort);
  const [myApplications, setMyApplications] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const params = parseJobSearchParams(location.search);
    const timer = setTimeout(() => {
      setSearch(params.q);
      setLocationFilter(params.location);
      setCompanyFilter(params.company);
      setExperienceFilter(params.experience);
      setSortBy(params.sort);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.search]);

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        if (isMounted) setLoading(true);
        const jobsData = await getAllJobs();
        if (isMounted) setJobs(jobsData);

        if (token && role === "candidate") {
          const myApps = await getMyApplications();
          if (isMounted) {
            setMyApplications(Array.isArray(myApps) ? myApps : []);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [token, role]);

  const renderHighlighted = (text) => {
    if (!debouncedSearch) return text;
    const q = debouncedSearch.trim();
    if (!q) return text;

    try {
      const parts = String(text).split(
        new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"),
      );
      return parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-200 text-yellow-900 px-1 rounded-sm font-medium"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      );
    } catch {
      return text;
    }
  };
  const [modal, setModal] = useState({
    isOpen: false,
    type: "", // 'apply', 'withdraw', 'delete', 'message'
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

  const handleApply = (jobId) => {
    if (!token) {
      showModal({
        type: "message",
        title: "Authentication Required",
        message:
          "Please log in to your account first to apply for job postings.",
        isDanger: true,
      });
      return;
    }

    if (role !== "candidate") {
      showModal({
        type: "message",
        title: "Access Restricted",
        message: "Only candidates are allowed to submit applications for jobs.",
        isDanger: true,
      });
      return;
    }

    const job = jobs.find((j) => j._id === jobId);

    showModal({
      type: "apply",
      title: "Confirm Job Application",
      message:
        "Are you sure you want to submit your application for this position? The recruiter will review your profile details.",
      jobTitle: job?.title || "Job Posting",
      company: job?.company || "Company",
      confirmLabel: "Apply Now",
      cancelLabel: "Cancel",
      onConfirm: async () => {
        try {
          const applicationData = { jobId };
          const newApp = await applyJob(applicationData);
          setMyApplications((prev) => [...prev, newApp]);

          showModal({
            type: "message",
            title: "Application Submitted!",
            message: `Congratulations! Your application for the position of ${job?.title || "Job"} has been successfully sent to ${job?.company || "Employer"}.`,
            isDanger: false,
          });
        } catch (error) {
          showModal({
            type: "message",
            title: "Application Failed",
            message:
              error?.response?.data?.message ||
              "An error occurred while submitting your application.",
            isDanger: true,
          });
        }
      },
    });
  };

  const handleWithdraw = (appId) => {
    const app = myApplications.find((a) => a._id === appId);
    const jobTitle = app?.jobId?.title || "Position";
    const company = app?.jobId?.company || "Employer";

    showModal({
      type: "withdraw",
      title: "Withdraw Application",
      message:
        "Are you sure you want to withdraw your application? This action is permanent and cannot be undone.",
      jobTitle,
      company,
      confirmLabel: "Yes, Withdraw",
      cancelLabel: "Keep Application",
      isDanger: true,
      onConfirm: async () => {
        try {
          await withdrawApplication(appId);
          setMyApplications((prev) => prev.filter((a) => a._id !== appId));

          showModal({
            type: "message",
            title: "Application Withdrawn",
            message: "Your application has been successfully removed.",
            isDanger: false,
          });
        } catch (err) {
          showModal({
            type: "message",
            title: "Withdrawal Failed",
            message:
              err?.response?.data?.message || "Failed to withdraw application.",
            isDanger: true,
          });
        }
      },
    });
  };

  const handleDelete = (id) => {
    const job = jobs.find((j) => j._id === id);

    showModal({
      type: "delete",
      title: "Delete Job Posting",
      message:
        "Are you sure you want to permanently delete this job listing? This action is irreversible and all candidate applications will be lost.",
      jobTitle: job?.title || "Job Posting",
      company: job?.company || "Company",
      confirmLabel: "Delete Listing",
      cancelLabel: "Keep Listing",
      isDanger: true,
      onConfirm: async () => {
        try {
          await deleteJob(id);
          setJobs((prev) => prev.filter((job) => job._id !== id));

          showModal({
            type: "message",
            title: "Job Posting Deleted",
            message:
              "The job posting has been successfully removed from the system.",
            isDanger: false,
          });
        } catch {
          showModal({
            type: "message",
            title: "Deletion Failed",
            message: "An error occurred while deleting the job listing.",
            isDanger: true,
          });
        }
      },
    });
  };

  // filtered & sorted jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q),
      );
    }

    // company filter
    if (companyFilter) {
      result = result.filter((j) => j.company === companyFilter);
    }

    // location filter
    if (locationFilter) {
      result = result.filter((j) => j.location === locationFilter);
    }

    // experience filter
    if (experienceFilter) {
      result = result.filter(
        (j) => (j.experience || getExperienceLevel(j)) === experienceFilter,
      );
    }

    // sort
    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || b.postedAt || 0) -
          new Date(a.createdAt || a.postedAt || 0),
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt || a.postedAt || 0) -
          new Date(b.createdAt || b.postedAt || 0),
      );
    } else if (sortBy === "salary_high") {
      result.sort((a, b) => {
        const salA = parseFloat(String(a.salary).replace(/[^0-9.]/g, "")) || 0;
        const salB = parseFloat(String(b.salary).replace(/[^0-9.]/g, "")) || 0;
        return salB - salA;
      });
    } else if (sortBy === "salary_low") {
      result.sort((a, b) => {
        const salA = parseFloat(String(a.salary).replace(/[^0-9.]/g, "")) || 0;
        const salB = parseFloat(String(b.salary).replace(/[^0-9.]/g, "")) || 0;
        return salA - salB;
      });
    }

    return result;
  }, [
    jobs,
    debouncedSearch,
    companyFilter,
    locationFilter,
    experienceFilter,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Explore Opportunities
            </h1>
            <p className="text-gray-500 mt-1">
              Find your next career move from our curated listings
            </p>
          </div>
        </div>

        <JobSearchBar
          variant="panel"
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
          className="mb-6 sm:mb-8"
        />

        {/* LOADING */}
        {loading && (
          <Loader variant="grid" message="Loading jobs..." count={6} />
        )}

        {/* EMPTY STATE */}
        {!loading && filteredJobs.length === 0 && (
          <p className="text-gray-500">No Jobs Found</p>
        )}

        {/* JOB GRID */}
        {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const app = myApplications.find(
              (a) => a.jobId?._id === job._id || a.jobId === job._id,
            );
            return (
              <div key={job._id} className="flex flex-col">
                <JobCard
                  job={job}
                  role={role}
                  applied={!!app}
                  applicationId={app?._id}
                  applicationStatus={app?.status}
                  onApply={handleApply}
                  onWithdraw={handleWithdraw}
                  onDelete={handleDelete}
                  highlight={renderHighlighted}
                />

                {/* SHOW APPLICANTS ONLY FOR RECRUITER */}
                {role === "recruiter" && (
                  <div className="mt-3">
                    <Applicants jobId={job._id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Custom Premium Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-all">
            {/* Icon based on type */}
            <div className="flex items-center justify-center mb-6">
              {modal.type === "message" && (
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${modal.isDanger ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}
                >
                  {modal.isDanger ? "⚠️" : "🎉"}
                </div>
              )}
              {modal.type === "apply" && (
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl">
                  📨
                </div>
              )}
              {modal.type === "withdraw" && (
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-3xl">
                  ⚠️
                </div>
              )}
              {modal.type === "delete" && (
                <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-3xl">
                  🗑️
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
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  {modal.company}
                </span>
                <span className="text-base font-bold text-gray-800">
                  {modal.jobTitle}
                </span>
              </div>
            )}

            {/* Message */}
            <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
              {modal.message}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {modal.type !== "message" ? (
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
                        ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                        : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
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

export default Jobs;
