import axios from "axios";
import { PATH } from "../PATH";
import { iGetCandidates } from "../Types/Candidates";

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

    if (filter.stage === "1" || filter.stage === 1) {
      queryParams.append("ordering", "-academic_index");
    } else if (filter.stage === "2" || filter.stage === 2) {
      queryParams.append("ordering", "-average");
    }

    const url = `${PATH.base}/user/rank/?${queryParams.toString()}`;

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

    if (body.test_index === "") {
      delete body.test_index;
    }

    if (body.interview_index === "") {
      delete body.interview_index;
    }

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

    if (body.test_index === "") {
      delete body.test_index;
    }

    if (body.interview_index === "") {
      delete body.interview_index;
    }

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

  deleteUser: async (id: string) => {
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
      .delete(PATH.base + `/user/${id}/`, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },

  getCandidates: async (body: iGetCandidates) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const { name } = body;
    const queryString = `?name=${encodeURIComponent(name)}`;

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .get(`${PATH.base}/user/${queryString}`, header)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },

  putCandidate: async (id: any, body: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    if (body.test_index === "") {
      delete body.test_index;
    }

    if (body.interview_index === "") {
      delete body.interview_index;
    }

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .patch(`${PATH.base}/user/${id}/`, body, header)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
