import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  userInfo: null,
  loginToken: "",
  setUserInfo: (userInfo) => {
    localStorage.setItem("USER", JSON.stringify(userInfo));
    localStorage.setItem("TOKEN", userInfo.token);
    set(() => ({
      userInfo: userInfo,
      isLoggedIn: true,
      loginToken: userInfo.token,
    }));
  },
  logout: () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("cart_id"); 
    set(() => ({
      userInfo: null,
      isLoggedIn: false,
      loginToken: "",
    }));
  },
}));

export default useUserStore;
