import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router";

const navLinks = [
  {
    title: "Profile",
    url: "#",
  },
];

const UserNavigationMenu = ({ user }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger style={{ color: "white", backgroundColor: "hsl(var(--primary))" }} className="capitalize w-[90vw] md:w-[auto] md:px-5">
            &#128274; {user?.username}
          </NavigationMenuTrigger>
          <NavigationMenuContent style={{ backgroundColor: "hsl(var(--primary))" }} className="w-[90vw] md:w-[auto] md:px-5">
            <ul className="flex flex-col w-[100%] gap-3 xs:gap-1 py-3 px-3 text-white">
              {navLinks.map((link) => (
                <Link to={link.url} className="capitalize italic font-medium">
                  {link.title}
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserNavigationMenu;
