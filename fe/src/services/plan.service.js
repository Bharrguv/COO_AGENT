import api from "./api";

export const planService = {
  async generatePlan(goal, token) {
    const response = await api.post(
      "/plan",
      { goal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  async getPlans(token) {
    const response = await api.get("/plans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async getPlan(id, token) {
    const response = await api.get(`/plan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};