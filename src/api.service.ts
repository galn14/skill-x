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

export const fetchMajors = async () => {
  try {
    console.log("Starting fetchMajors...");

    const token = localStorage.getItem('userToken'); // Fetch token from localStorage
    if (!token) {
      console.error("User token not found in localStorage!");
      throw new Error("Authentication token is missing.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request
      },
    };

    console.log("Fetching from API endpoint...");
    const response = await axios.get(`${baseUrl}/majors/adminfetch`, config);

    console.log("API response:", response); // Log the full response
    console.log("Majors data:", response.data); // Log the data payload

    return response.data; // Return the majors data
  } catch (error) {
    console.error("Error in fetchMajors:", error);
    throw error; // Propagate error for handling
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
