const TOKEN_KEY = "jwt_token";
const REFRESH_KEY = "jwt_refresh_token";
const EXPIRES_KEY = "jwt_expires";
const USERID_KEY = "user-local-id";

function setTokens({ refreshToken, accessToken, userId, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(USERID_KEY, userId);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getExpiresToken() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USERID_KEY);
}

const localStorageService = {
  setTokens,
  removeAuthData,
  getAccessToken,
  getRefreshToken,
  getExpiresToken,
  getUserId,
};
export default localStorageService;
