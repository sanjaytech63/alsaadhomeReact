import { create } from "zustand";

const useUserStore = create((set) => {
  const storedUserInfo = localStorage.getItem("USER");
  const storedToken = localStorage.getItem("TOKEN");

  return {
    isLoggedIn: storedUserInfo ? true : false,
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    loginToken: storedToken || "",
    setUserInfo: (userInfo) => {
      localStorage.setItem("USER", JSON.stringify(userInfo));
      localStorage.setItem("TOKEN", userInfo.token);

      console.log(localStorage.getItem("TOKEN", userInfo.token), "token")
      console.log(localStorage.getItem("USER", JSON.stringify(userInfo)), "user")

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
  };
});

export default useUserStore;
