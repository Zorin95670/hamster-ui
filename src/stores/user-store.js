import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    email: '',
  }),
  actions: {
    updateUser(user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    },
  },
});
