import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// User Registration
export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// User Login
export const loginUser = async (loginData) => {
    return axios.post(`${API_URL}/login`, loginData);
};

// Fetch User Info
export const getUserInfo = async (token) => {
    return axios.get(`${API_URL}/userinfo`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
