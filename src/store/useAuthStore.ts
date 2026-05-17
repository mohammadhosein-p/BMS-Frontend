import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type AuthState, type User, type LoginResponse } from "../types/authTypes";

interface ExtendedAuthState extends AuthState {
  loading: boolean;
}

interface AuthActions {
  setAuth: (payload: LoginResponse) => void;
  updateUser: (payload: Partial<User>) => void;
  setLoading: (loading: boolean) => void; 
  logout: () => void;
}

const useAuthStore = create<ExtendedAuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      access: null,
      refresh: null,
      isAuthenticated: false,
      loading: false,

      setAuth: (payload) =>
        set({
          user: payload.user,
          access: payload.access,
          refresh: payload.refresh,
          isAuthenticated: true,
          loading: false, 
        }),

      updateUser: (payload) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...payload } : (payload as User),
          isAuthenticated: true,
        })),

      setLoading: (loading) => set({ loading }),

      logout: () => {
        set({
          user: null,
          access: null,
          refresh: null,
          isAuthenticated: false,
          loading: false,
        });
        useAuthStore.persist.clearStorage();
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