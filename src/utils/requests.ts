import { API_ENDPOINTS, DEV_OPTIONS } from '../constants'
import type { Service, ServiceOverview } from '../stores/serviceStore'
import { useUserStore} from '../stores/userStore';

const fetchWithAuth = async (
  url: string,
  payload: RequestInit = {},
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...payload.headers,
  };

  const res = await fetch(url, {
    ...payload,
    headers,
    credentials: "include"
  });
  return res;
}

export const requestListOfServices = async (
  userStore: ReturnType<typeof useUserStore>
): Promise<ServiceOverview[]> => {

  if (DEV_OPTIONS.stubModeOn) {
    const res = await fetch(DEV_OPTIONS.stubServicesPath);
    const servicesList = await res.json();
    return servicesList;
  }

  const res = await fetchWithAuth(
    API_ENDPOINTS.services,
    {
      method: 'GET',
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch services: ${res.statusText}`);
  }
  const obj = await res.json()
  return obj.data
};

export const requestServiceInfoById = async (
    serviceId: string,
    userStore: ReturnType<typeof useUserStore>
): Promise<Service> => {

  if (DEV_OPTIONS.stubModeOn) {
    const response = await fetch(DEV_OPTIONS.stubServicesPath);
    const servicesList = await response.json();

    const candidate = servicesList.find((item: Service) => item.id.toString() == serviceId)

    if (candidate) {
      return candidate
    }
    throw new Error(`Service with id '${serviceId}' not found in stub data`);
  }

  const res = await fetchWithAuth(
    `${API_ENDPOINTS.services}/${serviceId}`,
    {
      method: 'GET',
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch service with id '${serviceId}': ${res.statusText}`);
  }
  const obj = await res.json()
  return obj.data;
};

export const requestOperationByServiceId = async (
  serviceId: string,
  payload: JSON,
  userStore: ReturnType<typeof useUserStore>,
) => {

  if (DEV_OPTIONS.stubModeOn) {
    const response = await fetch(DEV_OPTIONS.stubServicesPath);
    const servicesList = await response.json();
    const candidate = servicesList.find((item: Service) => item.id.toString() == serviceId)
    if (candidate) {
      return {
        'message': 'Success!',
      }
    }
    throw new Error(`Service with id '${serviceId}' not found in stub data`);
  }

  const res = await fetchWithAuth(
    `${API_ENDPOINTS.services}/${serviceId}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  )
  if (!res.ok) {
    throw Error(`Request to service ${serviceId} was unsuccesful: ${res.statusText}`)
  }
  const obj = await res.json()
  return obj.data;
};

export const requestThisUser = async () => {
  const res = await fetchWithAuth(API_ENDPOINTS.thisUser)
  if (!res.ok) {
    throw Error(`Cannot fetch this user ${res.statusText}`)
  }
  const user = await res.json();
  return user
}

export const login = () => {
  if (DEV_OPTIONS.stubModeOn) {
    return;
  }
  window.location.href = API_ENDPOINTS.loginWithGitHub;
}

export const logout = () => {
  localStorage.setItem("expAPI_isLoggedIn", 'false');

  if (DEV_OPTIONS.stubModeOn) {
    return;
  }
  window.location.href = API_ENDPOINTS.logout;
}

export const isAuthenticated = () => {
  if (DEV_OPTIONS.stubModeOn) {
    return true
  }
  const storedVar = localStorage.getItem("expAPI_isLoggedIn") === 'true'
  return storedVar
}
