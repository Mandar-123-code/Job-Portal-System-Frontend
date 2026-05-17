import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = `${API_BASE}/jobs`;

/**
 * Helper: Auth header
 */
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/**
 * GET ALL JOBS
 * (public route)
 */
export const getAllJobs = async (query = "") => {
  const url = query ? `${API}?q=${encodeURIComponent(query)}` : API;
  const response = await axios.get(url);
  return response.data;
};

/**
 * GET RECRUITER JOBS
 */
export const getMyJobs = async () => {
  const response = await axios.get(`${API}/my`, getAuthHeader());
  return response.data;
};

/**
 * CREATE JOB (Recruiter only)
 */
export const createJob = async (jobData) => {
  const response = await axios.post(`${API}/create`, jobData, getAuthHeader());
  return response.data;
};

/**
 * DELETE JOB (Recruiter only)
 */
export const deleteJob = async (id) => {
  const response = await axios.delete(`${API}/delete/${id}`, getAuthHeader());
  return response.data;
};

/**
 * UPDATE JOB (Recruiter only)
 */
export const updateJob = async (id, data) => {
  const response = await axios.put(`${API}/update/${id}`, data, getAuthHeader());
  return response.data;
};