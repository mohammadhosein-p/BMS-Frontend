import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type AuthState, type User, type LoginResponse } from "../types/authTypes";
import formatProfileImage from "@/utils/formatProfileImage";

interface ExtendedAuthState extends AuthState {
  isAuthenticated: boolean;
}

const DEFAULT_USER: User = {
  id: "",
  created_at: "",
  apartment_id: null,
  unit_id: null,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  role: "resident",
  gender: "",
  profile_image_url: null,
};


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

      setAuth: (payload) => {
        const completeUser: User = {
          ...DEFAULT_USER,
          ...payload.user,
        };

        const formattedUser = formatProfileImage(completeUser);

        set({
          user: formattedUser,
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
          isAuthenticated: true,
        });
      },

      updateUser: (payload) =>
        set((state) => {
          const baseUser = state.user || DEFAULT_USER;

          const updatedUser: User = {
            ...baseUser,
            ...payload,
          };

          const formattedUser = formatProfileImage(updatedUser);

          return {
            user: formattedUser,
            isAuthenticated: true,
          };
        }),

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
