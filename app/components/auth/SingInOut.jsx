"use client";

import { useAuth } from "@/app/hook/useAuth";
import Link from "next/link";

export default function SingInOut() {
  const { auth, setAuth } = useAuth();
  return (
    <div>
      {auth ? (
        <div>
          <span className="mx-2">Hello, {auth?.name}</span>
          <span className="mx-1">|</span>
          <a className="cursor-pointer" onClick={() => setAuth(null)}>
            Logout
          </a>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
