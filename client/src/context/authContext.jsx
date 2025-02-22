import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, useLayoutEffect } from "react";
import { RequestInterceptor, ResponseInterceptor } from "@/utils/axiosInterceptors";
import { fetchUserRequest, logoutRequest } from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    logoutRequest();
  };

  const handleSetBalance = (amount) => {
    setUser((prev) => ({ ...prev, balance: amount.toFixed(2) }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserRequest();
        login(response.accessToken);
      } catch (err) {
        console.error(err);
        logout();
      }
    };
    fetchUser();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = RequestInterceptor(accessToken);

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = ResponseInterceptor(setAccessToken);

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const context = {
    user,
    login,
    logout,
    handleSetBalance,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthContext;
