import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom"; 
import { logoutService } from "@/services/authService";
import { useRef } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLogout = () => {
  const logoutFromStore = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const callbackRef = useRef<(() => void) | undefined>(undefined);

  const logoutMutation = useMutation({
    mutationFn: logoutService,
    onSettled: async () => {
      
      if (callbackRef.current) {
        callbackRef.current();
      }

      await delay(1000);

      navigate("/login", { replace: true });
      
      queryClient.clear();
      logoutFromStore();
    },
  });

  const handleLogout = (onCompleteCallback?: () => void) => {
    callbackRef.current = onCompleteCallback;
    logoutMutation.mutate();
  };

  return {
    handleLogout,
    isLoading: logoutMutation.isPending, 
    error: logoutMutation.error,
  };
};