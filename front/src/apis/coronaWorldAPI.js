import axios from "axios";

const coronaWorldAPI = axios.create({
  baseURL: "https://api.covid19api.com/",
});

export default coronaWorldAPI;
