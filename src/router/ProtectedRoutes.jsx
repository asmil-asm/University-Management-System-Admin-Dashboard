import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/useAuth";
const ProtectedRoutes = ({ children }) => {
    const {accessToken} = useAuth();
    const location = useLocation();

  
  
    if (!accessToken ) {
        return <Navigate to='/' replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoutes;