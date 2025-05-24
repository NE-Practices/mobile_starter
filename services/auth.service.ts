import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.12.72.107:4060/api/v1";

export interface LoginResponse {
  user: any;
  token?: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
  password: string;
}

// LOGIN
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    console.log("response from login ----->",response.data)

    const { token, user } = response.data.data;

    if (token) {
      await AsyncStorage.setItem("token", response.data.data.token);
    }

    return { user, token };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
}

// REGISTER
export async function register(
  username: string,
  email: string,
  password: string,
  phone: string
): Promise<RegisterResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/create`, {
      email,
      names: username,
      telephone: phone,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed");
  }
}

// FETCH USER PROFILE
export async function fetchUserProfile() {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data.user;
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}
