const AUTH_STORAGE_KEY = "tms_auth";

export const setAuthLocally = (payload) => {
  if (!payload) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
};

export const getAuthLocally = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse auth data", error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const clearAuthLocally = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
