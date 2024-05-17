import axios from "axios";

import { API_HOST } from "./config";

export const createProduct = async newProduct => {
  try {
    const response = await axios.post(`${API_HOST}`, newProduct); // post 할때 매개변수로 두번째에 객체를 넣어주면된다.
    return response;
  } catch (error) {
    console.log(error);
  }
};
