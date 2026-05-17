/* eslint-disable no-useless-catch */
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = `${API_BASE}/auth`;

/**
 * SIGNUP USER
 */
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * LOGIN USER
 */
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};