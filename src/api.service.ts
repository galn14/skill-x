// src/services/api.service.ts
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api'; // Replace with your API base URL

// POST request function
// export const post = async (endpoint: string, body: any, options: any = {}) => {
//   try {
//     // Merge provided headers (like Authorization) with default headers
//     const config = {
//       headers: {
//         ...options.headers, // Use provided headers
//       },
//     };

//     // Perform the POST request with the provided body and config
//     const response = await axios.post(`${baseUrl}/${endpoint}`, body, config);
//     return response.data;
//   } catch (error) {
//     console.error('Error during POST request', error);
//     throw error;
//   }
// };

// POST request function
export const post = async (endpoint: string, body: any, config = {}) => {
  try {
    // Make POST request with the given endpoint, body, and config (headers)
    const response = await axios.post(`${baseUrl}/${endpoint}`, body, config);
    return response.data; // Return response data
  } catch (error) {
    console.error('Error during POST request', error); // Log any errors
    throw error; // Rethrow error for handling in component
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