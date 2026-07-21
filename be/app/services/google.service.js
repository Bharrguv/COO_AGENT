import api from "./api";

export const googleService = {
  syncPlan: async (planId, userId, token) => {
    const response = await api.post(`/api/google/sync/${planId}`, null, {
      params: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};