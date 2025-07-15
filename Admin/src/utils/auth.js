import {jwtDecode} from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds
    const isValid = decoded.exp > currentTime;

    if (!isValid) {
      localStorage.removeItem("token"); // 🔥 Remove expired token
    }

    return isValid;
  } catch (err) {
    // Invalid token format
    localStorage.removeItem("token");
    return false;
  }
}
