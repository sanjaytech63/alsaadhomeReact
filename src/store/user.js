import { create } from 'zustand';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  userInfo: null,
  loginToken: "",

  setUserInfo: (userInfo) => {
    Storage.setStoreValue('USER', userInfo);
    Storage.setStoreValue('TOKEN', userInfo.token);
    set(() => ({ userInfo, isLoggedIn: true, loginToken: userInfo.token }));
  },

  logout: () => {
    localStorage.multiRemove(['TOKEN', 'USER']);
    set(() => ({ userInfo: null, isLoggedIn: false, loginToken: '' }));
  },
}));

export default useUserStore;
