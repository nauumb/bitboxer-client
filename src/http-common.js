import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:8080/bitboxer/v1/",
    headers: {
      "Content-type": "application/json"
    }
  });