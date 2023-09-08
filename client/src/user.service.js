import httpService from "./httpservice";
import localStorageService from "./localStorageService";
const userEndpoint = "users/";
const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );

    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );

    return data;
  },
};

export default userService;
