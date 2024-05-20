import { API_HOST } from "./config";
import axios from "axios";

export const modifyProduct = async updateProduct => {
  try {
    const response = await axios.patch(
      `${API_HOST}/${updateProduct.id}`,
      updateProduct,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async id => {
  try {
    const response = await axios.delete(`${API_HOST}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
