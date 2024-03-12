import { createContext, useState } from "react";
import { typeAuthContext } from "../utils/type";

const AuthContext = createContext<typeAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
