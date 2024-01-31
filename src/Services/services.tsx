import axios from "axios";
import { PATH } from "../PATH";

const services = {
  // getRankList: async (filter: any, page: string) => {
  //   return axios
  //     .get(`${PATH.base}/user/rank/?page=${page}`)
  //     .then((data: any) => {
  //       return data;
  //     })
  //     .catch((err: any) => console.log(err));
  // },
  getRankList: async (filter: any, page: string) => {
    const queryParams = new URLSearchParams({
      page: page,
      is_resident: filter.is_resident,
      stage: filter.stage,
      public_defense: filter.public_defense,
      category: filter.category,
      pcd: filter.pcd,
    });

    const url = `${PATH.base}/user/rank/?${queryParams.toString()}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err; // Re-throwing error for handling in the caller function
    }
  },

  getUpdateList: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        // Authorization: `${authorizationMethod} ${
        Authorization: ` ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
    return axios
      .get(`${PATH.base}/user/`, header)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  postRegister: async (body: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        // Authorization: `${authorizationMethod} ${
        Authorization: ` ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
    return axios
      .post(PATH.base + "/user/", body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  getUser: async (id: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        // Authorization: `${authorizationMethod} ${
        Authorization: ` ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
    return axios
      .get(PATH.base + `/user/${id}`, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  putUser: async (body: any, id: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        // Authorization: `${authorizationMethod} ${
        Authorization: ` ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
    return axios
      .put(PATH.base + `/user/${id}/`, body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  patchUser: async (body: any, id: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        // Authorization: `${authorizationMethod} ${
        Authorization: ` ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
    return axios
      .patch(PATH.base + `/user/${id}/`, body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  deleteUser: async (id: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        // Authorization: `${authorizationMethod} ${
        Authorization: ` ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
    return axios
      .delete(PATH.base + `/user/${id}`, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
