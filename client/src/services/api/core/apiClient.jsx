import { formatErrorMessage } from "@/utils/errorHandler";
import { addRequestInterceptor, addResponseInterceptor } from "@/utils/axiosInterceptors";
import axios from "axios";

export class ApiClient {
  constructor(baseUrl, config = {}) {
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: config.timeout || 10000,
      headers: config.headers || {
        "Content-Type": "application/json",
      },
    });
    this.requestInterceptorId = null;
    this.responseInterceptorId = null;
  }

  setupInterceptors(tokenGetter, tokenSetter) {
    if (this.requestInterceptorId !== null) {
      this.instance.interceptors.request.eject(this.requestInterceptorId);
    }

    if (this.responseInterceptorId !== null) {
      this.instance.interceptors.response.eject(this.responseInterceptorId);
    }

    this.requestInterceptorId = addRequestInterceptor(this.instance, tokenGetter ? tokenGetter() : null);

    this.responseInterceptorId = addResponseInterceptor(this.instance, tokenSetter || (() => {}));

    return this;
  }

  async request(method, url, options = {}) {
    try {
      const response = await this.instance({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error) {
      const formattedError = new Error(formatErrorMessage(error));
      formattedError.originalError = error;
      formattedError.status = error.response?.status;
      formattedError.data = error.response?.data;

      throw formattedError;
    }
  }

  get(url, params = {}) {
    return this.request("GET", url, { params });
  }

  post(url, data = {}, config = {}) {
    return this.request("POST", url, { ...config, data });
  }

  put(url, data = {}) {
    return this.request("PUT", url, { data });
  }

  patch(url, data = {}) {
    return this.request("PATCH", url, { data });
  }

  delete(url, config = {}) {
    return this.request("DELETE", url, config);
  }
}
