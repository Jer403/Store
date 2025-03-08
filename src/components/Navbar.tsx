import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "./UserButton.tsx";
import { HLine } from "./Elements/HLine.tsx";
import { useEffect, useRef, useState } from "react";
import { useUtils } from "../hooks/useUtils.tsx";
import { LANGUAGE, POSITIONS } from "../consts.ts";
import { useAuth } from "../hooks/useAuth.tsx";
import { usePreferences } from "../hooks/usePreferences.tsx";

const PlacesUser: string[] = ["/login", "/register", "/cart", "/checkout"];

// function Divisor() {
//   return <div className="border-l border-gray-400 h-5 mx-4"></div>;
// }

export function Navbar() {
  const { lineLeft, setLineLeftProperties } = useUtils();
  const { logged, loadingLog } = useAuth();
  const location = useLocation();
  const { preferences } = usePreferences();
  const [mobileLinksShown, setMobileLinksShown] = useState(false);
  const HomeRef = useRef<HTMLAnchorElement | null>(null);
  const AboutRef = useRef<HTMLAnchorElement | null>(null);
  const ContactRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (location.pathname == "/") {
      setLineLeftProperties({
        left: `${HomeRef.current?.offsetLeft}`,
        width: `${HomeRef.current?.offsetWidth}`,
      });
    } else if (PlacesUser.includes(location.pathname))
      setLineLeftProperties(POSITIONS.User);
    else if (location.pathname == "/about") {
      setLineLeftProperties({
        left: `${AboutRef.current?.offsetLeft}`,
        width: `${AboutRef.current?.offsetWidth}`,
      });
    } else if (location.pathname == "/contact")
      setLineLeftProperties({
        left: `${ContactRef.current?.offsetLeft}`,
        width: `${ContactRef.current?.offsetWidth}`,
      });
    else setLineLeftProperties(POSITIONS.User);
  }, [location]);

  return (
    <nav className="bg-[#74e6b1] dark:bg-gray-900">
      <div className="mx-auto px-4 bg-[--primary] dark:bg-gray-900 relative z-20">
        <div className="flex justify-between items-center h-16">
          {/* <Link
            to="/"
            className="font-bold text-xl text-gray-800"
            onClick={() => setMobileLinksShown(false)}
          >
            <span>{BRANDNAME}</span>
          </Link> */}

          <div className="hidden md:flex items-center relative space-x-8">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-[--secondary]"
              onClick={() => {
                setLineLeftProperties(POSITIONS.Home);
                setMobileLinksShown(false);
              }}
            >
              <span ref={HomeRef}>
                {LANGUAGE.NAVBAR.HOME[preferences.language]}
              </span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 font-medium hover:text-[--secondary]"
              onClick={() => {
                setLineLeftProperties(POSITIONS.Contact);
                setMobileLinksShown(false);
              }}
            >
              <span ref={ContactRef}>
                {LANGUAGE.NAVBAR.CONTACT[preferences.language]}
              </span>
            </Link>
            <HLine style={lineLeft} />
          </div>

          <div className="flex items-center justify-end gap-1 md:w-[140px] -ml-5">
            <UserButton
              logged={logged}
              loading={loadingLog}
              preferences={preferences}
              onClickEvent={() => {
                setLineLeftProperties(POSITIONS.User);
                setMobileLinksShown(false);
              }}
            />
            <button className="md:hidden ml-3 dark:text-white">
              <div
                className="flex justify-center items-center"
                onClick={() => setMobileLinksShown(!mobileLinksShown)}
              >
                {mobileLinksShown ? (
                  <X className="h-8 w-8"></X>
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          mobileLinksShown ? "translate-y-0" : "-translate-y-full"
        } w-full absolute bg-white dark:bg-gray-900 h-auto p-4 z-0 transition-transform duration-300`}
      >
        <div className="flex flex-col justify-center md:hidden gap-1 items-end relative space-x-8">
          <Link
            to="/"
            className="text-gray-700 dark:text-white hover:text-indigo-600 text-xl"
            onClick={() => setMobileLinksShown(!mobileLinksShown)}
          >
            <>{LANGUAGE.NAVBAR.HOME[preferences.language]}</>
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-white hover:text-indigo-600 text-xl"
            onClick={() => setMobileLinksShown(!mobileLinksShown)}
          >
            <>{LANGUAGE.NAVBAR.CONTACT[preferences.language]}</>
          </Link>
        </div>
      </div>
    </nav>
  );
}
