import axios from '../axiosConfig';

const baseUrl = 'http://localhost:8080'; // Replace with your API base URL
export interface Major {
  idMajor: string;
  titleMajor: string;
  iconUrl: string;
}

export const updateMajor = async (token: string, updatedMajor: Record<string, any>) => {
  try {
    // Log the data being sent to the backend
    console.log('Updating major with data:', updatedMajor); 

    // Send the PUT request to the backend with the updated major data
    const response = await axios.put(
      `${baseUrl}/majors/adminupdate?id_major=${updatedMajor.id_major}`, // Correct query parameter
      {
        title_major: updatedMajor.title_major, // Ensure the body uses correct field names
        icon_url: updatedMajor.icon_url // icon_url
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          'Content-Type': 'application/json', // Ensure the correct content type
        },
      }
    );

    // Log the response from the API
    console.log('API response:', response); 

    // Return the response data from the backend
    return response.data;
  } catch (error) {
    // Log and throw any error that occurs
    console.error('Error updating major:', error);
    throw error;
  }
};

// export const fetchMajorById = async (majorId: string) => {
//     try {
//       const response = await fetch(`/api/majors/${majorId}`); // Ganti dengan endpoint yang sesuai
//       if (!response.ok) {
//         throw new Error('Failed to fetch major data');
//       }
//       const data = await response.json();
//       return data; // Misalnya, data berupa objek { titleMajor: string, iconUrl: string }
//     } catch (error) {
//       console.error('Error fetching major by ID:', error);
//       throw error; // Meneruskan error agar bisa ditangani oleh komponen yang memanggil fungsi ini
//     }
//   };

export const fetchMajorByTitle = async (token: string, titleMajor: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/majors/adminshow`,
      { title_major: titleMajor },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch major: ${response.statusText}`);
    }

    return response.data.major; // Data major
  } catch (error) {
    console.error("Error fetching major by title:", error);
    throw error;
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
  
  export const deleteMajor = async (idMajor: string): Promise<void> => {
    try {
      const token = localStorage.getItem('userToken'); // Pastikan key sesuai
      if (!token) {
        throw new Error('User is not authenticated');
      }
  
      const response = await axios.delete(`${baseUrl}/majors/admindelete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { idMajor }, // Kirim ID major dalam body
      });
  
      console.log('Major deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting major:', error);
      throw error;
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

  export const fetchCategories = async () => {
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

      const response = await axios.get(`${baseUrl}/category`, config);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error("Failed to fetch categories.");
    }
  };
  
  
  export const createCategory = async (categoryData: { title: string, iconUrl: string, title_major: string }) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Authentication token is missing.');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };

      // Prepare the data in the expected format
      const payload = {
        title: categoryData.title,
        photo_url: categoryData.iconUrl, // Ensure the field name matches the backend expectations
        title_major: categoryData.title_major,
      };

      console.log("Sending request with data:", payload);  // Log the data being sent
      console.log("Request headers:", config.headers);  // Log headers for debugging

      const response = await axios.post(`${baseUrl}/category/admincreate`, payload, config);
      console.log('Category created response:', response);  // Log the full response to inspect

      return response.data;  // Ensure you're returning the expected response
    } catch (error) {
      console.error('Error creating category:', error);  // Log the error
      throw error;  // Rethrow the error for further handling in the calling function
    }
};

export const updateCategory = async (id_category: string, categoryData: any) => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    throw new Error("User token is missing");
  }

  try {
    const response = await axios.put(
      `${baseUrl}/categories/adminupdate?id_category=${id_category}`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`, // Ensure the token is passed here
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
    console.log('Response dari backend:', response.data); // Debugging log

  } catch (error) {
    console.error("Failed to update category:", error);
    throw error;
  }
  
};


  
  // Delete a category
  export const deleteCategory = async (id: string) => {
    try {
      const response = await axios.post(`${baseUrl}/category/admindelete`, {
        id,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete category:", error);
      throw new Error("Failed to delete category.");
    }
  };