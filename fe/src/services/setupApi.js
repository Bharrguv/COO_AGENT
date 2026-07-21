import api from "./api";

let initialized = false;

export function setupApi(getToken) {
  if (initialized) return;
  initialized = true;

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}
