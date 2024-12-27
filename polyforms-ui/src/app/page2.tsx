"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="">
      <h1>Auth</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
