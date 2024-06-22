import React from "react"
import NewProjectForm from "@/app/(website)/dashboard/_components/form/NewProjectForm";

const NewProjectPage = () => {
    return (
        <section className="pt-12 px-4 space-y-4">
            <h1 className="font-bold">
                <NewProjectForm />
            </h1>
        </section>
    )
}
export default NewProjectPage;
