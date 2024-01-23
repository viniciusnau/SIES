import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getRank: async (filter: string, page: string) => {
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
      .get(
        `${PATH.base}/transcriptions/${
          page ? `?page=${page}` : ""
        }&is_done=true`,
        header
      )
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
  putUpdate: async (body: any, id: string) => {
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
      .post(PATH.base + `/user/${id}`, body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
