const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const USER_ID_KEY = "userId";

/**
 * Check if user is logged in
 */
export const isLoggedIn = () => {
  return Boolean(localStorage.getItem(TOKEN_KEY));
};

/**
 * Get user role (candidate / recruiter)
 */
export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

/**
 * Get user id
 */
export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

/**
 * Save login data after login
 */
export const setAuthData = (data) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ROLE_KEY, data.user.role);
  localStorage.setItem(USER_ID_KEY, data.user._id);
};

/**
 * Logout user (clear everything)
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_ID_KEY);
};