import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import instance from "../axiosConfig";
import { useEffect, useState } from "react";

const UserProtectedRoute = ({ children }) => {
  const { isUserLoggedIn, logoutUserState } = useAuth();
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    async function checkStatus() {
      try {
        await instance.get("/check/login?referer=user", {
          withCredentials: true,
        });
        setAllowed(true);
      } catch {
        logoutUserState();
        setAllowed(false);
      }
    }
    checkStatus();
  }, []);

  if (allowed === null) return null;

  return isUserLoggedIn && allowed ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );

};

export default UserProtectedRoute;
