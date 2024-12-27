"use client";
import { createForm } from "@/actions/forms";
import logo from "@/assets/logo.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon, PlusSquare } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
export default function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return <div>Please wait....</div>;
  }

  if (session.status === "unauthenticated") {
    router.replace("/login");
    return;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b sticky w-full top-0 left-0 right-0">
        {/* Logo */}
        <Link href={"/app"} className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} className="mr-2" />
          <span className="text-xl font-bold text-primary">PolyForms</span>
        </Link>

        {/* Right Side Items */}
        <div className="flex items-center space-x-4">
          {/* Create Form Button */}
          <Button
            variant="ghost"
            onClick={async () => {
              const form = (await createForm()).data;
              router.push("/forms/" + form.id);
            }}
          >
            <PlusSquare className="mr-2 h-4 w-4 " />
            Create Form
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              signOut({
                callbackUrl: "/",
                redirect: true,
              });
            }}
          >
            <LogOutIcon className="mr-2 h-4 w-4 " />
          </Button>

          {/* Profile Image */}
          <Avatar className="bg-primary p-1">
            <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/png?seed=Oswin" alt="@shadcn" />
          </Avatar>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow bg-slate-300 ">{children}</main>

      {/* Bottom Bar */}
      <footer className="py-2 bg-white border-t text-center fixed bottom-0 left-0 right-0">
        <p className="text-sm text-muted-foreground">&copy; 2024 PolyForms. Developed by Ghost.</p>
      </footer>
    </div>
  );
}
