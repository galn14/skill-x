import { auth, provider, signInWithPopup } from '../firebaseConfig';
import axios from '../axiosConfig';

const baseUrl = 'http://localhost:8080'; // Replace with your API base URL
export const updateMajor = async (
    id_major: string,
    title_major: string,
    icon_url: string
  ) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Authentication token is missing.");
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
  
      const majorData = { id_major, title_major, icon_url };
  
      const response = await axios.put(`${baseUrl}/majors/update`, majorData, config);
      console.log("Major updated response:", response);
      return response.data;
    } catch (error) {
      console.error("Error updating major:", error);
      throw error;
    }
  };
  
export const fetchMajorById = async (majorId: string) => {
    try {
      const response = await fetch(`/api/majors/${majorId}`); // Ganti dengan endpoint yang sesuai
      if (!response.ok) {
        throw new Error('Failed to fetch major data');
      }
      const data = await response.json();
      return data; // Misalnya, data berupa objek { titleMajor: string, iconUrl: string }
    } catch (error) {
      console.error('Error fetching major by ID:', error);
      throw error; // Meneruskan error agar bisa ditangani oleh komponen yang memanggil fungsi ini
    }
  };

  
export const createMajor = async (majorData: { titleMajor: string, iconUrl: string }) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Authentication token is missing.');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };
  
      const response = await axios.post(`${baseUrl}/majors/admincreate`, majorData, config);
      
      console.log('Major created response:', response);  // Log the full response to inspect
      return response.data;  // Ensure you're returning the expected response
    } catch (error) {
      console.error('Error creating major:', error);
      throw error; // Make sure any errors are thrown so you can debug properly
    }
  };
  
  // In api.service.ts
  
  
  
  // Delete Major
  export const deleteMajor = async (idMajor: string) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Authentication token is missing.");
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.delete(`${baseUrl}/majors/delete/${idMajor}`, config);
      console.log("Major deleted response:", response);
      return response.data;
    } catch (error) {
      console.error("Error deleting major:", error);
      throw error;
    }
  };