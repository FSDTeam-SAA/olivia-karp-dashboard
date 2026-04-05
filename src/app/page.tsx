import Login from "@/features/auth/component/Login";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href="/login">
        <Login />
      </Link>
    </div>
  );
}
