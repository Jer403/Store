import { createContext, useState } from "react";


export const LoggedContext = createContext({logged: false, setLoggedIn: ()=>{}})


interface LoggedProviderProps{
    children: import("react").ReactElement;
  }


export function LoggedProvider({ children }: LoggedProviderProps) {
    const [logged, setLogged] = useState(false)

    const setLoggedIn = () => {setLogged(!logged)}

    return (
        <LoggedContext.Provider value={{ logged, setLoggedIn }}>
            {children}
        </LoggedContext.Provider>
    )
}