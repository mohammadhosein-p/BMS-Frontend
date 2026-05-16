import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

type Props = {
    children: React.ReactNode;

    roles: string[];
};

function RoleGuard({ children, roles }: Props) {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const hasAccess = roles.includes(user.role);

    if (!hasAccess) {
        return <Navigate to="/home" />;
    }

    return children;
}

export default RoleGuard;
