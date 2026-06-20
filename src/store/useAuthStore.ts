import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, refresh: string) => void;
  logout: () => void;
}

const getToken = () => {
  return localStorage.getItem("access");
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getToken(),
  token: getToken(),
  login: (token, refresh) => {
    localStorage.setItem("access", token);
    localStorage.setItem("refresh", refresh);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    set({ isAuthenticated: false, token: null });
  },
}));
