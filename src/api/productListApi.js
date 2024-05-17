import axios from "axios";
import { API_HOST } from "./config";

//비동기면 async를 걸어주자
export const getProductList = async () => {
  try {
    // async가 있을땐 await를 꼭 써주자(기다렸다가 받아라)
    const response = await axios.get(`${API_HOST}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
