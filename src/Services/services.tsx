import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getRank: async (page: string) => {
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
  postSketch: async (body: { audio_id: number; transcription: string }) => {
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
      .post(PATH.base + "/update/", body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
