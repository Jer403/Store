import { XCircleIcon } from "lucide-react";
import { useId } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const orderCId = useId();
  const itemsCId = useId();
  return (
    <div className="min-h-screen-minus-64 bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-5xl font-bold text-center mb-4 flex justify-center items-center gap-3">
              <XCircleIcon className="h-20 w-20 text-[--wrong]"></XCircleIcon>
              <span>Payment Failed</span>
            </p>
            <div className="flex justify-center items-center mb-10"></div>

            <p className="text-lg text-gray-700 mb-6">
              Lo sentimos, hubo un problema con tu pago
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Agradecemos tu intención de compra en nuestra tienda y, al mismo
              tiempo, le informamos que hubo un inconveniente con el
              procesamiento de tu pago. Lamentamos mucho esta situación y
              entendemos lo frustrante que puede ser.
            </p>
            <p className="text-lg font-bold text-gray-700 mb-6">
              Te sugerimos verificar con tu banco o método de pago si hubo algún
              bloqueo o restricción.
            </p>
            <p className="text-lg font-bold text-gray-700 mb-6">
              Gracias por tu paciencia y por confiar en nosotros.
            </p>
            <p className="text-lg text-gray-700">Un cordial saludo,</p>
            <p className="text-lg font-bold text-gray-700 mb-10">
              DigitalMarket.
            </p>

            <div className="flex flex-row gap-4  mb-10">
              <Link
                to="/"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                Cart
              </Link>
            </div>

            <div className="bg-gray-100 p-5 rounded-md">
              <h2
                key={orderCId}
                className="text-xl text-gray-700 font-semibold mb-4"
              >
                Payment Details
              </h2>
              <div key={"chr-0" + "prod.id" + itemsCId}>
                <h3 className="text-lg font-medium text-gray-700">
                  Products to purchased
                </h3>
              </div>
              <div key={itemsCId} className="border-t border-b py-4 mb-3">
                <div
                  key={"chr-" + "prod.id" + itemsCId}
                  className="flex justify-between items-center"
                >
                  <div key={"chr-0" + "prod.id" + itemsCId}>
                    <h3 className="font-medium text-gray-800">Amphora</h3>
                  </div>
                  <span
                    key={"chr-1" + "prod.id" + itemsCId}
                    className="font-semibold text-gray-800"
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
                  <h3 className="text-lg font-medium text-gray-700">
                    Amount to pay
                  </h3>
                </div>
                <span
                  key={"chr-1" + "prod.id" + itemsCId}
                  className="font-semibold text-gray-800"
                >
                  $32
                </span>
              </div>
              <div
                key={"chr-" + "prod.id" + itemsCId}
                className="flex justify-between items-center  mb-3"
              >
                <div key={"chr-0" + "prod.id" + itemsCId}>
                  <h3 className="text-lg font-medium text-gray-700">
                    Order Code
                  </h3>
                </div>
                <span
                  key={"chr-1" + "prod.id" + itemsCId}
                  className="font-semibold text-gray-800"
                >
                  AK2184KKJKHSD123
                </span>
              </div>
              <div
                key={"chr-" + "prod.id" + itemsCId}
                className="flex justify-between items-center  mb-3"
              >
                <div key={"chr-0" + "prod.id" + itemsCId}>
                  <h3 className="text-lg font-medium text-gray-700">
                    Payment Date
                  </h3>
                </div>
                <span
                  key={"chr-1" + "prod.id" + itemsCId}
                  className="font-semibold text-gray-800"
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
