import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../constants/endpoints";
import { MARKETPLACE_TOKEN } from "../constants/keys";
import { AxiosInstance } from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post(REGISTER_ENDPOINT, userData);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post(LOGIN_ENDPOINT, userData);
      console.log(response.data);
      setUser(response.data.user);
      localStorage.setItem(MARKETPLACE_TOKEN, response.data.token); // Store JWT in localStorage
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const isLoggedInCheck = () => {
    const token = localStorage.getItem(MARKETPLACE_TOKEN);
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken.sub);
      } else {
        console.log('Expored');
        localStorage.removeItem(MARKETPLACE_TOKEN); // Remove expired JWT
      }
    }
    setLoading(false); // Set loading to false after checking for stored JWT
  };
  const getHeaders = () => {
    return {
      headers: {
        Authorization: localStorage.getItem(MARKETPLACE_TOKEN),
      },
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(MARKETPLACE_TOKEN); // Remove JWT from localStorage upon logout
  };

  // Check if there's a stored JWT and set the user accordingly
  useEffect(isLoggedInCheck, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, getHeaders ,isLoggedInCheck}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
