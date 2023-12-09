import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    value: null,
    expirationData: 0,
  }),
  getters: {
    isExpired() {
      return this.expirationDate - Date.now() <= 0;
    },
    exists() {
      return this.value !== null;
    },
  },
  actions: {
    updateToken(token) {
      this.value = token.value;
      this.expirationData = token.expirationData;

      localStorage.setItem('token', JSON.stringify(token));
    },
    initToken() {
      const token = JSON.parse(localStorage.getItem('token'));
      this.value = token?.value || null;
      this.expirationData = token?.expirationData || 0;
    },
    deleteToken() {
      localStorage.removeItem('token');
      this.value = null;
      this.expirationData = 0;
    },
  },
});
