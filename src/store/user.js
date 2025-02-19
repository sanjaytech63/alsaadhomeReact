import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  userInfo: null,
  loginToken: "",
  setUserInfo: (userInfo) => {
    console.log(userInfo, '---===> user data');
    set((state) => {
      console.log('Setting user info:', state);
      return {
        userInfo: userInfo,
        isLoggedIn: true,
        loginToken: userInfo.token,
      };
    });
    localStorage.setItem("USER", JSON.stringify(userInfo));
  },
  logout: () => {
    set((state) => {
      console.log('Logging out, current state:', state);
      return {
        userInfo: null,
        isLoggedIn: false,
        loginToken: "",
      };
    });
    localStorage.removeItem("USER");
    localStorage.removeItem("cart_id");
  },
}));

export default useUserStore;
