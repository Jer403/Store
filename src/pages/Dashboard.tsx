import { Package, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="min-h-screen-minus-64 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
                <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
                <p className="text-gray-600">john@example.com</p>
              </div>
              <nav className="mt-8">
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
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
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">My Purchased Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <img
                    src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80"
                    alt="Game"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="mt-4 text-lg font-semibold">Adventure Game Pro</h3>
                  <p className="text-gray-600 text-sm mt-1">Purchased on March 10, 2024</p>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}