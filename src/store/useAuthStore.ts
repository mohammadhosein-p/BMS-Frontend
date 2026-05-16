import { create } from "zustand";

export type Role = "admin" | "user";

export type User = {
    id: string;
    name: string;
    role: Role;
};

type AuthState = {
    user: User | null;

    loading: boolean;

    setUser: (user: User | null) => void;

    setLoading: (loading: boolean) => void;

    logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
    user: null,

    loading: true,

    setUser: (user) =>
        set({
            user,
        }),

    setLoading: (loading) =>
        set({
            loading,
        }),

    logout: () =>
        set({
            user: null,
        }),
}));

export default useAuthStore;
