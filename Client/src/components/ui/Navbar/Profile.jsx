"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CircleUserRound, ChevronDown, LogOut } from "lucide-react";
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
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // หรือล้าง session ตามที่ใช้
    router.push("/login"); // กลับไปหน้า Login
  };

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
          <DropdownMenuLabel>User</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {links.map((item, index) => (
            <DropdownMenuItem key={index}>
              <a href={item.href}>{item.label}</a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
