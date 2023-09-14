import httpService from "./http.service";

const analiseEndpoint = "analise/";
export const analiseService = {
  createAnalise: async (payload) => {
    const { data } = await httpService.post(analiseEndpoint, payload);

    return data;
  },

  getAllAnalise: async (pageId) => {
    const { data } = await httpService.get(analiseEndpoint, {
      params: {
        orderBy: "pageId",
        equalTo: `${pageId}`,
      },
    });
    return data;
  },
  update: async (payload, id) => {
    const { data } = await httpService.patch(analiseEndpoint + id, payload);

    return data;
  },
  deleteAnalise: async (id) => {
    const { data } = await httpService.delete(analiseEndpoint + id);

    return data;
  },
};
