import axios from "../http-common";

const getAllItems = () => {
  return axios.get("/getAllItems");
};

const getItemById = id => {
  return axios.get(`/getItem/?id=${id}`);
};

const insertItem = data => {
  return axios.post("/insertItem", data);
};

const updateItem = data => {
  return axios.put("/updateItem", data);
};

export default {
  getAllItems,
  getItemById,
  insertItem,
  updateItem
};