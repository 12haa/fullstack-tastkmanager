import React from "react";
import MobileNav from "@/components/header/MobileNav";
import { NavLinks } from "@/components/header/NavLinks";

const Header = () => {
  return (
    <header className="">
      <div className="p-4 border-b border-primary/30 flex h-full items-center shadow-sm ">
        <MobileNav />
        <NavLinks />
      </div>
    </header>
  );
};
export default Header;
