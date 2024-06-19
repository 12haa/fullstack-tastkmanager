"use client";
import React from "react";
import { FiHome, FiPlus } from "react-icons/fi";
import { usePathname } from "next/navigation";

const siteLinks = [
  {
    icon: <FiHome />,
    label: "Home",
    href: "/dashboard",
  },

  {
    icon: <FiPlus />,
    label: "New",
    href: "/dashboard/new",
  },
];

const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full">
      {siteLinks.map((route) => (
        // <SidebarItem
        //   icon={route.icon}
        //   key={route.href}
        //   label={route.label}
        //   href={route.href}
        // />
      ))}
    </div>
  );
};

export default SidebarLinks;
