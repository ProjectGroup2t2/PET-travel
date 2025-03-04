"use client";
import React, { useContext } from "react";
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
import { AuthContext } from "@/context/Auth.context"; 

const Profile = () => {
  const router = useRouter();
  const { state, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); 
    window.location.reload(); 
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
          <DropdownMenuLabel>
            {"Hi, " + (state.isLoggedIn ? state.user?.username : "Guest")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {state.isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <button
                  onClick={() => router.push("/register")}
                  className="w-full text-left py-1.5 hover:bg-gray-100"
                >
                  Register
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full text-left py-1.5 hover:bg-gray-100"
                >
                  Login
                </button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;