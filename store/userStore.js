import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    userName: "",
    userDisplayName: "",
    userID: "",
    userAuthenticated: "",
    userToken: "",
    userLoginExpire: "",
    userTermsAccepted: false,
  }),
  actions: {
    setUser(user) {
      this.userName = user.userName;
      this.userDisplayName = user.userDisplayName;
      (this.userID = user.userID),
        (this.userAuthenticated = user.userAuthenticated);
      this.userToken = user.userToken;
      this.userLoginExpire = user.userLoginExpire;
      this.userTermsAccepted = user.userTermsAccepted;
    },
  },
  getters: {
    isUserAuthenticated() {
      return !!this.userAuthenticated;
    },
    getUserName() {
      return this.userName;
    },
    getUserDisplayName() {
      return this.userDisplayName;
    },
    getUserId() {
      return this.userID;
    },
  },
});
