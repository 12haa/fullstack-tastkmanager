"use server"
import {auth} from "@/auth";

export async function createProject(eventData) {
    const session = await auth();
    const {user, email} = session
    if (!user) {
        throw new Error("User not logged in")
    }
    try {
        const {name, color, notes, priority} = eventData
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })
        if (!existingUser) {
            throw new Error("User not found")
        }
        const newProject = await prisma.project.create({
            data: {
                name,
                color,
                notes,
                priority,
                createdBy: {connect: {email: user.email}}
            }
        })
        return newProject
    } catch (err) {
        console.log(err)
        throw new Error('Failed to create project')
    }
}
