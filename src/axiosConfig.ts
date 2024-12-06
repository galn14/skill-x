import axios from 'axios';

// Buat instance Axios global
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Sesuaikan dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menangani respons error
axiosInstance.interceptors.response.use(
  (response) => response, // Jika respons sukses, lanjutkan
  (error) => {
    if (error.response?.data?.error === 'Invalid ID Token') {
      alert('Session Anda telah habis. Silakan login ulang.');
      localStorage.removeItem('userToken'); // Hapus token
      localStorage.removeItem('userRole'); // Bersihkan role
      localStorage.removeItem('userInfo'); // Bersihkan informasi pengguna
      window.location.href = '/login'; // Redirect ke halaman login
    }
    return Promise.reject(error); // Tetap reject error untuk penanganan lain
  }
);

export default axiosInstance;
