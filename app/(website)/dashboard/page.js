import React, { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import ProjectCard from "@/app/(website)/dashboard/_components/project-card/ProjectCard";

const DashboardPage = async () => {
  const data = [];
  return (
    <section className="pt-12 px-4 space-y-4">
      <Suspense fallback={<WelcomeMessageFallback />}>
        <WelcomeMsg />
      </Suspense>
      <ProjectsList />
    </section>
  );
};
export default DashboardPage;

//  returns a JSX element that displays a greeting message with the user's email.
async function WelcomeMsg() {
  const session = await auth();
  const { user, email } = session;
  console.log(user);
  if (!user) redirect("/");
  return (
    <div className="flex w-full ">
      <h2 className="text-2xl font-extrabold ">
        Hi , {user?.name.split(" ")[0].toUpperCase()}
      </h2>
    </div>
  );
}

// used to display a loading state or placeholder content.
function WelcomeMessageFallback() {
  return (
    <div className="flex w-full">
      <h2 className="text-2xl font-extrabold">
        <Skeleton class="w-[180px] h-[36px]" />
        <Skeleton class="w-[150px] h-[36px]" />
      </h2>
    </div>
  );
}

// that retrieves a list of projects created by a user.
async function ProjectsList() {
  const session = await auth();
  const { user, email } = session;
  const projects = await prisma.project.findMany({
    where: {
      createdById: user.email,
    },
    include: {
      task: true,
    },
  });
  if (projects.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pt-24 gap-5">
        No Project Listed
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
