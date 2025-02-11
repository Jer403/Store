import { XCircleIcon } from "lucide-react";
import { useId } from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "../hooks/usePreferences";
import { BRANDNAME, LANGUAGE } from "../consts";

export default function About() {
  const { preferences } = usePreferences();
  const orderCId = useId();
  const itemsCId = useId();
  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
            <p className="text-5xl font-bold text-center mb-4 flex justify-center items-center gap-3">
              <XCircleIcon className="h-20 w-20 text-[--wrong]"></XCircleIcon>
              <span className="text-gray-700 dark:text-white">
                {LANGUAGE.PAY_FAILED.TITLE[preferences.language]}
              </span>
            </p>
            <div className="flex justify-center items-center mb-10"></div>

            <p className="text-lg text-gray-700 dark:text-white mb-6">
              {LANGUAGE.PAY_FAILED.TEXT1[preferences.language]}
            </p>
            <p className="text-lg text-gray-700 dark:text-white mb-6">
              {LANGUAGE.PAY_FAILED.TEXT2[preferences.language]}
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-white mb-6">
              {LANGUAGE.PAY_FAILED.TEXT3[preferences.language]}
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-white mb-6">
              {LANGUAGE.PAY_FAILED.TEXT4[preferences.language]}
            </p>
            <p className="text-lg text-gray-700 dark:text-white">
              {LANGUAGE.PAY_FAILED.GREETINGS[preferences.language]},
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-white mb-10">
              {BRANDNAME}.
            </p>

            <div className="flex flex-row gap-4  mb-10">
              <Link
                to="/"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                {LANGUAGE.PAY_FAILED.HOME[preferences.language]}
              </Link>
              <Link
                to="/cart"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                {LANGUAGE.PAY_FAILED.CART[preferences.language]}
              </Link>
            </div>

            <div className="bg-gray-100 dark:bg-gray-950 p-5 rounded-md">
              <h2
                key={orderCId}
                className="text-xl text-gray-700 dark:text-white font-semibold mb-4"
              >
                {LANGUAGE.PAY_FAILED.DETAILS[preferences.language]}
              </h2>
              <div key={"chr-0" + "prod.id" + itemsCId}>
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                  {LANGUAGE.PAY_FAILED.PRODUCTS[preferences.language]}
                </h3>
              </div>
              <div key={itemsCId} className="border-t border-b py-4 mb-3">
                <div
                  key={"chr-" + "prod.id" + itemsCId}
                  className="flex justify-between items-center"
                >
                  <div key={"chr-0" + "prod.id" + itemsCId}>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Amphora
                    </h3>
                  </div>
                  <span
                    key={"chr-1" + "prod.id" + itemsCId}
                    className="font-semibold text-gray-800 dark:text-white"
                  >
                    $32
                  </span>
                </div>
              </div>
              <div
                key={"chr-" + "prod.id" + itemsCId}
                className="flex justify-between items-center  mb-3"
              >
                <div key={"chr-0" + "prod.id" + itemsCId}>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                    {LANGUAGE.PAY_FAILED.AMOUNT[preferences.language]}
                  </h3>
                </div>
                <span
                  key={"chr-1" + "prod.id" + itemsCId}
                  className="font-semibold text-gray-800 dark:text-white"
                >
                  $32
                </span>
              </div>
              <div
                key={"chr-" + "prod.id" + itemsCId}
                className="flex justify-between items-center  mb-3"
              >
                <div key={"chr-0" + "prod.id" + itemsCId}>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                    {LANGUAGE.PAY_FAILED.ORDER[preferences.language]}
                  </h3>
                </div>
                <span
                  key={"chr-1" + "prod.id" + itemsCId}
                  className="font-semibold text-gray-800 dark:text-white"
                >
                  AK2184KKJKHSD123
                </span>
              </div>
              <div
                key={"chr-" + "prod.id" + itemsCId}
                className="flex justify-between items-center  mb-3"
              >
                <div key={"chr-0" + "prod.id" + itemsCId}>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                    {LANGUAGE.PAY_FAILED.DATE[preferences.language]}
                  </h3>
                </div>
                <span
                  key={"chr-1" + "prod.id" + itemsCId}
                  className="font-semibold text-gray-800 dark:text-white"
                >
                  January 30, 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
