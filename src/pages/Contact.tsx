import { Mail, Phone, MapPin } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";
import { LANGUAGE } from "../consts";

export default function Contact() {
  const { preferences } = usePreferences();
  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
            {LANGUAGE.CONTACT.TITLE[preferences.language]}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                {LANGUAGE.CONTACT.TOUCH[preferences.language]}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.CONTACT.NAME[preferences.language]}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.CONTACT.EMAIL[preferences.language]}
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.CONTACT.MESSAGE[preferences.language]}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  {LANGUAGE.CONTACT.SEND[preferences.language]}
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                {LANGUAGE.CONTACT.CONTACT_INFO[preferences.language]}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="dark:text-white">
                    support@digitalmarket.com
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="dark:text-white">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="dark:text-white">
                    123 Digital Street, Tech City, TC 12345
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
