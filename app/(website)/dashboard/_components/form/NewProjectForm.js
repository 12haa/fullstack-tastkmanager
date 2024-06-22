"use client"
import React, {useState} from "react"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Button, Input, Textarea} from "@nextui-org/react";
import {createProject} from "@/lib/actions/project/create-project";
import toast from "react-hot-toast";
import ColorPicker from "@/app/(website)/dashboard/_components/form/ColorPicker";

const schema = yup.object().shape({
    name: yup.string().required("Project Name Required"),
});
const NewProjectForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(" ")
    const [priority, setPriority] = useState(" ")
    const onSelectColor = (color) => {
        setSelectedColor(color)
    }
    const handlePriority = (value) => {
        setPriority(value)
    }
    console.log(priority, "IM Priority")
    const onSubmit = async (data) => {
        console.log(data, "IM Data")
        setLoading(true)
        try {
            console.log(data, "IM Data")
            await createProject({...data, color: selectedColor, priority})
            console.log(data, "IM Data 2")
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
                <form className="max-w-screen-md mx-auto " onSubmit={handleSubmit(onSubmit)}>
                    <span>What is the name of your project?</span>
                    <Input placeholder="Project Name" className="pt-2" {...register("name")}
                    />
                    {errors.name && <span className="text-red-500 text-xs pt-1">{errors.name.message}</span>}
                    <div className="pt-8">
                        <span className="mb-4">Select a color to organize your Project!</span>
                        <div className="slate-100 p-2 shadow-sm border rounded-lg">
                            <ColorPicker onSelectColor={onSelectColor}/>
                        </div>
                        <div className="pt-8 pb-8">
                            <span>Select The Project Priority</span>
                            <div className="flex items-center space-x-4 pt-2">
                                <Button className="w-full " ghost color="primary"
                                        onClick={() => handlePriority("Low")}>
                                    Low
                                </Button>
                                <Button className="w-full " ghost color="success"
                                        onClick={() => handlePriority("Medium")}>
                                    Medium
                                </Button>
                                <Button className="w-full " ghost color="warning"
                                        onClick={() => handlePriority("High")}>
                                    High
                                </Button>
                            </div>
                        </div>
                        <div className="pt-8 pb-8">
                            <span className="mb-4">Add Project Notes</span>
                            <Textarea placeholder="Add Notes" {...register("notes")}/>
                        </div>
                        <Button type="submit" className="mt-2 p-6 w-full " loading={loading}>
                            {loading ? "Creating Project..." : "Create Project"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>)
}
export default NewProjectForm;
