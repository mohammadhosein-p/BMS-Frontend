import { Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";

import useAuthStore from "@/store/useAuthStore";

import HomePageSkeleton from "@/components/home/HomePageSkeleton";

function ProtectedLayout() {
    const { user, loading, setUser, setLoading } = useAuthStore();

    useEffect(() => {
        async function verifyUser() {
            try {
                /**
                 * fake api request
                 */

                await new Promise((resolve) => setTimeout(resolve, 1500));

                /**
                 * fake response
                 */

                const userData = {
                    id: "1",
                    name: "Mohammad",
                    role: "admin" as const,
                };

                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        /**
         * جلوگیری از request اضافی
         */

        if (!user) {
            verifyUser();
        } else {
            setLoading(false);
        }
    }, []);

    /**
     * loading state
     */

    if (loading) {
        return <HomePageSkeleton />;
    }

    /**
     * unauthenticated
     */

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    /**
     * authenticated
     */

    return <Outlet />;
}

export default ProtectedLayout;
