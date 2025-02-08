import { CheckCircle } from "lucide-react";
import { useId } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const orderCId = useId();
  const itemsCId = useId();
  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 py-12 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
            <p className="text-5xl font-bold text-center flex justify-center items-center gap-3 mb-10">
              <CheckCircle className="h-20 w-20 text-[--good]"></CheckCircle>
              <span className="text-gray-700 dark:text-white">
                Payment Success
              </span>
            </p>

            <p className="text-lg text-gray-700 dark:text-white mb-6">
              Queremos expresarte nuestro más sincero agradecimiento por tu
              compra en nuestra tienda virtual. Nos llena de alegría contar con
              clientes tan valiosos como tú, y tu confianza en nosotros es lo
              que nos motiva a seguir mejorando día a día. Espero que disfrutes
              de tu compra tanto como nosotros disfrutamos preparándola para ti.
            </p>
            <p className="text-lg text-gray-700 dark:text-white mb-6">
              ¡Pronto tendra disponible sus productos en su perfil!
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-white mb-6">
              ¡Gracias por ser parte de nuestra comunidad y por contribuir a que
              sigamos creciendo!
            </p>
            <p className="text-lg text-gray-700 dark:text-white">
              Un cordial saludo,
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-white mb-10">
              DigitalMarket.
            </p>

            <div className="flex flex-row gap-4 mb-10">
              <Link
                to="/"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                Home
              </Link>
              <Link
                to="/Dashboard"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                Dashboard
              </Link>
            </div>

            <div className="bg-gray-100 dark:bg-gray-950 p-5 rounded-md">
              <h2
                key={orderCId}
                className="text-xl text-gray-700 dark:text-white font-semibold mb-4"
              >
                Payment Details
              </h2>
              <div key={"chr-0" + "prod.id" + itemsCId}>
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                  Purchased products
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
                    Amount paid
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
                    Order Code
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
                    Payment Date
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
