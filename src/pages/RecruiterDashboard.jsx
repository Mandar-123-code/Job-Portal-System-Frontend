import { useEffect, useState } from "react";
import { getMyJobs } from "../services/jobsService";
import Applicants from "../components/Applicants";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getMyJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totalApplicants = jobs.reduce((sum, job) => sum + (job.applicantCount || 0), 0);
  const avgApplicants = jobs.length > 0 ? (totalApplicants / jobs.length).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage your active jobs and review incoming applicants</p>
          </div>

          <Link
            to="/create-job"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-colors text-sm"
          >
            + Post a New Job
          </Link>
        </div>

        {/* Recruiter Stats */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-400 block mb-1">Active Listings</span>
              <span className="text-3xl font-bold text-gray-900">{jobs.length}</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-400 block mb-1">Total Applicants</span>
              <span className="text-3xl font-bold text-indigo-600">{totalApplicants}</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-400 block mb-1">Avg. Candidates/Job</span>
              <span className="text-3xl font-bold text-gray-900">{avgApplicants}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <Loader variant="cards" message="Loading your job listings..." count={2} />
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100 max-w-xl mx-auto mt-8">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl mx-auto mb-6 text-2xl font-bold">
              📢
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Active Listings</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't posted any jobs yet. Let's create your first listing to attract quality talent.
            </p>
            <Link
              to="/create-job"
              className="inline-flex bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Post a Job
            </Link>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-5 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-xs">
                      {job.company}
                    </span>
                    <span>📍 {job.location}</span>
                    {job.salary && <span className="font-medium text-gray-700">💵 {job.salary}</span>}
                  </div>
                </div>
                
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Active
                </span>
              </div>

              {/* Applicants Component */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Applicants List
                </h3>
                <Applicants jobId={job._id} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;