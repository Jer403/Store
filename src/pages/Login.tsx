import {
  CheckCircle2,
  CircleDashed,
  LucideCheckCircle2,
  XCircle,
  EyeIcon,
  EyeOff,
} from "lucide-react";
import { MouseEvent, useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { replaceString } from "../utils";
import { useCart } from "../hooks/useCart";
import { LANGUAGE } from "../consts";

interface SubmitClickProps {
  e: MouseEvent;
}

interface AxiosResult {
  status: number;
  response: { data: [] };
}

export default function Login() {
  const [eyeVisible, setEyeVisible] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [requestErrors, setRequestErrors] = useState<[]>([]);
  const [valEmail, setValEmail] = useState<boolean | null>(null);
  const [valpassword, setValpassword] = useState<boolean | null>(null);
  const { signIn, logged, user } = useAuth();
  const { loadCart } = useCart();
  const navigate = useNavigate();
  const errorIdKey = useId();

  const submitClickHandler = async ({ e }: SubmitClickProps) => {
    e.preventDefault();

    if (valEmail == true && valpassword == true) {
      const target = e.currentTarget;
      target.firstElementChild?.classList.add("md:hidden");
      target.firstElementChild?.nextElementSibling?.setAttribute(
        "style",
        "display: block;"
      );

      const res = (await signIn({ email, password })) as AxiosResult;
      console.log(res);

      if (res.status == 200) {
        target.firstElementChild?.nextElementSibling?.setAttribute(
          "style",
          "display: none;"
        );
        target.lastElementChild?.setAttribute("style", "display: block;");
        target.setAttribute("disabled", "true");
        setDataToDefault();
      } else {
        setRequestErrors(res.response.data);
        target.firstElementChild?.classList.remove("md:hidden");
        target.firstElementChild?.nextElementSibling?.setAttribute(
          "style",
          "display: none;"
        );
      }
    } else {
      if (valEmail != true) {
        document.getElementById("email-address")?.classList.add("shake");
        setTimeout(() => {
          document.getElementById("email-address")?.classList.remove("shake");
        }, 500);
        setValEmail(false);
      }
      if (valpassword != true) {
        document.getElementById("password")?.classList.add("shake");
        setTimeout(() => {
          document.getElementById("password")?.classList.remove("shake");
        }, 500);
        setValpassword(false);
      }
    }
  };

  useEffect(() => {
    if (logged) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let path = replaceString(urlParams.get("path"), "-", "/");
      if (path == "") path = "/";
      loadCart();
      navigate(`${path}`);
    }
  }, [loadCart, logged, navigate]);

  const setDataToDefault = () => {
    setEmail("");
    setPassword("");
    setRequestErrors([]);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValEmail(emailRegex.test(value));
  };

  const validatePassword = (value: string) => {
    if (value.length >= 6) {
      setValpassword(true);
    } else {
      setValpassword(false);
    }
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {user
              ? LANGUAGE.LOGIN.TITLE[user.preferences.language]
              : LANGUAGE.LOGIN.TITLE.en}
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-7">
          <form className=" space-y-7">
            <div className="rounded-md shadow-sm -space-y-px gap-3 flex flex-col">
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  {user
                    ? LANGUAGE.LOGIN.EMAIL[user.preferences.language]
                    : LANGUAGE.LOGIN.EMAIL.en}
                </label>
                <label
                  htmlFor="email-address"
                  className="text-md text-gray-500"
                >
                  {user
                    ? LANGUAGE.LOGIN.EMAIL[user.preferences.language]
                    : LANGUAGE.LOGIN.EMAIL.en}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className="appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                  placeholder=""
                />
                <div
                  className="absolute w-6 h-6 check"
                  style={{
                    color: valEmail ? "var(--good)" : "var(--wrong)",
                  }}
                >
                  {valEmail != null ? (
                    valEmail ? (
                      <LucideCheckCircle2></LucideCheckCircle2>
                    ) : (
                      <XCircle></XCircle>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  {user
                    ? LANGUAGE.LOGIN.PASS[user.preferences.language]
                    : LANGUAGE.LOGIN.PASS.en}
                </label>
                <label htmlFor="password" className="text-md text-gray-500">
                  {user
                    ? LANGUAGE.LOGIN.PASS[user.preferences.language]
                    : LANGUAGE.LOGIN.PASS.en}
                </label>
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onMouseEnter={() => setEyeVisible(true)}
                  onMouseLeave={() => setEyeVisible(false)}
                  className="appearance-non text-md h-12 mt-1 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                <div className="absolute w-6 h-6 eye" style={{ color: "#111" }}>
                  {eyeVisible ? (
                    passwordVisible ? (
                      <EyeOff
                        onMouseEnter={() => setEyeVisible(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordVisible(!passwordVisible);
                        }}
                      ></EyeOff>
                    ) : (
                      <EyeIcon
                        onMouseEnter={() => setEyeVisible(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordVisible(!passwordVisible);
                        }}
                      ></EyeIcon>
                    )
                  ) : (
                    ""
                  )}
                </div>

                <div
                  className="absolute w-6 h-6 check"
                  style={{
                    color: valpassword ? "var(--good)" : "var(--wrong)",
                  }}
                >
                  {valpassword != null ? (
                    valpassword ? (
                      <LucideCheckCircle2></LucideCheckCircle2>
                    ) : (
                      <XCircle></XCircle>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-between"
              style={{ display: requestErrors.length == 0 ? "none" : "block" }}
            >
              <div className="flex items-center">
                {requestErrors.map((item) => (
                  <p
                    key={errorIdKey}
                    className="block text-sm"
                    style={{ color: "var(--wrong)" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-col">
              <div className="flex  items-center justify-between w-full">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-md text-gray-900"
                  >
                    {user
                      ? LANGUAGE.LOGIN.REMEMBERME[user.preferences.language]
                      : LANGUAGE.LOGIN.REMEMBERME.en}
                  </label>
                </div>

                <div className="text-md">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {user
                      ? LANGUAGE.LOGIN.FORGOT[user.preferences.language]
                      : LANGUAGE.LOGIN.FORGOT.en}
                  </a>
                </div>
              </div>
              <div className="flex items-center  justify-end w-full">
                <div className="text-md">
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {user
                      ? LANGUAGE.LOGIN.DONT_HAVE_ACCOUNT[
                          user.preferences.language
                        ]
                      : LANGUAGE.LOGIN.DONT_HAVE_ACCOUNT.en}
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group h-12 relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => {
                  submitClickHandler({ e });
                }}
              >
                <span>
                  {user
                    ? LANGUAGE.LOGIN.SIGNIN[user.preferences.language]
                    : LANGUAGE.LOGIN.SIGNIN.en}
                </span>
                <CircleDashed className="loader" style={{ display: "none" }} />
                <CheckCircle2 style={{ display: "none", color: "white" }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
