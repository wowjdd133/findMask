import axios from "axios";

const coronaAPI = axios.create({
  baseURL: "http://api.corona-19.kr/korea",
});

export default coronaAPI;
