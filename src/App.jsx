import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

// Static Pages
import JobAlerts from "./pages/JobAlerts";
import Pricing from "./pages/Pricing";
import HiringSolutions from "./pages/HiringSolutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginToast from "./components/LoginToast";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          
          {/* STATIC PAGE ROUTES */}
          <Route path="/job-alerts" element={<JobAlerts />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/hiring-solutions" element={<HiringSolutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* PROTECTED ROUTES (ANY LOGGED IN USER) */}
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* RECRUITER ONLY ROUTES */}
          <Route
            path="/create-job"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <CreateJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 ROUTE */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[70vh] text-2xl font-bold">
                404 - Page Not Found
              </div>
            }
          />

        </Routes>
      </main>
      <Footer />
      <LoginToast />
    </div>
  );
}

export default App;