import { useContext } from "react"
import { LoggedContext } from "../context/logged"


export const useLogged = () => {
    const context = useContext(LoggedContext)
    if (context == undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}