import axios from "axios";
import BASE_URL from "../constants/Config";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};

export const createProduct = async (product:any) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, product);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};


//  Update product by ID
export const updateProductById = async (id: number, updatedData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/product/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  Delete product by ID
export const deleteProductById = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};