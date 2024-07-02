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

    if (body.test_index === "" || body.test_index === undefined || body.test_index === null) {
      delete body.test_index;
    }

    if (body.interview_index === "" || body.interview_index === undefined || body.interview_index === null) {
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

    if (body.test_index === "" || body.test_index === undefined || body.test_index === null) {
      delete body.test_index;
    }

    if (body.interview_index === "" || body.interview_index === undefined || body.interview_index === null) {
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

  getTestList: async (filter: any) => {
    const queryParams = new URLSearchParams({
      edition: filter.edition,
      is_resident: filter.is_resident,
      public_defense: filter.public_defense,
      category: filter.category,
      assignee: filter.assignee,
      name: filter.name,
      person: filter.person,
    });

    const url = `${PATH.base}/test/?${queryParams.toString()}`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createTest: async (data: any) => {
    const url = `${PATH.base}/test/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.post(url, data, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getTest: async (id: number) => {
    const url = `${PATH.base}/test/${id}/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  updateTest: async (id: number, data: any) => {
    const url = `${PATH.base}/test/${id}/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.patch(url, data, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteTest: async (id: number) => {
    const url = `${PATH.base}/test/${id}/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.delete(url, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getTestScoreList: async (filter: any) => {
    const queryParams = new URLSearchParams({
      test: filter.test,
      person: filter.person,
      min_score: filter.min_score,
      max_score: filter.max_score,
    });

    const url = `${PATH.base}/test-score/?${queryParams.toString()}`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createTestScore: async (data: any) => {
    const url = `${PATH.base}/test-score/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.post(url, data, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getTestScore: async (id: number) => {
    const url = `${PATH.base}/test-score/${id}/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  updateTestScore: async (id: number, data: any) => {
    const url = `${PATH.base}/test-score/${id}/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.patch(url, data, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteTestScore: async (id: number) => {
    const url = `${PATH.base}/test-score/${id}/`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };

    try {
      const response = await axios.delete(url, header);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

};

export default services;
