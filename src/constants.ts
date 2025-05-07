
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

const STUB_MODE = import.meta.env.VITE_STUB_MODE === 'true';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}:${API_PORT}/token`,
  services: `${API_BASE_URL}:${API_PORT}/services`,
}

export const DEV_OPTIONS = {
  stubModeOn: STUB_MODE,
  stubServicesPath: '/stubModels.json',
}
