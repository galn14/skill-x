// src/services/api.service.ts
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api'; // Replace with your API base URL

// POST request function
export const post = async (endpoint: string, body: any) => {
  try {
    const response = await axios.post(`${baseUrl}/${endpoint}`, body);
    return response.data;
  } catch (error) {
    console.error('Error during POST request', error);
    throw error;
  }
};

// GET request for token validation
export const get = async (endpoint: string, params: any) => {
  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error during GET request', error);
    throw error;
  }
};

// Function to fetch token from the backend
export const getTokenFromAPI = async () => {
  try {
    const response = await axios.get(`${baseUrl}/get-token`);
    return response.data.token; // Assuming your backend provides a token in this response
  } catch (error) {
    console.error('Error fetching token', error);
    throw error;
  }
};

// Register request function
export const register = async (body: any) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, body); // Replace 'register' with your actual registration endpoint
    return response.data;
  } catch (error) {
    console.error('Error during registration', error);
    throw error;
  }
};