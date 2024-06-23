import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProjectNameForm from "@/app/(website)/dashboard/_components/update-project-name";

const ProjectPage = async ({ params }) => {
  const postId = params.id;
  const session = await auth();
  const { user, email } = session;
  const project = await prisma.project.findUnique({
    where: {
      id: postId,
    },
    include: {
      task: true,
    },
  });
  if (!project) return redirect("/dashboard");
  return (
    <section className="pt-12 px-4 space-y-4 ">
      <div>
        <div className="flex justify-between items-center">
          <ProjectNameForm project={project} />
        </div>
      </div>
    </section>
  );
};
export default ProjectPage;
