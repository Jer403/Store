import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface UserButtonProps {
    logged: boolean;
    onClickEvent: MouseEventHandler;
  }

export function UserButton({logged, onClickEvent}: UserButtonProps) {

    return (
      <Link to={logged ? "/dashboard" : "/login"} className="text-gray-700 hover:text-indigo-600" onClick={onClickEvent}>
        <button
          type="button"
          className="px-4 py-2 w-130 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {logged ? 'Dashboard' : 'Login'}
        </button>
      </Link>
        
    );
  }