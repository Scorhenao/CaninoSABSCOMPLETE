import axios from "axios";
const path = import.meta.env.VITE_MAIN_PATH;

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${path}/login`, credentials); 
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('fullName', response.data.fullName);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${path}/users/check-email`, {
      params: { email },
    });
    return response.data.exists;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const isAuthenticated = () => {
  
  const token = localStorage.getItem('token');
  return !!token;
};

export const logout = () => {
  
  localStorage.removeItem('token');
  localStorage.removeItem('fullName');
  
};