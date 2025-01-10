// src/services/api.service.ts
import { auth, provider, signInWithPopup } from './firebaseConfig';
import axios from './axiosConfig';

const baseUrl = 'http://localhost:8080'; // Replace with your API base URL

export const verifySeller = async (uid: string, status: string) => {
  try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Authentication token is missing.');

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      const response = await axios.post(
          `${baseUrl}/admin/verify-seller`,
          {
              uid,
              status, // 'accepted' or 'denied'
          },
          config
      );

      return response.data; // Return response data
  } catch (error) {
      console.error('Error verifying seller:', error);
      throw error;
  }
};

export const fetchSellers = async () => {
  try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Authentication token is missing.');

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      const response = await axios.get(`${baseUrl}/admin/regsiterSeller`, config); // Assuming endpoint is /api/sellers
      return response.data;
  } catch (error) {
      console.error('Error fetching sellers:', error);
      throw error;
  }
};

// Product by user id
export const fetchProductByUserID = async (userID: string) => {
  try {
    // Ambil token autentikasi dari localStorage
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    // Konfigurasi header dengan token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Lakukan request GET ke endpoint backend
    const response = await axios.get(`${baseUrl}/products/view-seller-product?uid=${userID}`, {
      params: { userID }, // Kirim userID sebagai query parameter
      ...config, // Sertakan konfigurasi header
    });

    // Kembalikan data respons
    return response.data;
  } catch (error) {
    console.error('Error fetching products by user ID:', error);
    throw error; // Lemparkan error untuk penanganan di sisi frontend
  }
};

// Fetch all conversations
export const fetchConversations = async () => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseUrl}/conversations`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};

// Fetch messages for a specific conversation
export const fetchMessages = async (conversationID: string) => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseUrl}/messages?conversationID=${conversationID}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

// Send a message
export const sendMessage = async (messageData: { receiverID: string; messageContent: string }) => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(`${baseUrl}/messages-send`, messageData, config);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Fetch product details by userID and productID
export const fetchProductDetails = async (userID: string, productID: string) => {
  try {
      const token = localStorage.getItem('userToken'); // Fetch token from localStorage
      if (!token) {
          throw new Error("Authentication token is missing.");
      }

      if (!userID || !productID) {
          throw new Error("Both userID and productID are required."); // Ensure userID and productID are provided
      }

      const config = {
          headers: {
              Authorization: `Bearer ${token}`, // Attach token to the request
              'Content-Type': 'application/json',
          },
      };

      console.log(userID, productID);

      // Make the GET request to fetch product details
      const response = await axios.get(`${baseUrl}/products/viewid?user_id=${userID}&product_id=${productID}`, config);
      return response.data.data; // Return the product details data
      
  } catch (error) {
      console.error('Error fetching product details:', error);
      throw error; // Propagate error for handling
  }
};

// Fetch user details by their UID
export const fetchUserDetails = async (uid: string) => {
  try {
    const token = localStorage.getItem('userToken'); // Fetch token from localStorage
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    if (!uid) {
      throw new Error("UID is required."); // Ensure uid is provided
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request
        'Content-Type': 'application/json',
      },
    };

    console.log(uid);
    // Make the GET request to fetch user details
    const response = await axios.get(`${baseUrl}/user?uid=${uid}`, config);
    console.log('User Details Response:', response); // Debug response
    return response.data; // Return the user details data
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; // Propagate error for handling
  }
};

export const Message = async (receiverID: string, messageContent: string) => {
  const token = localStorage.getItem('userToken');
  const response = await axios.post(
      `${baseUrl}/messages-send`,
      {
          receiverID, // ID lawan bicara
          messageContent, // Isi pesan
      },
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
  );
  return response.data; // Response { success: boolean, data: { id: string } }
};


export const showMessage = async (partnerID: any, messageID: any) => {
  try {
    const token = localStorage.getItem('userToken'); // Fetch token from localStorage
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request
      },
    };

    const response = await axios.get(`${baseUrl}/messages/show?partnerID=${partnerID}&messageID=${messageID}`, config);
    return response.data; // Return the specific message data
  } catch (error) {
    throw error; // Propagate error for handling
  }
};




export const fetchMajors = async () => {
  try {
 
    const token = localStorage.getItem('userToken'); // Fetch token from localStorage
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request
      },
    };
    const response = await axios.get(`${baseUrl}/majors`, config);
    return response.data; // Return the majors data
  } catch (error) {
    throw error; // Propagate error for handling
  }
};

export const fetchServices = async () => {
  try {
    const token = localStorage.getItem('userToken'); // Fetch token from localStorage
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the request
      },
    };

    const response = await axios.get(`${baseUrl}/services`, config); // Adjust the URL as needed
    return response.data; // Return the services data
  } catch (error) {
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

export const getRegisterSellerStatus = async (userToken: string) => {
  try {
    const response = await axios.get(`${baseUrl}/user/request-seller-status`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data; // This should return `{ status: "pending" }`
  } catch (error: any) {
    console.error('Error fetching register seller status:', error.response || error);
    throw error.response?.data || error; // Ensure the error is propagated
  }
};

export const requestSeller = async (userToken: string, payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/user/request-seller`, payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('Error in requestSeller:', error.response || error);
    throw error.response?.data || error; // Throw the error for further handling
  }
};


