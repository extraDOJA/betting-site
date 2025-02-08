import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

const navLinks = [
  {
    title: "Profile",
    url: "#",
  },
];

const UserNavigationMenu = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-semibold h-9 px-4 py-2 text-sm capitalize rounded-md text-white w-[90vw] md:w-[auto] md:px-5" style={{ backgroundColor: "hsl(var(--primary))" }}>
        &#128274; {user?.username}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[90vw] md:w-[auto]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navLinks.map((link) => (
          <Link to={link.url} className="capitalize">
            <DropdownMenuItem className="cursor-pointer">{link.title}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigationMenu;
