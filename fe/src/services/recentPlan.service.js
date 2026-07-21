import api from "./api";

export const recentPlanService = {
  async getPlans() {
    const response = await api.get("/plans");
    return response.data;
  },

  async getPlan(id) {
    const response = await api.get(`/plan/${id}`);
    return response.data;
  },
};
