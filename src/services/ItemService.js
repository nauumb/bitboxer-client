import axios from "../http-common";

const getAllItems = () => {
  return axios.get("/getAllItems");
};

const getItemById = id => {
  return axios.get(`/getItem/?id=${id}`);
};

const updateItem = data => {
  return axios.put("/updateItem", data);
};

export default {
  getAllItems,
  getItemById,
  updateItem
};