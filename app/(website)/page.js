import React from "react";
import { auth, signIn } from "@/auth";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/dashboard");
  return (
    <section>
      {user ? (
        <>Welcome</>
      ) : (
        <>
          <div className="flex flex-col h-screen justify-center items-center">
            <SignInButton />u need to login
          </div>
        </>
      )}
    </section>
  );
};
export default HomePage;

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">SignIn</Button>
    </form>
  );
}
