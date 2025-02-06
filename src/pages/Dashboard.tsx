import { LogOut, Package, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import PurchasedProducts from "./PurchasedProducts.tsx";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { clearCart } = useCart();
  const { pathname } = useLocation();

  const handleLogOutClick = () => {
    signOut();
    clearCart();
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <h2 className="mt-4 text-3xl font-semibold">
                  {user?.username}
                </h2>
                <p className="text-gray-600 text-xl">{user?.email}</p>
              </div>
              <nav className="mt-8">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-2 text-gray-700 ${
                    pathname == "/dashboard"
                      ? "bg-gray-100"
                      : "hover:bg-gray-100"
                  } rounded-lg`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  My Items
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mt-2"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mt-2"
                  onClick={handleLogOutClick}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Log out
                </Link>
              </nav>
            </div>
          </div>
          <PurchasedProducts />
        </div>
      </div>
    </div>
  );
}
