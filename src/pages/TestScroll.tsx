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
    <div className="w-full h-screen">
      <div className="w-full h-[200vh] bg-gray-500"></div>
      <div
        className="fixed w-full h-screen bg-gray-200 transition-[bottom] py-10 ease-out duration-400"
        style={{ bottom: `-${back}%` }}
      >
        <div className="relative flex py-10 h-full overflow-hidden">
          <div
            className="absolute flex flex-wrap w-full items-center justify-center gap-3"
            style={{ top: `-${scroller}%` }}
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
      </div>
    </div>
  );
}
