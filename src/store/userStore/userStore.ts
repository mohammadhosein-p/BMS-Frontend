import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type AuthState, type User, type LoginResponse } from "../../types/authTypes";

interface AuthActions {
  setAuth: (payload: LoginResponse) => void;
  updateUser: (payload: Partial<User>) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      access: null,
      refresh: null,
      isAuthenticated: false,

      setAuth: (payload) =>
        set({
          user: payload.user,
          access: payload.access,
          refresh: payload.refresh,
          isAuthenticated: true,
        }),

      updateUser: (payload) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...payload } : null,
        })),

      logout: () => {
        set({
          user: null,
          access: null,
          refresh: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        access: state.access,
        refresh: state.refresh,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;