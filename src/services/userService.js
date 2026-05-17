import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = `${API_BASE}/users`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMyProfile = async () => {
  const response = await axios.get(`${API}/me`, getAuthHeader());
  return response.data;
};

export const updateMyProfile = async (profile) => {
  const response = await axios.put(`${API}/me`, profile, getAuthHeader());
  return response.data;
};
