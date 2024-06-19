import React from "react";
import Logo from "@/components/logo";
import SidebarLinks from "@/components/sidebar/SidebarLinks";

const Sidebar = () => {
  return (
    <aside className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarLinks />
      </div>
    </aside>
  );
};
export default Sidebar;
