import React, { useEffect } from "react";
import instance from "../../axiosConfig.js";

function ProtectedRouters({ children }) {
  useEffect(() => {
    checkForlogin();
  }, []);

  async function checkForlogin() {
    const response = await instance.get(
      "/check/login?referer=admin",
      { withCredentials: true }
    );

    // console.log(response);
  }

  return children;
}

export default ProtectedRouters;
