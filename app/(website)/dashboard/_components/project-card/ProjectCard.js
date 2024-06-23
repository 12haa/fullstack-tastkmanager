"use client";
import React from "react";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  const linkStyle = {
    padding: "1rem",
    borderLeft: `4px solid ${project.color}`,
    transition: "all 0.3s ease-in-out",
    position: "relative",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  };
  const colorBarStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "6px",
    backgroundColor: project.color,
    transition: "all 0.3s ease-in-out",
  };
  return (
    <Link
      className="border hover:shadow-md hover:bg-amber-100 bg-[#f5f5f5] rounded-sm"
      href={`/dashboard/project/${project.id}`}
      style={linkStyle}
    >
      <div style={colorBarStyle} />
      <div className="flex w-full">
        <div className="flex justify-between items-center w-full">
          <span>{project.name}</span>
          <span className="flex flex-col items-center gap-2">
            {project.task.length}
            <span className="text-xs font-light">Total Task</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
export default ProjectCard;
