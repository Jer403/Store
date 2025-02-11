import { CircleDashed, CreditCard } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useCart } from "../hooks/useCart";
import { COUNTRIES } from "../consts";
import { paymentCardRequest } from "../Api/tpp";

interface ValidationStateProps {
  name: boolean | null;
  lastName: boolean | null;
  address: boolean | null;
  country: boolean | null;
  phoneNumber: boolean | null;
  city: boolean | null;
  postalCode: boolean | null;
}

export default function Checkout() {
  const { state: cart, loadingCart } = useCart();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [name, setName] = useState("Jose");
  const [lastName, setLastName] = useState("Jhonson");
  const [address, setAddress] = useState(
    "Ave. Guadí 232, Barcelona, Barcelona"
  );
  const [country, setCountry] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("645553333");
  const [callingCode, setCallingCode] = useState("34");
  const [city, setCity] = useState("Barcelona");
  const [postalCode, setPostalCode] = useState("78622");

  const [validationState, setValidationState] = useState<ValidationStateProps>({
    name: null,
    lastName: null,
    address: null,
    country: null,
    phoneNumber: null,
    city: null,
    postalCode: null,
  });

  const handleClickSubmit = async () => {
    console.log("starting to submit");
    if (!loadingSubmit) {
      const validation = validateInformation();

      if (Object.values(validation).every((isValid) => isValid)) {
        console.log("All is fine");
        setLoadingSubmit(true);
        const res = await paymentCardRequest({
          name,
          lastName,
          phoneNumber: `+${callingCode}${phoneNumber}`,
          address,
          city,
          country,
          postalCode,
        });
        if (res.status == 200) {
          console.log(res);
          location.href = res.data.paymentlink;
          return;
        }
        console.log(res);
      }
    }
  };

  const validateInformation = () => {
    const newValidationState = {
      name: name.length >= 1,
      lastName: lastName.length >= 1,
      address: address.length >= 1,
      country: country >= 0,
      phoneNumber: phoneNumber.length >= 1,
      city: city.length >= 1,
      postalCode: Number(postalCode) >= 0,
    };

    setValidationState(newValidationState);

    // Devuelve una promesa para que `handleClickSubmit` espere la actualización
    return newValidationState;
  };

  const [total, setTotal] = useState(0);

  const orderCId = useId();
  const itemsCId = useId();

  useEffect(() => {
    const total = cart.reduce((sum = 0, item) => sum + item.price, 0);
    setTotal(total);
  }, [cart]);

  // client: {
  //   name: "John",
  //   lastName: "McClane",
  //   address: "Ave. Guadí 232, Barcelona, Barcelona",
  //   phone: "+34645553333",
  //   email: "client@email.com",
  //   countryId: 1,
  //   termsAndConditions: "true",
  //   "city": "Barcelona",
  //   "postCode": "78622"
  // },

  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-full mx-auto mb-10 ">
          <div className="bg-white dark:bg-gray-900 md:dark:bg-transparent flex flex-col md:flex-row-reverse md:justify-center md:gap-3 rounded-lg shadow-md md:shadow-none p-6 md:p-0">
            <div className="md:dark:bg-gray-900 md:p-6 md:rounded-lg md:shadow-md w-full md:max-w-80 lg:max-w-[360px] flex flex-col md:h-[342px] mb-8 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Checkout
              </h1>

              <div>
                <h2
                  key={orderCId}
                  className="text-lg font-semibold dark:text-gray-100 mb-4"
                >
                  Order Summary
                </h2>
                <div
                  key={itemsCId}
                  className="border-t border-b dark:border-gray-500 py-4"
                >
                  {cart.length != 0 ? (
                    cart.map((prod) => (
                      <div
                        key={"chr-" + prod.id + itemsCId}
                        className="flex justify-between items-center"
                      >
                        <div key={"chr-0" + prod.id + itemsCId}>
                          <h3 className="font-medium dark:text-gray-100">
                            {prod.title}
                          </h3>
                        </div>
                        <span
                          key={"chr-1" + prod.id + itemsCId}
                          className="font-semibold dark:text-gray-100"
                        >
                          ${prod.price}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xl dark:text-gray-100">
                      You don't have any product in the cart
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <span className="font-semibold flex justify-between dark:text-gray-100">
                    Total
                    <span>
                      <span className="font-semibold text-xl dark:text-gray-100">
                        ${total}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <button
                onClick={handleClickSubmit}
                className={`w-full bg-indigo-600 hidden md:flex text-white py-3 mt-3 rounded-lg hover:bg-indigo-700  items-center justify-center ${
                  (loadingCart || loadingSubmit || cart.length == 0) &&
                  "cursor-not-allowed bg-indigo-800"
                }`}
                disabled={loadingCart || loadingSubmit || cart.length == 0}
              >
                {loadingSubmit ? (
                  <CircleDashed className="loader" />
                ) : (
                  <span className="flex row align-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay Now
                  </span>
                )}
              </button>
            </div>
            <div className="md:dark:bg-gray-900 md:p-6 md:rounded-lg md:shadow-md w-full max-w-2xl">
              <div className="mb-8 md:mb-0">
                <h2 className="text-lg font-semibold mb-4 dark:text-gray-50">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      disabled={loadingSubmit || cart.length == 0}
                      onChange={(e) => {
                        setName(e.target.value);
                        const newState = { ...validationState, name: null };
                        setValidationState(newState);
                      }}
                      className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        validationState.name == false
                          ? "border-red-400 shake"
                          : ""
                      }`}
                      placeholder="Jhon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      disabled={loadingSubmit || cart.length == 0}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        const newState = { ...validationState, lastName: null };
                        setValidationState(newState);
                      }}
                      className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        validationState.name == false
                          ? "border-red-400 shake"
                          : ""
                      }`}
                      placeholder="Anderson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-row">
                      <select
                        className="w-1/6 px-3 py-2 border-t border-l border-b dark:bg-gray-900 dark:border-gray-500 dark:text-white  appearance-none border-gray-300 rounded-tl-md rounded-bl-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={callingCode}
                        disabled={loadingSubmit || cart.length == 0}
                        onChange={(e) => setCallingCode(e.target.value)}
                      >
                        {COUNTRIES.sort((a, b) =>
                          a.slug.localeCompare(b.slug)
                        ).map((country) => (
                          <option
                            key={"spnc-chr-" + country.id}
                            value={`${country.callingCode}`}
                            className="flex justify-between"
                          >
                            {country.slug} +{country.callingCode}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={phoneNumber}
                        disabled={loadingSubmit || cart.length == 0}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          const newState = {
                            ...validationState,
                            phoneNumber: null,
                          };
                          setValidationState(newState);
                        }}
                        className={`w-full px-3 py-2 dark:bg-gray-900 dark:border-gray-500 dark:text-white  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] border border-gray-300 rounded-tr-md rounded-br-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          validationState.name == false
                            ? "border-red-400 shake"
                            : ""
                        }`}
                        placeholder="2125844128"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      disabled={loadingSubmit || cart.length == 0}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        const newState = { ...validationState, address: null };
                        setValidationState(newState);
                      }}
                      className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        validationState.name == false
                          ? "border-red-400 shake"
                          : ""
                      }`}
                      placeholder="Ave. Guadí 232, Barcelona, Barcelona"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={country}
                      disabled={loadingSubmit || cart.length == 0}
                      onChange={(e) => setCountry(Number(e.target.value))}
                      className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        loadingSubmit ? "appearance-none" : ""
                      }`}
                    >
                      {COUNTRIES.sort((a, b) =>
                        a.name.localeCompare(b.name)
                      ).map((country) => (
                        <option key={"sc-chr-" + country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        disabled={loadingSubmit || cart.length == 0}
                        onChange={(e) => {
                          setCity(e.target.value);
                          const newState = { ...validationState, city: null };
                          setValidationState(newState);
                        }}
                        className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          validationState.name == false
                            ? "border-red-400 shake"
                            : ""
                        }`}
                        placeholder="Barcelona"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        disabled={loadingSubmit || cart.length == 0}
                        value={postalCode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                          const newState = {
                            ...validationState,
                            postalCode: null,
                          };
                          setValidationState(newState);
                        }}
                        className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] ${
                          validationState.name == false
                            ? "border-red-400 shake"
                            : ""
                        }`}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClickSubmit}
                className={`w-full bg-indigo-600 flex md:!hidden text-white py-3 rounded-lg hover:bg-indigo-700 items-center justify-center ${
                  (loadingCart || loadingSubmit || cart.length == 0) &&
                  "cursor-not-allowed bg-indigo-800"
                }`}
                disabled={loadingCart || loadingSubmit || cart.length == 0}
              >
                {loadingSubmit ? (
                  <CircleDashed className="loader" />
                ) : (
                  <span className="flex row align-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay Now
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="flex mt-4 items-center justify-center">
            <p className="text-sm text-gray-600 px-3">
              By continuing with the payment you agree to the Terms and
              Conditions of Tropipay Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
