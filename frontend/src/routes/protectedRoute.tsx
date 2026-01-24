import { use, type ReactNode } from "react"
import type { UserRole } from "../services/auth.service"
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/ui/LoadingScreen";

interface ProtectedRouteType {
    children : ReactNode
    allowedRoles: UserRole[];
}

const ProtectedRoute = ({children, allowedRoles} : ProtectedRouteType) => {
    const { user, isAuthentificated, loading } = useAuth();
    const location = useLocation();
    console.log(use)
    if (loading) return <LoadingScreen />; 

    if (!isAuthentificated) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
}

export default ProtectedRoute;