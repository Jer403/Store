import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "./UserButton.tsx";
import { HLine } from "./Elements/HLine.tsx";
import { useEffect } from "react";
import { useUtils } from "../hooks/useUtils.tsx";
import { BRANDNAME, LANGUAGE, POSITIONS } from "../consts.ts";
import { useAuth } from "../hooks/useAuth.tsx";
import { usePreferences } from "../hooks/usePreferences.tsx";

export function Navbar() {
  const { lineLeft, setLineLeftProperties } = useUtils();
  const { logged, loadingLog } = useAuth();
  const location = useLocation();
  const { preferences } = usePreferences();

  useEffect(() => {
    if (location.pathname == "/") setLineLeftProperties(POSITIONS.Home);
    else if (location.pathname == "/login")
      setLineLeftProperties(POSITIONS.User);
    else if (location.pathname == "/register")
      setLineLeftProperties(POSITIONS.User);
    else if (location.pathname == "/cart")
      setLineLeftProperties(POSITIONS.User);
    else if (location.pathname == "/checkout")
      setLineLeftProperties(POSITIONS.User);
    else if (location.pathname == "/about")
      setLineLeftProperties(POSITIONS.About);
    else if (location.pathname == "/contact")
      setLineLeftProperties(POSITIONS.Contact);
    else setLineLeftProperties(POSITIONS.User);
  }, [location]);

  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-indigo-600">
            {BRANDNAME}
          </Link>

          <div className="hidden md:flex items-center relative space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-white hover:text-indigo-600"
              onClick={() => setLineLeftProperties(POSITIONS.Home)}
            >
              <>{LANGUAGE.NAVBAR.HOME[preferences.language]}</>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-white hover:text-indigo-600"
              onClick={() => setLineLeftProperties(POSITIONS.About)}
            >
              <>{LANGUAGE.NAVBAR.ABOUT[preferences.language]}</>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-white hover:text-indigo-600"
              onClick={() => setLineLeftProperties(POSITIONS.Contact)}
            >
              <>{LANGUAGE.NAVBAR.CONTACT[preferences.language]}</>
            </Link>
            <HLine style={lineLeft} />
          </div>

          <div className="flex items-center justify-end gap-1 max-w-[120px]">
            {/* <Link to="/dashboard" className="md:hidden text-gray-700 hover:text-indigo-600">
              <User className="h-6 w-6" />
            </Link> */}
            <UserButton
              logged={logged}
              loading={loadingLog}
              preferences={preferences}
              onClickEvent={() => setLineLeftProperties(POSITIONS.User)}
            />
            <button className="md:hidden ml-3">
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
