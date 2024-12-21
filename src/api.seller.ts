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