import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../utils/validateToken.js";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await validateToken();
      setIsAuth(authStatus);
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
