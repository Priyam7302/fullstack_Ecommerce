import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig.js";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    checkUserLogin();
  }, []);

  async function checkUserLogin() {
    try {
      const res = await instance.get("/check/login?referer=user", {
        withCredentials: true,
      });

      if (res.status === 200) setIsUserLoggedIn(true);
    } catch {
      setIsUserLoggedIn(false);
    }
  }

  function logoutUserState() {
    setIsUserLoggedIn(false);
  }

  return (
    <authContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        checkUserLogin,
        logoutUserState,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
