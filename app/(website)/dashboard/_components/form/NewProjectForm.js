"use client"
import React, {useState} from "react"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Input} from "@nextui-org/react";
import {createProject} from "@/lib/actions/project/create-project";
import toast from "react-hot-toast";
import ColorPicker from "@/app/(website)/dashboard/_components/form/ColorPicker";

const schema = yup.object().shape({
    name: yup.string().required("Project Name Required"),
    description: yup.string().required("Project Description Required"),
});
const NewProjectForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState("")
    const [priority, setPriority] = useState("")
    const onSelectColor = (color) => {
        setSelectedColor(color)
    }
    const handlePriority = (value) => {
        setPriority(value)
    }
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await createProject({...data, color: selectedColor, priority})
            toast.success("Project Created Successfully")
            router.push("/dashboard")
        } catch (err) {
            toast.error("Failed to create project")
        } finally {
            setLoading(false)
            reset()
        }
    };
    return (
        <section className="pt-6">
            <div>
                <form className="max-w-screen-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <span>What is the name of your project?</span>
                    <Input placeholder="Project Name" className="pt-2" {...register("name")}
                    />
                    {errors.name && <span className="text-red-500 text-xs pt-1">{errors.name.message}</span>}
                    <div className="pt-8">
                        <span className="mb-4">Select a color to organize your Project!</span>
                        <div className="slate-100 p-2 shadow-sm border rounded-lg">
                            <ColorPicker onSelectColor={onSelectColor}/>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default NewProjectForm;
