import React from "react";
import { auth, signIn, signOut } from "@/auth";
import ThemeToggle from "@/components/header/ThemeToggle";
import { Button } from "@nextui-org/react";
import { FiLogOut, FiUser } from "react-icons/fi";

export const NavLinks = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex gap-x-1 ml-auto items-center">
      <ThemeToggle />
      {user ? <LogOutButton /> : <SignInButton />}
    </div>
  );
};
function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button variant="light" type="submit">
        <FiUser />
      </Button>
    </form>
  );
}
function LogOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="ghost" type="submit">
        <FiLogOut />
      </Button>
    </form>
  );
}
