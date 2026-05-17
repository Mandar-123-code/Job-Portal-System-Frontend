import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../services/userService";
import Loader, { ButtonLoader } from "../components/Loader";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setFetching(true);
        const user = await getMyProfile();
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || "candidate");
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load profile");
      } finally {
        setFetching(false);
      }
    };

    loadProfile();
  }, []);

  const validateForm = () => {
    if (!name || !email) {
      return "Name and email are required";
    }

    if (name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (password && password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      const updated = await updateMyProfile({ name, email, password: password || undefined });

      localStorage.setItem("name", updated.name);
      setMessage("Profile updated successfully.");
      setPassword("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="flex justify-center py-10 px-4">
        {fetching ? (
          <Loader variant="page" message="Loading your profile..." className="w-full max-w-2xl" />
        ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={role}
                disabled
                className="mt-2 w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
            >
              {saving ? <ButtonLoader text="Saving..." /> : "Save Profile"}
            </button>
          </form>
        </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
