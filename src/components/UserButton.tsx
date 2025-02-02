import { LogIn, ShoppingCart, User } from "lucide-react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface UserButtonProps {
  logged: boolean;
  onClickEvent: MouseEventHandler;
}

export function UserButton({ logged, onClickEvent }: UserButtonProps) {
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
            className="px-4 py-2  w-14 sm:w-[85px] flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <>
              <ShoppingCart></ShoppingCart>{" "}
              <span className="hidden sm:block ">Cart</span>
            </>
          </button>
        </Link>
      )}
      <Link
        to={logged ? "/dashboard" : "/login"}
        className="text-gray-700 hover:text-indigo-600"
        onClick={onClickEvent}
      >
        <button
          type="button"
          className="px-4 py-2 w-14 sm:w-32 flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {logged ? (
            <>
              <User></User> <span className="hidden sm:block ">Dashboard</span>
            </>
          ) : (
            <>
              <LogIn width={18} height={24}></LogIn>
              <span className="hidden sm:block ">Login</span>
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
