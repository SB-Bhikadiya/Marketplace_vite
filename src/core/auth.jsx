import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_ENDPOINT,
} from "../constants/endpoints";
import { ADDRESS_KEY, MARKETPLACE_TOKEN, USER_KEY } from "../constants/keys";
import { PAGE_ROUTES } from "../constants/routes";
import { AxiosInstance } from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post(REGISTER_ENDPOINT, userData);
      setUser(response.data.user);
      fetchUser(localStorage.getItem(ADDRESS_KEY));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const { data } = await AxiosInstance.post(LOGIN_ENDPOINT, userData);
      setUser(data.user);
      data.user && localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      data.token && localStorage.setItem(MARKETPLACE_TOKEN, data.token); // Store JWT in localStorage
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const fetchUser = async (address) => {
    const { data } = await AxiosInstance.get(USER_ENDPOINT, {
      params: { wallet: address },
    });
    if (data.message) {
      console.log("Message received");
      Swal.fire(data.message);
      navigate(PAGE_ROUTES.REGISTER_PATH);
      return;
    }
    setUser(data.user);
    data.user && localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    data.token && localStorage.setItem(MARKETPLACE_TOKEN, data.token); // Store JWT in localStorage
  };
  const isLoggedInCheck = () => {
    const token = localStorage.getItem(MARKETPLACE_TOKEN);
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken.sub);
      } else {
        console.log("Expored");
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
    localStorage.clear(); // Remove JWT from localStorage upon logout
  };

  // Check if there's a stored JWT and set the user accordingly
  // useEffect(isLoggedInCheck, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        fetchUser,
        login,
        logout,
        getHeaders,
        isLoggedInCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
