import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { getMyProfileService } from "@/services/userService"; 

function ProtectedLayout() {
    const { user, access_token, updateUser, logout } = useAuthStore();
    const [isVerifying, setIsVerifying] = useState(!!access_token && !user);

    useEffect(() => {
        async function verifyUser() {
            try {
                // const userData = await getMyProfileService();
                // updateUser(userData);
            } catch (error) {
                console.error("Verification failed, logging out:", error);
                logout(); 
            } finally {
                setIsVerifying(false);
            }
        }

        // if (access_token && !user) {
        //     verifyUser();
        // } else {
        //     setIsVerifying(false);
        // }
    }, [access_token, user, updateUser, logout]);
    
    if (isVerifying) {
        return <HomePageSkeleton />;
    }

    // if (!access_token) {
    //     return <Navigate to="/login" replace />;
    // }

    return <Outlet />;
}

export default ProtectedLayout;