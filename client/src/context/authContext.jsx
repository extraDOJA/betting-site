import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { RequestInterceptor, ResponseInterceptor } from "@/utils/axiosInterceptors";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { authAdapter, apiService } from "@/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    apiService.setupTokenHandlers(
      () => accessToken,
      (newToken) => setAccessToken(newToken)
    );
  }, [accessToken]);

  const login = (token) => {
    setAccessToken(token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    authAdapter.logout();
  };

  const handleSetBalance = (amount) => {
    if (typeof amount === "string") {
      amount = parseFloat(amount);
    }
    setUser((prev) => ({ ...prev, balance: amount.toFixed(2) }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAdapter.refreshToken();
        login(response.accessToken);
      } catch (err) {
        handleError(err, false);
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
