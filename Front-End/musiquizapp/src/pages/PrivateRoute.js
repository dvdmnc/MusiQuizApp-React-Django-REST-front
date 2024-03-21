import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../context";

const PrivateRoute = ({ Component }) => {
    const{ VerifyToken } = useContext(TokenContext)

    let isAuthenticated = !VerifyToken() ? false : true

    return isAuthenticated ? <Component/> : <Navigate to="/"/>
    
};

export default PrivateRoute;