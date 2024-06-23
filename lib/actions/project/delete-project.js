"use server";
import { console } from "next/dist/compiled/@edge-runtime/primitives";

const DeleteProject = async (id) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: id,
      },
    });
    console.log("Project Delete " + deletedProject);
    return deletedProject;
  } catch (err) {
    console.log(err);
    throw new Error("Could not delete project" + err.message);
  }
};
export default DeleteProject;
