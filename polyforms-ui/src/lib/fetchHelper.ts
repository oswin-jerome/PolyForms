import { authOptions } from "@/actions/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const fetchHelper = async (url: string, options: RequestInit) => {
  const session = await getServerSession(authOptions);

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: "Bearer " + (session?.auth_token ?? ""),
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status == 401) {
    console.error(await response.json());
    // logout();
    redirect("/logout");
  }

  if (response.status == 500) {
    // TODO: fix this
    const err = await response.json();
    console.error(err);
    var s = "sds";
    if (err.trace.includes("io.jsonwebtoken.ExpiredJwtException")) {
      redirect("/logout");
    }
    redirect("/error");
  }

  return response;
};
