// src/services/api.service.ts
import { auth, provider, signInWithPopup } from './firebaseConfig';
import axios from './axiosConfig';

const baseUrl = 'http://localhost:8080'; // Replace with your API base URL

async function searchControllerAPI(query: string): Promise<{
    success: boolean;
    users?: Array<any>;
    products?: Array<any>;
    error?: string;
  }> {

    const token = localStorage.getItem('userToken');
if (!query) {
    throw new Error("Search term is required");
  }

  try {
    // Construct the full URL with query parameters
    const url = `${baseUrl}/searchAll?query=${encodeURIComponent(query)}`;

    // Call the API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the response
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch search results");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error in searchControllerAPI:", error.message);
    return { success: false, error: error.message };
  }
}

export default searchControllerAPI;