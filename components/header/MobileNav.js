"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close The Menu" : "Open Menu"}
            className="md:hidden"
          ></NavbarMenuToggle>
          <NavbarMenu>
            <NavbarItem className="pt-6"></NavbarItem>
          </NavbarMenu>
        </NavbarContent>
      </Navbar>
    </>
  );
};
export default MobileNav;
