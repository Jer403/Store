import { useContext } from "react"
import { LineLeftContext } from "../context/lineleft"


export const useLineLeft = () => {
    const context = useContext(LineLeftContext)
    if (context == undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}