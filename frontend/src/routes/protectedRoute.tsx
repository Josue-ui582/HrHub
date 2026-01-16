import type { ReactNode } from "react"
import type { UserRole } from "../services/auth.service"
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteType {
    children : ReactNode
    allowedRoles: UserRole[];
}

const ProtectedRoute = ({children, allowedRoles} : ProtectedRouteType) => {
    const {user, isAuthentificated} = useAuth();
    const location = useLocation();

    if (!isAuthentificated) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/nofound" replace />;
    }
    return <>{children}</>
}

export default ProtectedRoute;