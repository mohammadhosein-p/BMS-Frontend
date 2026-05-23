import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type AuthState, type User, type LoginResponse } from "../types/authTypes";

interface ExtendedAuthState extends AuthState {
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (payload: LoginResponse) => void;
  updateUser: (payload: Partial<User>) => void;
  logout: () => void;
}

const useAuthStore = create<ExtendedAuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      isAuthenticated: false,

      setAuth: (payload) =>
        set({
          user: payload.user,
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
          isAuthenticated: true,
        }),

      updateUser: (payload) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...payload } : (payload as User),
          isAuthenticated: true, 
        })),

      logout: () => {
        set({
          user: null,
          access_token: null,
          refresh_token: null,
          isAuthenticated: false,
        });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
