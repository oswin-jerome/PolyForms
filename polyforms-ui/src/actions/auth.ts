"use server";

import { APIResponse } from "@/type";

export const authenticateGithub = async (access_token: string) => {
  const response = await fetch(process.env.API_URL + "/auth/github", {
    body: JSON.stringify({ access_token }),
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
  });

  if (response.ok) {
    const data: APIResponse<string> = await response.json();
    return data;
  }

  return null;
};
