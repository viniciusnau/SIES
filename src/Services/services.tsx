import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getRankList: async (filter: any, page: string) => {
    const queryParams = new URLSearchParams({
      page: page,
      is_resident: filter.is_resident,
      stage: filter.stage,
      public_defense: filter.public_defense,
      category: filter.category,
    });

    if (filter.pcd !== "false" && filter.pcd !== false) {
      queryParams.append("pcd", filter.pcd);
    }

    const url = `${PATH.base}/user/rank/?${queryParams.toString()}`;

    if (filter.stage == "1") {
      queryParams.append("ordering", "-academic_index");
    } else if (filter.stage == "2") {
      queryParams.append("ordering", "-average");
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getUpdateList: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
            apiToken || sessionStorage.getItem("credentials")
        }`,
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
        Authorization: `${authorizationMethod} ${
            apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .post(PATH.base + "/user/", body, header)
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
        Authorization: `${authorizationMethod} ${
            apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .put(PATH.base + `/user/${id}/`, body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  getLogin: async (credentials: { username: string; password: string }) => {
    const headers = {
      headers: {
        Authorization:
          "Basic " + btoa(`${credentials.username}:${credentials.password}`),
      },
    };

    return axios
      .get(PATH.base + "/user/", headers)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
