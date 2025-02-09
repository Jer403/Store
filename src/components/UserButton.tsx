import { CircleDashed, LogIn, ShoppingCart, User } from "lucide-react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { UserInterface } from "../types";
import { LANGUAGE } from "../consts";

interface UserButtonProps {
  logged: boolean;
  onClickEvent: MouseEventHandler;
  loading: boolean;
  user: UserInterface | null;
}

export function UserButton({
  logged,
  user,
  loading,
  onClickEvent,
}: UserButtonProps) {
  return (
    <>
      {logged && (
        <Link
          to="/cart"
          className="text-gray-700 hover:text-indigo-600"
          onClick={onClickEvent}
        >
          <button
            type="button"
            className="px-4 py-2 w-18 sm:w-auto flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <>
              <ShoppingCart className="h-5 w-5"></ShoppingCart>{" "}
              <span className="hidden sm:block ">
                <>
                  {user
                    ? LANGUAGE.NAVBAR.CART[user.preferences.language]
                    : LANGUAGE.NAVBAR.CART.en}
                </>
              </span>
            </>
          </button>
        </Link>
      )}
      <Link
        to={loading ? "/" : logged ? "/dashboard" : "/login"}
        className="text-gray-700 hover:text-indigo-600"
        onClick={onClickEvent}
      >
        <button
          type="button"
          className="px-4 py-2 w-14 sm:w-auto flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <CircleDashed className="h-6 w-6 loader"></CircleDashed>
          ) : logged ? (
            <>
              <User className="h-5 w-5"></User>{" "}
              <span className="hidden sm:block ">
                <>
                  {user
                    ? LANGUAGE.NAVBAR.DASHBOARD[user.preferences.language]
                    : LANGUAGE.NAVBAR.DASHBOARD.en}
                </>
              </span>
            </>
          ) : (
            <>
              <LogIn width={18} height={24}></LogIn>
              <span className="hidden sm:block ">
                <>
                  {user
                    ? LANGUAGE.NAVBAR.LOGIN[user.preferences.language]
                    : LANGUAGE.NAVBAR.LOGIN.en}
                </>
              </span>
            </>
          )}
        </button>
      </Link>
    </>
  );
}

// export function UserButton({ logged, onClickEvent }: UserButtonProps) {
//   return (
//     <>
//       {logged && (
//         <Link
//           to="/cart"
//           className="text-gray-700 hover:text-indigo-600"
//           onClick={onClickEvent}
//         >
//           <button
//             type="button"
//             className="px-4 py-2 w-14 flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-indigo-600   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <>
//               <ShoppingCart></ShoppingCart>
//             </>
//           </button>
//         </Link>
//       )}
//       <Link
//         to={logged ? "/dashboard" : "/login"}
//         className="text-gray-700 hover:text-indigo-600"
//         onClick={onClickEvent}
//       >
//         <button
//           type="button"
//           className="px-4 py-2 w-14 flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-indigo-600   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           {logged ? (
//             <>
//               <User></User>
//             </>
//           ) : (
//             <>
//               <LogIn width={18} height={24}></LogIn>Login
//             </>
//           )}
//         </button>
//       </Link>
//     </>
//   );
// }
