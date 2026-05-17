import { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ButtonLoader } from "../components/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password) {
      return "All fields are required";
    }

    if (name.trim().length < 3) {
      return "Name must be at least 3 characters";
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

  const handleSignup = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const userData = {
        name: name.trim(),
        email,
        password,
        role,
      };

      await signupUser(userData);

      alert("Signup Successful");

      navigate("/login");

    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message || "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="flex justify-center items-center py-20 px-4">

        <div className="bg-white p-8 rounded-3xl shadow-xl w-[450px]">

          <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900">
            Create an Account
          </h1>
          <p className="text-center text-gray-500 mb-8">Join today to find your next great opportunity</p>

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

          <form className="flex flex-col gap-4" onSubmit={handleSignup}>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="At least 6 characters"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="mt-4 bg-gray-900 text-white p-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-400"
            >
              {loading ? <ButtonLoader text="Creating account..." /> : "Sign Up"}
            </button>

          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-indigo-600 font-semibold hover:underline">Log in</a>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;