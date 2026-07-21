import axios from "axios";

const API = "http://localhost:8000";

export const googleService = {
  login() {
    window.location.href = `${API}/api/google/login`;
  },

  syncCalendar(planId, userId, token) {
    return axios.post(`${API}/api/google/sync/${planId}`, null, {
      params: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
