import { createContext, useState } from "react";


export const LineLeftContext = createContext({lineLeft: {left: "", width: ""}, setLineLeftProperties: ({}: LineLeftSetterProps)=>{}})


interface LineLeftProviderProps{
    children: import("react").ReactElement;
}

interface LineLeftSetterProps{
    left: string;
    width: string;
}



export function LineLeftProvider({ children }: LineLeftProviderProps) {
    const [lineLeft, setLineLeft] = useState({left:"0px", width:"43"})

    const setLineLeftProperties = ({left, width}: LineLeftSetterProps) => {setLineLeft({left, width})}

    return (
        <LineLeftContext.Provider value={{ lineLeft, setLineLeftProperties }}>
            {children}
        </LineLeftContext.Provider>
    )
}