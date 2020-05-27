import axios from "axios";

const coronaWorldAPI = axios.create({
  baseURL: "https://api.covid19api.com/",
});

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

coronaWorldAPI.interceptors.request.use(
  async (response) => {
    await sleep(2000);
    return response;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

export default coronaWorldAPI;
