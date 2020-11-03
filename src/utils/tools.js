export const serverUrl = "http://localhost:3009";

export function isLogined() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export function setToken(val) {
  localStorage.setItem('token', val);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}
