import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { getCurrentUserService } from "@/services/authService";

function ProtectedLayout() {
    const { user, access, updateUser, logout } = useAuthStore();
    const [isVerifying, setIsVerifying] = useState(!!access && !user);

    useEffect(() => {
        async function verifyUser() {
            try {
                    // const userId = user?.id;
                    // const userData = await getCurrentUserService(userId);
                    // updateUser(userData);

                    const mockUserData = {
                        id: "1",
                        apartment_id: "apt_102_b",
                        first_name: "امیرحسین",
                        last_name: "رضایی",
                        username: "amir_rezaei",
                        email: "amir.rezaei@example.com",
                        phone: "09123456789",
                        role: "user",
                        gender: "male",
                        profile_image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=amir",
                    };

                    updateUser(mockUserData);
            } catch (error) {
                console.error("Verification failed:", error);
                logout();
            } finally {
                setIsVerifying(false);
            }
        }
        verifyUser();
        // if (access && !user) {
        //     verifyUser();
        // }
        // else {
        //     setIsVerifying(false);
        // }

    }, []);
    
    if (isVerifying) {
        return <HomePageSkeleton />;
    }

    // if (!access || !user) {
    //     return <Navigate to="/login" replace />;
    // }
    return <Outlet />;
}

export default ProtectedLayout;