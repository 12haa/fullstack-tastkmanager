"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import updateProject from "@/lib/actions/project/update-project";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

const schema = yup.object().shape({
  name: yup.string().required("Project name is required"),
});
const UpdateProjectNameForm = ({ project }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.name,
    },
  });
  const onSubmit = async (data) => {
    try {
      await updateProject(project.id, { ...data });
      toast("Project updated successfully");
      setIsEditing(false);
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      toast("Failed to update project");
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const toggleEditing = () => {
    setIsEditing((current) => !current);
    reset({ name: project.name });
  };
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <h1 className="text-xl font-500 flex gap-x-2 items-center">
            {" "}
            <FiArrowLeft className="h-6 w-6" /> Back
          </h1>
        </Link>
        {isEditing ? (
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => <Input {...field} />}
              placeholder="Project name"
              error={errors?.name?.message}
              control={control}
              name="name"
            />
            <Button type="submit" disabled={false}>
              Update
            </Button>
            <Button variant="light" onClick={toggleEditing}>
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <div className="flex items-center">
              {project.name}
              <Button variant="light" onClick={toggleEditing}>
                <FiEdit className="h-5 w-5 text-yellow" />
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
export default UpdateProjectNameForm;
