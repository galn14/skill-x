// src/services/api.service.ts
import { auth, provider, signInWithPopup } from './firebaseConfig';
import axios from './axiosConfig';

const baseUrl = 'http://localhost:8080'; // Replace with your API base URL

// Fetch all categories
export const fetchCategories = async () => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseUrl}/category`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch all services
export const fetchServices = async () => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseUrl}/services`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

export const createProduct = async (
    token: string,
    productData: {
      nameProduct: string;
      description: string;
      photo_url: string[];
      price: string;
      idCategory: string;
      idService: string;
    }
  ) => {
    const response = await axios.post(
      `${baseUrl}/products/create`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  };

// Fetch product details
export const fetchProductDetails = async (name: string, productName: string) => {
    try {
        const response = await axios.get(`${baseUrl}/products/view`, {
            params: { name, product_name: productName },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};

export const searchProducts = async (query: string) => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseUrl}/products/search?query=${encodeURIComponent(query)}`, config);
        return response.data.data; // Asumsikan response memiliki struktur { success: true, data: [...] }
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};


// Ambil semua produk pengguna
export const fetchProducts = async (token: string) => {
    const response = await axios.get(`${baseUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // Ambil detail produk
  export const viewProduct = async (token: string, uid: string) => {
    const response = await axios.get(`${baseUrl}/products/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { uid },
    });
    return response.data;
  };
  
  // Update produk
  export const updateProduct = async (
    token: string,
    uid: string,
    updatedFields: {
      description?: string;
      photo_url?: string[];
      price?: string;
      idCategory?: string;
      idService?: string;
    }
  ) => {
    const response = await axios.put(
      `${baseUrl}/products/update`,
      updatedFields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { uid },
      }
    );
    return response.data;
  };
  
  // Hapus produk
  export const deleteProduct = async (token: string, uid: string) => {
    const response = await axios.delete(`${baseUrl}/products/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { uid },
    });
    return response.data;
  };


  // Update about me
  export const updateAboutMe = async (aboutMe: string): Promise<void> => {
    try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem('userToken');
        if (!token) throw new Error('Authentication token is missing.');

        // Configure headers with the Bearer token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        // Request body containing the new "about_me"
        const body = {
            about_me: aboutMe,
        };

        // Make the PUT request to update "about_me"
        await axios.put(`${baseUrl}/update-aboutme`, body, config);

        console.log('About Me updated successfully.');
    } catch (error) {
        console.error('Error updating About Me:', error);
        throw error;
    }
};

// Fetch user and seller data by ID
export const fetchUserAndSellerDataByID = async (id: string) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) throw new Error('Authentication token is missing.');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${baseUrl}/user-seller-data`, {
      ...config,
      params: { id }, // Pass `id` as a query parameter
    });

    return response.data; // Return the combined user and seller data
  } catch (error) {
    console.error('Error fetching user and seller data by ID:', error);
    throw error;
  }
};