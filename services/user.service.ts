import axios from "axios";
import BASE_URL from "../constants/Config";

export const getUser = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log("response",response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

