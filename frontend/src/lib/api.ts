import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    withCredentials: true, // Required for cookie handling
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Redirect to login if unauthorized (401)
        if (error.response?.status === 401 && typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// User API
export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export default api;
