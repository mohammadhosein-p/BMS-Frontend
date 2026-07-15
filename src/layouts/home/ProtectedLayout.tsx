import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { getWhoAmI } from "@/services/authService";

function ProtectedLayout() {
  const { user, access_token, logout, updateUser } = useAuthStore();
  const [isVerifying] = useState(!!access_token && !user);
  const [verified, setIsVerified] = useState<boolean>(true);
  // const [isVerifying, setIsVerifying] = useState(!!access_token && !user);

  useEffect(() => {
    // async function verifyUser() {
    //     try {
    //         // const userData = await getMyProfileService();
    //         // updateUser(userData);
    //     } catch (error) {
    //         console.error("Verification failed, logging out:", error);
    //         logout();
    //     } finally {
    //         setIsVerifying(false);
    //     }
    // }

    // if (access_token && !user) {
    //     verifyUser();
    // } else {
    //     setIsVerifying(false);
    // }

    async function verifyUser() {
      try {
        await getWhoAmI();
        console.log("who am i get");
      } catch (error) {
        console.error("error during refresh token", error);
        setIsVerified(false);
      }
    }

    verifyUser();
  }, [access_token, user, updateUser, logout]);

  if (isVerifying) {
    return <HomePageSkeleton />;
  }

  if (!verified) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
