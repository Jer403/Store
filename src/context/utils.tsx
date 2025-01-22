import { createContext, useState } from "react";

export const UtilsContext = createContext({
  logged: false,
  setLoggedIn: (bool: boolean) => {},
  lineLeft: { left: "", width: "" },
  setLineLeftProperties: ({}: LineLeftSetterProps) => {},
  isLoading: false,
  setIsLoading: (bool: boolean) => {},
});

interface UtilsProviderProps {
  children: import("react").ReactElement;
}

interface LineLeftSetterProps {
  left: string;
  width: string;
}

export function UtilsProvider({ children }: UtilsProviderProps) {
  const [logged, setLogged] = useState(false);
  const [lineLeft, setLineLeft] = useState({ left: "0px", width: "43" });
  const [isLoading, setIsLoading] = useState(false);

  const setLoggedIn = (bool: boolean) => {
    setLogged(bool);
  };

  const setLineLeftProperties = ({ left, width }: LineLeftSetterProps) => {
    setLineLeft({ left, width });
  };

  return (
    <UtilsContext.Provider
      value={{
        logged,
        setLoggedIn,
        lineLeft,
        setLineLeftProperties,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
}
