import { useUtils } from "../hooks/useUtils"
import LoadingBar from "./LoadingBar"

export function LoadingBarWrapper(){
    const { isLoading, setIsLoading} = useUtils()
    setIsLoading(true)
    return <><LoadingBar isLoading={isLoading}/></>
}
  