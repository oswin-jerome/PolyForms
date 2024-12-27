"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/");
    return;
  }
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1 items-center">
          <div className="w-20 h-20 mb-4 relative">
            <Image src={logo} alt="Brand logo" layout="fill" objectFit="contain" />
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />
            </div>
            <div className="grid gap-2 mt-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" disabled={isLoading} />
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button
              variant="outline"
              onClick={() => {
                signIn("github").then((res) => {
                  if (res?.ok) {
                    router.push("/");
                  }
                });
              }}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            Forgot password?
          </Button>
          <div className="text-xs text-muted-foreground mt-2">
            Don't have an account?{" "}
            <Button variant="link" className="px-0 text-xs">
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
