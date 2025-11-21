import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useLogin } from "../../../hooks/useLogin";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { login, isLoading } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = ({ email, password }) => {
    login({ email, password }, { onSettled: reset });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 overflow-hidden">
      <div className="flex grow items-center justify-center py-8 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-4xl bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch min-h-[70vh]">
            {/* Left: image (hidden on small) */}
            <div
              className="hidden md:block rounded-lg bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTZTV502vpQtGH0pA4gBbNpH8mCHtOoQtArzaF98fjQ_eWPRwP5lyjxhQmSrTO0YvrbrahhUd9Ge9g7MN3d63K8BbCr_bHTqPbPoZsaIbaK7e7Wupu5lRRfIU7mAAM9vlojbF_cEGO4V9wOAt0ws7RuzZj6D8O8OEQwK587OnI1oTEPQylfa05synUIr_MlCj1qoij6bjE9fYVolF6NiQGf7cNgDAX_HKFnL28Nvvem5xTfw-zwSHEBMz1n24rO4NgmeGtJRqx85AQ")',
              }}
            />

            {/* Right: form */}
            <div className="w-full bg-white rounded-lg p-6 sm:p-8 shadow-md flex items-center overflow-hidden">
              <div className="w-full max-w-md mx-auto">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <span className="text-lg sm:text-xl font-bold text-slate-800">
                    PG Finder
                  </span>
                </div>

                {/* Headings */}
                <div className="mb-4">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    Welcome Back!
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 mt-1">
                    Log in to your account
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  {/* Email */}
                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800 mb-2">
                      Email or Username
                    </span>
                    <input
                      {...register("email", { required: "Email is required" })}
                      disabled={isLoading}
                      placeholder="Enter your email or username"
                      className="h-11 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                  {/* Password */}
                  <label className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-800">
                        Password
                      </span>
                      <button
                        type="button"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>

                    <div className="flex items-center h-11 rounded-lg border border-slate-300 overflow-hidden">
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
                        disabled={isLoading}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="flex-1 px-3 text-sm bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="px-3 h-full flex items-center justify-center text-slate-600 hover:bg-slate-50"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242"
                            />
                          )}
                        </svg>
                      </button>
                    </div>

                    {errors.password && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                  {/* Remember */}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  {/* Divider */}
                  <div className="flex items-center text-sm text-slate-400 my-2">
                    <div className="flex-1 h-px bg-slate-200" />
                    <div className="px-3">OR</div>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>
                  {/* Social */}
                  {/* <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="w-full h-11 rounded-lg border border-slate-300 bg-white text-sm flex items-center justify-center gap-3"
                    >
                      <img
                        alt="Google"
                        className="w-4 h-4"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJrnUVEdHaPNFvQS_lXx4KnZqfK2Ftyi5irswAq3Xt5YD6lOapUptz1TCh8xArSIJn4q-jmXNTWgC1PwXM-FvIr41WWjSXOD4n-ZOctmdp2Er8Vx92yhpIt2bg-SftFwIXSJGApHQ7lCx_-Jw4nxbdofGJKKys5OAZcyjgPhee3WGUx17eE946b5FI7zc7opN2QK5kMZ3vWLNENGM21XFbeOy4jVgkljqtD2HMLPODwfj265A6WAdZHFQfCMj92GJ2ry7nre7tlNYr"
                      />
                      Continue with Google
                    </button>

                    <button
                      type="button"
                      className="w-full h-11 rounded-lg border border-slate-300 bg-white text-sm flex items-center justify-center gap-3"
                    >
                      <img
                        alt="Facebook"
                        className="w-4 h-4"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfTa7oVF9NyEXO1V_kMYDlEs_HLsEYCcvYJOGQTdPXH7b9zPGaIl7kL2dCmEZVGoQWYxXTTDYMYzFR-jom1-DBO74126n4YyZj0-OGHxLLe9d52f92zoteIGVqyBwAsdLwqHem7KACc1Yi18-esjQ9nKY4mVp2aK5CS6p-MkdYy0vCl2AJtCPx-jH2ENCXoT5nJMYgW0QM07mkpcvU3XKU2mkT6rFa-_ba_x0Qutx-b30jb6mZBJOydUW1XYvd19Z3UipKFO_p_w-p"
                      />
                      Continue with Facebook
                    </button>

                    <button
                      type="button"
                      className="w-full h-11 rounded-lg border border-slate-300 bg-white text-sm flex items-center justify-center gap-3"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                      </svg>
                      Continue with Phone Number
                    </button>
                  </div> */}
                  {/* Signup */}
                  <p className="text-center text-sm text-slate-500 mt-3">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
