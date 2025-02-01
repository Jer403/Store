import { useEffect } from "react";
import { useUtils } from "../../hooks/useUtils";
import LoadingBar from "./LoadingBar";

export function LoadingBarWrapper() {
  const { isLoading, setIsLoading } = useUtils();
  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);
  return (
    <>
      <LoadingBar isLoading={isLoading} />
    </>
  );
}
