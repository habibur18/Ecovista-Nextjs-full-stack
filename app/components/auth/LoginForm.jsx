"use client";

import { performLogin } from "@/app/actions";
import { useState } from "react";

import { useAuth } from "@/app/hook/useAuth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      // Logging formData properly
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      // console.log(formData);
      const found = await performLogin(formData);
      if (found.id) {
        setAuth(found);
        router.push("/");
        setError("");
      } else if (found.message) {
        setError(found.message);
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
