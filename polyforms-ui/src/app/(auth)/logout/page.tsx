"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  }, []);

  return <div>Please wait... logging out.</div>;
};

export default LogoutPage;
