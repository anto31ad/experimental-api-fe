
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

const STUB_MODE = import.meta.env.VITE_STUB_MODE === 'true';

export const AUTH_TOKEN_KEY = 'experimentalApi_token';

export const API_ENDPOINTS = {
  root: `${API_BASE_URL}:${API_PORT}`,
  login: `${API_BASE_URL}:${API_PORT}/token`,
  loginWithGitHub: `${API_BASE_URL}:${API_PORT}/login/github`,
  logout: `${API_BASE_URL}:${API_PORT}/logout`,
  thisUser: `${API_BASE_URL}:${API_PORT}/users/me`, 
  services: `${API_BASE_URL}:${API_PORT}/services`,
}

export const DEV_OPTIONS = {
  stubModeOn: STUB_MODE,
  stubServicesPath: '/stubModels.json',
}
