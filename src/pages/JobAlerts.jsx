import { useState } from "react";

function JobAlerts() {
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [locationType, setLocationType] = useState("remote");
  const [frequency, setFrequency] = useState("daily");
  const [success, setSuccess] = useState(false);
  const [alerts, setAlerts] = useState(() => {
    const savedAlerts = localStorage.getItem("job_alerts");
    if (savedAlerts) {
      try {
        return JSON.parse(savedAlerts);
      } catch {
        console.error("Failed to parse alerts");
      }
    }
    return [];
  });

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!email || !keyword) {
      alert("Please fill in both the keyword and your email address.");
      return;
    }

    const newAlert = {
      id: Date.now(),
      keyword: keyword.trim(),
      locationType,
      frequency,
      email: email.trim(),
    };

    const updatedAlerts = [newAlert, ...alerts];
    setAlerts(updatedAlerts);
    localStorage.setItem("job_alerts", JSON.stringify(updatedAlerts));
    
    // Clear keyword/input and show success notification
    setKeyword("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleDeleteAlert = (id) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== id);
    setAlerts(updatedAlerts);
    localStorage.setItem("job_alerts", JSON.stringify(updatedAlerts));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Card */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              🔔 Create Job Alerts
            </h1>
            <p className="text-gray-500 mt-2">
              Get notified immediately whenever a new job posting matching your exact skill set goes live.
            </p>
          </div>

          {success && (
            <div className="mb-6 bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 animate-fade-in">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-bold">Alert Created Successfully!</p>
                <p className="text-sm text-emerald-600">We will start sending you job recommendations shortly.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleCreateAlert} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What role are you targeting?
              </label>
              <input
                type="text"
                placeholder="e.g. React Developer, UI Designer, Backend Engineer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location Preference
                </label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white cursor-pointer"
                >
                  <option value="remote">Remote Only</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-Site</option>
                  <option value="any">Any / No Preference</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notification Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white cursor-pointer"
                >
                  <option value="instantly">Instantly (Real-time)</option>
                  <option value="daily">Daily digest</option>
                  <option value="weekly">Weekly digest</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors mt-2"
            >
              Set Alert Preference
            </button>
          </form>
        </div>

        {/* Right Column: Manage & Active Alerts */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">
            Active Alerts ({alerts.length})
          </h2>
          
          {alerts.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl block mb-3">🔔</span>
              <p className="text-gray-500 text-sm">No active job alerts created yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex justify-between items-start hover:shadow-sm transition"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 capitalize">
                      {item.keyword}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      📍 {item.locationType} · ⏱️ {item.frequency}
                    </p>
                    <p className="text-xs text-indigo-600 mt-0.5 truncate max-w-[180px]">
                      📧 {item.email}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAlert(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold p-1.5 bg-white rounded-lg border hover:border-red-200 transition shrink-0"
                    title="Delete Alert"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default JobAlerts;
