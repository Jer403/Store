import {
  CircleDashed,
  LucideCheckCircle,
  LucideCheckCircle2,
  XCircle,
} from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface SubmitClickProps {
  e: MouseEvent;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [valUsername, setValUsername] = useState<boolean | null>(null);
  const [valEmail, setValEmail] = useState<boolean | null>(null);
  const [valpassword, setValpassword] = useState<boolean | null>(null);

  const submitClickHandler = ({ e }: SubmitClickProps) => {
    e.preventDefault();
    e.currentTarget.firstElementChild?.classList.add("md:hidden");
    e.currentTarget.firstElementChild?.nextElementSibling?.setAttribute(
      "style",
      "display: block;"
    );
  };

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

  useEffect(() => {
    console.log(valEmail);
  }, [valEmail]);

  return (
    <div className="min-h-screen-minus-64 bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="username" className="sr-only">
                Username
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
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
                Email address
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value, password2);
                }}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <div
                className="absolute w-6 h-6 pass-check"
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
            <div className="relative">
              <label htmlFor="password2" className="sr-only">
                Repeat password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                required
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  validatePassword(e.target.value, password);
                }}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Repeat password"
              />
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
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                submitClickHandler({ e });
              }}
            >
              <span>Sign in</span>
              <CircleDashed className="loader" style={{ display: "none" }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
