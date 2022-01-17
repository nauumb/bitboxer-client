import axios from "../http-common";

const getAll = () => {
  return axios.get("/getAllItems");
};

export default {
  getAll
};