import {
  CheckCircle2,
  CircleDashed,
  EyeIcon,
  EyeOff,
  LucideCheckCircle2,
  XCircle,
} from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../hooks/useAuth";
import { LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";

interface SubmitClickProps {
  e: MouseEvent;
}

interface AxiosResult {
  status: number;
  response: { data: [] };
}

export default function Register() {
  const [eyeVisible, setEyeVisible] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [valUsername, setValUsername] = useState<boolean | null>(null);
  const [valEmail, setValEmail] = useState<boolean | null>(null);
  const [valPassword, setValpassword] = useState<boolean | null>(null);
  const [requestErrors, setRequestErrors] = useState<[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { signUp, logged, user } = useAuth();
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  let idCount = 0;

  const submitClickHandler = async ({ e }: SubmitClickProps) => {
    e.preventDefault();
    if (valUsername == true && valEmail == true && valPassword == true) {
      setLoadingSubmit(true);

      const res = (await signUp({
        username,
        email,
        password,
      })) as AxiosResult;

      console.log(res);
      if (res.status == 200) {
        setSuccess(true);
        setDataToDefault();
      } else {
        setRequestErrors(res.response.data);
      }
      setLoadingSubmit(true);
    } else {
      if (valUsername != true) {
        document.getElementById("username")?.classList.add("shake");
        setTimeout(() => {
          document.getElementById("username")?.classList.remove("shake");
        }, 500);
        setValUsername(false);
      }
      if (valEmail != true) {
        document.getElementById("email-address")?.classList.add("shake");
        setTimeout(() => {
          document.getElementById("email-address")?.classList.remove("shake");
        }, 500);
        setValEmail(false);
      }
      if (valPassword != true) {
        document.getElementById("password")?.classList.add("shake");
        document.getElementById("password2")?.classList.add("shake");
        setTimeout(() => {
          document.getElementById("password")?.classList.remove("shake");
          document.getElementById("password2")?.classList.remove("shake");
        }, 500);
        setValpassword(false);
      }
    }
  };

  useEffect(() => {
    if (logged) navigate("/");
  }, [logged, navigate]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const validateUsername = (value: string) => {
    if (value.length >= 3) {
      setValUsername(true);
    } else {
      setValUsername(false);
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValEmail(emailRegex.test(value));
  };

  const validatePassword = (value: string, value2: string) => {
    if (value.length >= 6 && value2.length >= 6 && value == value2) {
      setValpassword(true);
    } else {
      setValpassword(false);
    }
  };

  const setDataToDefault = () => {
    setValUsername(null);
    setValEmail(null);
    setValpassword(null);
    setEmail("");
    setUsername("");
    setPassword("");
    setPassword2("");
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {LANGUAGE.REGISTER.TITLE[preferences.language]}
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-7 dark:bg-gray-900">
          <form className="space-y-7">
            <div
              className={`rounded-md shadow-sm -space-y-px ${
                (valEmail != null ||
                  valUsername != null ||
                  valPassword != null) &&
                "mr-6 sm:mr-0"
              }`}
            >
              <div className="relative">
                <label htmlFor="username" className="sr-only">
                  {LANGUAGE.REGISTER.USERNAME[preferences.language]}
                </label>
                <label
                  htmlFor="username"
                  className="text-md text-gray-500 dark:text-gray-300"
                >
                  {LANGUAGE.REGISTER.USERNAME[preferences.language]}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
                  className="appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                <div
                  className="absolute w-6 h-6 check"
                  style={{
                    color: valUsername ? "var(--good)" : "var(--wrong)",
                  }}
                >
                  {valUsername != null ? (
                    valUsername ? (
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
                <label htmlFor="email-address" className="sr-only">
                  {LANGUAGE.REGISTER.EMAIL[preferences.language]}
                </label>
                <label
                  htmlFor="username"
                  className="text-md text-gray-500 dark:text-gray-300"
                >
                  {LANGUAGE.REGISTER.EMAIL[preferences.language]}
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
                  className="appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border autofill:bg-gray-900 dark:bg-gray-900 dark:border-gray-500 dark:text-white border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
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
                  {LANGUAGE.REGISTER.PASS[preferences.language]}
                </label>
                <label
                  htmlFor="username"
                  className="text-md text-gray-500 dark:text-gray-300"
                >
                  {LANGUAGE.REGISTER.PASS[preferences.language]}
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
                    validatePassword(e.target.value, password2);
                  }}
                  onMouseEnter={() => setEyeVisible(true)}
                  onMouseLeave={() => setEyeVisible(false)}
                  className="appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border autofill:bg-gray-900 dark:bg-gray-900 dark:border-gray-500 dark:text-white border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                <div className="absolute w-6 h-6 eye">
                  {eyeVisible ? (
                    passwordVisible ? (
                      <EyeOff
                        onMouseEnter={() => setEyeVisible(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordVisible(!passwordVisible);
                        }}
                        className="dark:text-white"
                      ></EyeOff>
                    ) : (
                      <EyeIcon
                        onMouseEnter={() => setEyeVisible(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordVisible(!passwordVisible);
                        }}
                        className="dark:text-white"
                      ></EyeIcon>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="absolute w-6 h-6 pass-check"
                  style={{
                    color:
                      valPassword != null
                        ? valPassword
                          ? "var(--good)"
                          : "var(--wrong)"
                        : "transparent",
                  }}
                >
                  {valPassword != null ? (
                    valPassword ? (
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
                <label htmlFor="password2" className="sr-only">
                  {LANGUAGE.REGISTER.REPEAT_PASS[preferences.language]}
                </label>
                <label
                  htmlFor="username"
                  className="text-md text-gray-500 dark:text-gray-300"
                >
                  {LANGUAGE.REGISTER.REPEAT_PASS[preferences.language]}
                </label>
                <input
                  id="password2"
                  name="password2"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    validatePassword(e.target.value, password);
                  }}
                  onMouseEnter={() => setEyeVisible(true)}
                  onMouseLeave={() => setEyeVisible(false)}
                  className="appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border autofill:bg-gray-900 dark:bg-gray-900 dark:border-gray-500 dark:text-white border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                <div className="absolute w-6 h-6 eye">
                  {eyeVisible ? (
                    passwordVisible ? (
                      <EyeOff
                        onMouseEnter={() => setEyeVisible(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordVisible(!passwordVisible);
                        }}
                        className="dark:text-white"
                      ></EyeOff>
                    ) : (
                      <EyeIcon
                        onMouseEnter={() => setEyeVisible(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordVisible(!passwordVisible);
                        }}
                        className="dark:text-white"
                      ></EyeIcon>
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
              <div className="flex items-center flex-col justify-start">
                {requestErrors.map((item) => (
                  <p
                    key={"r-" + (idCount += 1)}
                    className="block text-sm w-full"
                    style={{ color: "var(--wrong)" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-md text-gray-900 dark:text-gray-100"
                >
                  {LANGUAGE.REGISTER.REMEMBERME[preferences.language]}
                </label>
              </div>

              <div className="text-md">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {user
                    ? LANGUAGE.REGISTER.ALREADY_ACCOUNT[
                        user.preferences.language
                      ]
                    : LANGUAGE.REGISTER.ALREADY_ACCOUNT.en}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  success ||
                  loadingSubmit ||
                  !valUsername ||
                  !valEmail ||
                  !valPassword
                }
                className={`${
                  (success ||
                    loadingSubmit ||
                    !valUsername ||
                    !valEmail ||
                    !valPassword) &&
                  "cursor-not-allowed"
                } group relative h-12 w-full items-center flex justify-center gap-2 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={(e) => {
                  submitClickHandler({ e });
                }}
              >
                {loadingSubmit ? (
                  <CircleDashed className="loader" />
                ) : (
                  <span>{LANGUAGE.REGISTER.SIGNUP[preferences.language]}</span>
                )}
                {success && <CheckCircle2 className="text-white" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
