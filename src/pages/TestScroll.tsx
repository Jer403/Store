import { useEffect, useState } from "react";
import { mapRangeClamped } from "../utils";

export default function TestScroll() {
  const [back, setBack] = useState(100);
  const [scroller, setScroller] = useState(0);

  const handleScroll = () => {
    const val = 100 - mapRangeClamped(50, 250, 0, 100, window.scrollY);
    const val2 = mapRangeClamped(300, 1000, 0, 200, window.scrollY);

    console.log(val2);

    setBack(val);
    setScroller(val2);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="w-full h-[100vh] bg-gray-500"></div>
      <div
        className="relative w-full bg-gray-200 transition-[bottom] pt-10 ease-out duration-400 flex flex-wrap items-center justify-center gap-3"
        style={{ bottom: `-${back}%` }}
      >
        <div className="bg-blue-400 p-3 w-80 h-96"></div>
        <div className="bg-gray-600 p-3 w-80 h-96"></div>
        <div className="bg-blue-400 p-3 w-80 h-96"></div>
        <div className="bg-gray-600 p-3 w-80 h-96"></div>
        <div className="bg-blue-400 p-3 w-80 h-96"></div>
        <div className="bg-gray-600 p-3 w-80 h-96"></div>
        <div className="bg-blue-400 p-3 w-80 h-96"></div>
        <div className="bg-gray-600 p-3 w-80 h-96"></div>
        <div className="bg-blue-400 p-3 w-80 h-96"></div>
        <div className="bg-gray-600 p-3 w-80 h-96"></div>
      </div>
    </div>
  );
}
