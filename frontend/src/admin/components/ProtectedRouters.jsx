import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import instance from "../../axiosConfig.js";

function ProtectedRouters({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    checkForlogin();
  }, []);

  async function checkForlogin() {
    try {
      await instance.get("/check/login?referer=admin", {
        withCredentials: true,
      });
      setAllowed(true);
    } catch {
      setAllowed(false);
    }
  }

  if (allowed === null) return null;

  return allowed ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRouters;
