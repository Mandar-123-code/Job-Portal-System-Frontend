import { useState } from "react";
import { ButtonLoader } from "../components/Loader";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill in your Name, Email, and Message.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form fields
      setName("");
      setEmail("");
      setSubject("general");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Left Side: Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-gray-500 mt-3 leading-relaxed">
              Have questions about pricing, hiring solutions, candidate profiles, or just want to leave some feedback? Drop us a line!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl p-3 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
                ✉️
              </span>
              <div>
                <h4 className="font-bold text-gray-900">Email Support</h4>
                <p className="text-sm text-gray-500 mt-0.5">support@jobportal.example.com</p>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl p-3 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
                📞
              </span>
              <div>
                <h4 className="font-bold text-gray-900">Call Us Toll-Free</h4>
                <p className="text-sm text-gray-500 mt-0.5">1-800-JOB-PORTAL</p>
                <p className="text-xs text-gray-400 mt-0.5">Mon - Fri · 9 AM - 6 PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl p-3 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
                📍
              </span>
              <div>
                <h4 className="font-bold text-gray-900">Headquarters</h4>
                <p className="text-sm text-gray-500 mt-0.5">
                  100 Innovation Way, Suite 400<br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
          </p>
        </div>

        {/* Right Side: Interactive Form Card */}
        <div className="lg:col-span-3 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          {submitted ? (
            <div className="text-center py-16 px-4 animate-fade-in flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-2xl mb-6 text-3xl shadow-inner">
                ✓
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-500 max-w-sm mx-auto mb-8">
                Thank you for reaching out. A support coordinator has received your query and will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900">Send us a Message</h2>
              
              {error && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl border border-red-100">
                  ⚠️ {error}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What is this about?</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="billing">Recruiter Billing & Subscriptions</option>
                  <option value="solutions">Hiring & ATS Solutions</option>
                  <option value="report">Report a Job Post or Recruiter</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  placeholder="Tell us details of how we can help you today..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white h-40 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors disabled:bg-indigo-400"
              >
                {loading ? <ButtonLoader text="Sending message..." /> : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default Contact;
