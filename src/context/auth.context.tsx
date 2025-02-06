import { createContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../Api/auth";

interface UserInterface {
  id: string;
  username: string;
  email: string;
  preferences: { language: string; theme: string; currency: string };
}

interface AuthContextType {
  user: UserInterface | null;
  logged: boolean;
  loadingLog: boolean;
  signUp: (user: {
    password: string;
    username: string;
    email: string;
  }) => Promise<void | unknown>;
  signIn: (user: {
    password: string;
    email: string;
  }) => Promise<void | unknown>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: import("react").ReactElement;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logged: false,
  loadingLog: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [logged, setLogged] = useState(false);
  const [loadingLog, setLoadingLog] = useState(true);

  const signUp = async (user: {
    password: string;
    username: string;
    email: string;
  }) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setLogged(true);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const signIn = async (user: { password: string; email: string }) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setLogged(true);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setLogged(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const verifyToken = async () => {
    try {
      const res = await verifyTokenRequest();
      console.log(res.data.preferences);

      if (!res.data) {
        setUser(null);
        setLoadingLog(false);
        return setLogged(false);
      }

      setUser({ ...res.data, preferences: res.data.preferences });
      setLogged(true);
      setLoadingLog(false);
    } catch (error) {
      console.log(error);
      setLogged(false);
      setUser(null);
      setLoadingLog(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingLog,
        logged,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
