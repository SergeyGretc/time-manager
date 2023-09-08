import httpService from "./httpservice";

const projectEndpoint = "projects/";
export const projectService = {
  deleteProject: async (id) => {
    const { data } = await httpService.delete(projectEndpoint + id);

    return data;
  },
  createProject: async (payload) => {
    const { data } = await httpService.post(projectEndpoint, payload);

    return data;
  },
  getAllProjects: async (pageId) => {
    const { data } = await httpService.get(projectEndpoint, {
      params: {
        orderBy: "pageId",
        equalTo: `${pageId}`,
      },
    });
    return data;
  },
  update: async (payload, id) => {
    const { data } = await httpService.patch(projectEndpoint + id, payload);

    return data;
  },
};
