import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setTokens: (access, refresh) => {
        set({ accessToken: access, refreshToken: refresh });
      },

      setAccessToken: (access) => {
        set({ accessToken: access });
      },

      clearAuth: () => {
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);