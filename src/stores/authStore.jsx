import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // 状态
  isLoggedIn: false,
  user: null,
  loading: true,

  // 初始化认证状态
  initializeAuth: () => {
    try {
      const savedUser = localStorage.getItem('memoUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        set({ 
          user: userData, 
          isLoggedIn: true,
          loading: false 
        });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('初始化认证状态失败:', error);
      set({ loading: false });
    }
  },

  // 登录
  login: (userData) => {
    set({ 
      user: userData, 
      isLoggedIn: true 
    });
    localStorage.setItem('memoUser', JSON.stringify(userData));
  },

  // 登出
  logout: () => {
    set({ 
      user: null, 
      isLoggedIn: false 
    });
    localStorage.removeItem('memoUser');
  }
}));

export default useAuthStore;