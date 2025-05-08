import { API_ENDPOINTS, DEV_OPTIONS } from '../constants'
import type { Service, ServiceOverview } from '../stores/serviceStore'
import { useUserStore, type LoginCredentials, type LoginResponse } from '../stores/userStore';

const fetchWithAuth = async (
  userStore: ReturnType<typeof useUserStore>,
  url: string,
  payload: RequestInit = {},
) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + userStore.getToken,
    ...payload.headers,
  };

  const res = await fetch(url, { ...payload, headers });
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
    userStore,
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
    userStore,
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
): Promise<any> => {

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
    userStore,
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

// AUTH

export const requestLogin = async (payload: LoginCredentials) => {
  const res = await fetch(API_ENDPOINTS.login, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        grant_type: 'password',
        username: payload.username,
        password: payload.password,
    }),
  })
  if (!res.ok) {
    throw Error(res.statusText);
  }
  //if login successful...
  const data: LoginResponse = await res.json();
  return data.access_token;
}