//
// STATUS SELLER API
//
export const getUserAndSellerData = async (userToken: string) => {
  try {
    const response = await axios.get(`${baseUrl}/user/user-seller-data`, {
      headers: {  
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data; // { user: {...}, registerSeller: {...} }
  } catch (error: any) {
    console.error('Error fetching user and seller data:', error.response || error);
    throw error.response?.data || error; // Ensure the error is propagated
  }
};


export const changeUserRole = async (userToken: string, role: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/change-role`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to change role');
  }
};


//
// PORTOFOLIO API
//
// Ambil semua portofolio user
export const getUserPortfolios = async (token: string) => {
  try {
    const response = await axios.get(`${baseUrl}/user/portfolios/view`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('API Response:', response.data);
    return response.data; // Mengembalikan data portofolio
  } catch (error) {
    const err = error as any;
    console.error('API Error:', err.response?.data || err.message);
    throw error;
  }
};
// Tambah portofolio baru
export const addPortfolio = async (token: string, portfolioData: any) => {
  try {
    const response = await axios.post(`${baseUrl}/user/portfolios/create`, portfolioData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Mengembalikan data portofolio baru
  } catch (error) {
    const err = error as any;
    console.error('Error adding portfolio:', err.response?.data || err.message);
    throw error;
  }
};

// Edit portofolio
export const editPortfolio = async (token: string, portfolioData: any) => {
  try {
    const response = await axios.post(`${baseUrl}/user/portfolios/update`, portfolioData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Mengembalikan data portofolio yang diupdate
  } catch (error) {
    const err = error as any;
    console.error('Error editing portfolio:', err.response?.data || err.message);
    throw error;
  }
};

// Hapus portofolio
export const deletePortfolio = async (token: string, portfolioId: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/portfolios/delete`,
      { id: portfolioId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Mengembalikan pesan sukses
  } catch (error) {
    const err = error as any;
    console.error('Error deleting portfolio:', err.response?.data || err.message);
    throw error;
  }
};

// Fungsi untuk mencari produk
export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${baseUrl}/products/search`, {
      params: { query },
    });
    return response.data; // Mengembalikan hasil pencarian
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
export const searchUsers = async (query: string) => {
  const token = localStorage.getItem('userToken'); // Get the token from localStorage
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`http://localhost:8080/user-search?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const createChatroom = async (participantID: string) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      `${baseUrl}/new-chatroom`,
      { participantID },
      config
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error('Error creating chatroom:', error);
    throw error; // Propagate the error
  }
};
