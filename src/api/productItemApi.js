import axios from "axios";
import { API_HOST } from "./config";

//특정 제품을 불러오기위해 id가 필요하다
export const getProductOne = async id => {
  try {
    const response = await axios.get(`${API_HOST}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
