import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getRankList: async (filter: any, page: any) => {
    const {
      is_resident,
      stage,
      public_defense,
      category,
      pcd,
    } = filter;

    let url = `${PATH.base}/user/rank/?is_resident=${is_resident}&stage=${stage}&public_defense=${public_defense}&category=${category}&page=${page}`;

    if (pcd == true) {
      url += `&pcd=${pcd}`;
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
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
