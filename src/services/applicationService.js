import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = `${API_BASE}/applications`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const applyJob = async (applicationData) => {
  const response = await axios.post(`${API}/apply`, applicationData, getAuthHeader());
  return response.data;
};

export const getApplicants = async (jobId) => {
  const res = await axios.get(`${API}/job/${jobId}`, getAuthHeader());
  return res.data;
};

export const getMyApplications = async () => {
  const res = await axios.get(`${API}/my`, getAuthHeader());
  return res.data;
};

export const withdrawApplication = async (appId) => {
  const res = await axios.delete(`${API}/${appId}`, getAuthHeader());
  return res.data;
};

export const updateApplicationStatus = async (appId, status) => {
  const res = await axios.put(`${API}/${appId}/status`, { status }, getAuthHeader());
  return res.data;
};