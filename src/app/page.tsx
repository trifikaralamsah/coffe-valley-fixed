"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage({ searchParams }: any) {
  const searchParamsUrl = searchParams.callbackUrl || "/home";
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   fetch("/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: e.currentTarget.email.value,
  //       password: e.currentTarget.password.value,
  //     }),
  //   });
  // };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: searchParamsUrl,
      });
      if (!res?.error) {
        e.target.reset();
        setIsLoading(false);
        push(searchParamsUrl);
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          setErrorMessage("Username or Password is incorrect!");
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [errorMessage]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full">
        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
          {errorMessage !== "" && (
            <h3 className="text-xs text-center font-small text-gray-900 dark:text-red-400">
              {errorMessage}
            </h3>
          )}
          <div className="flex justify-center items-center">
            <div className="flex-shrink-0 ">
              <Image
                src="/images/logo-coffe.png"
                alt="logo"
                width={90}
                height={80}
              />
            </div>
            <div className="ml-3 justify-center">
              <h2 className="text-2xl font-bold italic text-gray-900 dark:text-white">
                Coffe Valley
              </h2>
              <p className="text-sm text-gray-900 dark:text-white">
                Taste the love in every cup!
              </p>
              <p className="text-white text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full text-white ${
              isLoading ? "opacity-50" : ""
            } bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          {/* <hr />
          <button
            type="button"
            onClick={() =>
              signIn("google", { searchParamsUrl, redirect: false })
            }
            className={`w-full text-white ${
              isLoading ? "opacity-50" : ""
            } bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Login With Google
          </button> */}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Belum Punya Akun?{" "}
            <Link
              href="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Daftar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
