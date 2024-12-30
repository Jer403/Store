import { useContext } from "react"
import { UtilsContext } from "../context/utils"


export const useUtils = () => {
    const context = useContext(UtilsContext)
    if (context == undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}