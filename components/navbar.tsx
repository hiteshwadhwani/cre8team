"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { Divide, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
// import { UserContext } from "@/hooks/userUser";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/use-modal";
import { useUser } from "@/hooks/use-user";

const Navbar = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const userData = useUser();
  const { setOpen, isOpen, type } = useModal();
  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };
  //   const userData = useContext(UserContext);
  const path = usePathname();
  const onClickDashboard = () => {
    if (userData?.user) {
      router.push("dashboard");
    } else {
      if (!(isOpen && type == "auth-modal")) {
        setOpen("auth-modal");
      }
    }
  };
  // console.log({
  //   profile: userData?.profile,
  //   user: userData?.user,
  //   session: userData?.session,
  // });
  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] px-6 py-4 transition-all">
      <div className="flex flex-row items-center gap-x-10">
        <Image
          onClick={() => router.push("/projects")}
          src={"/logo.svg"}
          alt="logo"
          width={150}
          height={40}
          className="cursor-pointer"
        />
        <div className="hidden md:flex flex-row items-center border border-slate-200 rounded-xl bg-[rgba(250, 250, 250, 0.50)] text-muted-foreground px-2 gap-x-1 flex-1">
          <Search className="h-4 w-4" />
          <Input
            className="focus:outline-none bg-none active:outline-none border-none p-0 w-full"
            placeholder="search"
            disabled={path === "/about"}
          />
        </div>
        <Link
          className={cn(
            path === "/projects" && "text-[#0671E0]",
            "hidden md:block text-[20px] font-medium hover:opacity-80 transition"
          )}
          href="/projects"
        >
          Projects
        </Link>
        <p
          className={cn(
            path === "/dashboard" && "text-[#0671E0]",
            " hidden md:block text-[20px]  font-medium cursor-pointer hover:opacity-80 transition"
          )}
          onClick={onClickDashboard}
        >
          Dashboard
        </p>
        <Link
          className={cn(
            path === "/about" && "text-[#0671E0]",
            " hidden md:block text-[20px]  font-medium hover:opacity-80 transition"
          )}
          href="/about"
        >
          About
        </Link>
        {userData?.profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="z-10 ml-auto" asChild>
              <div className="rounded-full w-[50px] h-[50px] hover:cursor-pointer relative">
                <Image
                  src={userData.profile?.imageUrl || "/public/user.png"}
                  alt="avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="space-y-2 p-2">
              <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen('profile-modal')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem className="md:hidden cursor-pointer">
                <Link href={"/projects"}>Project</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden cursor-pointer">
                <Link href={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden cursor-pointer">
                <Link href={"/about"}>About</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem
                onClick={() => SignOut()}
                className="cursor-pointer"
              >
                <p className="text-rose-600">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <Button
              onClick={() => setOpen("auth-modal")}
              className="bg-[#0671E0] text-white ml-auto"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
