import React from "react";
import { CircleUserRound } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { links } from "@/utils/links";

const Profile = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center min-w-14 min-h-10 px-3 rounded-full"
          >
            <div className="flex items-center gap-0">
              <CircleUserRound className="w-8 h-8" />
              <ChevronDown className="w-5 h-5 -mr-1" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Yim</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {links.map((item, index) => {
            return (
              <DropdownMenuItem key={index}>
                <a href={item.href}>{item.label}</a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
