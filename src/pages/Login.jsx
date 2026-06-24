/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { ButtonLoader } from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // VALIDATION
  const validateForm = () => {
    if (!email || !password) {
      return "All fields are required";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const userData = { email, password, role };

      const data = await loginUser(userData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("userId", data.user._id || data.user.id);

      alert("Login Successful");

      // ROLE BASED REDIRECT
      if (data.user.role === "recruiter") {
        navigate("/dashboard");
      } else {
        navigate("/jobs");
      }

    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="flex justify-center items-center py-20 px-4">

        <div className="bg-white p-8 rounded-3xl shadow-xl w-[450px]">

          <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-8">Log in to your account to continue</p>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          {/* ROLE SELECTION */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === "candidate"
                  ? "bg-indigo-600 text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Candidate
            </button>

            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === "recruiter"
                  ? "bg-indigo-600 text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Recruiter
            </button>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="yourname@example.com"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="mt-4 bg-gray-900 text-white p-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-400"
            >
              {loading ? <ButtonLoader text="Logging in..." /> : "Log In"}
            </button>

          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">Sign up</Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;