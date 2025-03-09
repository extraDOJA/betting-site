import { authAdapter } from '../adapters/authAdapter';
import { sportsAdapter } from '../adapters/sportsAdapter';
import { userAdapter } from '../adapters/userAdapter';

class ApiService {
  constructor() {
    this.tokenGetter = null;
    this.tokenSetter = null;
    this.adapters = {
      auth: authAdapter,
      sports: sportsAdapter,
      user: userAdapter
    };
  }

  setupTokenHandlers(tokenGetter, tokenSetter) {
    this.tokenGetter = tokenGetter;
    this.tokenSetter = tokenSetter;
    
    Object.values(this.adapters).forEach(adapter => {
      if (adapter.client && adapter.client.setupInterceptors) {
        adapter.client.setupInterceptors(tokenGetter, tokenSetter);
      }
    });
    
    return this;
  }
}

export const apiService = new ApiService();