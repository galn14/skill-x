// src/services/api.service.ts
import { auth, provider, signInWithPopup } from './firebaseConfig';
import axios from 'axios';

const baseUrl = 'http://localhost:8080'; // Replace with your API base URL

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

export const updateUser = async (token: string, updatedUser: Record<string, any>) => {
  try {

    console.log('Updating user with data:', updatedUser); // Log the data being sent
    console.log('API URL:', `${baseUrl}/user/update`); // Log the full URL

    const response = await axios.put(`${baseUrl}/user/update`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('API response:', response); // Log the full response data

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
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

export const registerWithEmail = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const loginWithEmail = async (email: string, password: string): Promise<any> => {
  try {
      const response = await axios.post(`${baseUrl}/login/email`, { email, password });
      return response.data;
  } catch (error: any) {
      throw error.response ? error.response.data : { message: 'An unexpected error occurred' };
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
// create skill
export const createSkill = async (data: any) => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${baseUrl}/create`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error creating skill', error);
    throw error;
  }
};
// view specific skill
export const viewSkill = async (id: string) => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/view/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error viewing skill with ID: ${id}`, error);
    throw error;
  }
};

// Function to update a specific skill by ID
export const updateSkill = async (id: string, data: any) => {
  try {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${baseUrl}/update/${id}`, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating skill with ID: ${id}`, error);
    throw error;
  }
};


export const loginWithGoogle = async () => {
  try {
    // Open Google sign-in popup
    const result = await signInWithPopup(auth, provider);
    
    // Get the ID token
    const idToken = await result.user.getIdToken();
    
    // Configure headers for the backend request
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    };

    localStorage.setItem('userToken', idToken);

    // Send ID token to the backend
    const response = await axios.post(`${baseUrl}/login/google`, null, config);

    return response.data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      throw new Error('User is not logged in.');
    }

    // Configure headers for the backend request
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    // Send logout request to the backend
    const response = await axios.post(`${baseUrl}/logout`, null, config);

    // Clear the local storage
    localStorage.removeItem('userToken');

    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
