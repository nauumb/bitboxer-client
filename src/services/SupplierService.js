import axios from "../http-common";

const getAllSuppliers = () => {
  return axios.get("/getAllSuppliers");
};


export default {
    getAllSuppliers
};