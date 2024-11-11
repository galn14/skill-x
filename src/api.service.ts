// src/services/api.service.ts
import { auth, provider, signInWithPopup } from './firebaseConfig';
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
    // Retrieve token from localStorage or wherever it's stored
    const token = localStorage.getItem('userToken'); // Or from your session, cookies, etc.
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here
      },
    };

    const response = await axios.get(`${baseUrl}/${endpoint}`, { params, ...config });
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

// Function to get list of skills
export const getSkills = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token here
      },
    };

    const response = await axios.get(`${baseUrl}/skills/fetch`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills', error);
    throw error;
  }
};

// Function to get user's skills
export const getUserSkills = async () => {
  try {
    const response = await get('user/skills/view', {}); // 'user/skills/view' API endpoint
    return response;
  } catch (error) {
    console.error('Error fetching user skills', error);
    throw error;
  }
};

// export const getBuyerProfile = async () => {
//   try {
//     const token = localStorage.getItem('userToken');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(`${baseUrl}/buyer`, config);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching buyer profile', error);
//     throw error;
//   }
// };

export const getUser = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/user`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

export const createBuyerProfile = async (data: any) => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${baseUrl}/buyer`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error creating buyer profile', error);
    throw error;
  }
};

export const updateBuyerProfile = async (data: any) => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${baseUrl}/buyer`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error updating buyer profile', error);
    throw error;
  }
};

// Function for Google Login
export const loginWithGoogle = async () => {
  try {
    // Open Google sign-in popup
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    // Send ID token to the backend
    const response = await axios.post(`${baseUrl}/google-login`, { idToken });
    return response.data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

// // Fungsi untuk menghapus profil buyer
// export const deleteBuyerProfile = async () => {
//   try {
//     const token = localStorage.getItem('userToken');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.delete(`${baseUrl}/buyer`, config);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting buyer profile', error);
//     throw error;
//   }
// };