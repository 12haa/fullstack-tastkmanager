"use server";
import { auth } from "@/auth";

const UpdateProjectPage = async (projectId, eventData) => {
  const session = await auth();
  const { user, email } = session;
  if (!user) {
    throw new Error("User not logged in");
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!existingUser) {
      throw new Error("User not found");
    }
    const { name, color, notes, priority } = eventData;
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: name,
        color: color,
        notes: notes,
        priority: priority,
        createdBy: { connect: { email: user.email } },
      },
    });
    return updatedProject;
  } catch (error) {
    console.log(error);
    throw new Error("Could not update project" + error.message);
  }
};
export default UpdateProjectPage;
