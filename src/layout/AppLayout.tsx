import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";
import { TailwindIndicator } from "../components";
import Sidebar from "@/components/Navbar/Sidebar";
import UserDropDown from "@/components/UserDropDown";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import useBreakpointer from "@/hooks/useBreackpointer";
import OutsideClick from "@/hooks/useDetectClickOut";

export default function AppLayout() {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState<number | undefined>(undefined);
  const width = useBreakpointer();
  const ref = useRef<HTMLDivElement>(null);
  const isClicked = OutsideClick(ref, setIsExpanded, isExpanded);

  const btnUpdateMenuVisibility = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (width > 1024) {
      setIsExpanded(false);
    }
  }, [width]);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-background sticky top-0 border-b-2 z-50">
        <div className="flex justify-between lg:justify-end items-center h-[4.6rem] px-8 md:px-20 min-w-[320px]">
          <Button
            variant={"outline"}
            onClick={btnUpdateMenuVisibility}
            className="lg:hidden z-50"
          >
            <Menu />
          </Button>
          <div className="flex justify-between items-center gap-2 md:gap-4">
            <span className="font-semibold text-[0.9rem] md:text-[1rem]">
              Bienvenido {user?.user}
            </span>
            <UserDropDown />
          </div>
        </div>
        <div
          ref={ref}
          className={`${
            isClicked ? "w-[16rem]" : "w-[0rem]"
          } lg:w-[15rem] origin-left transition-all duration-100 bg-background h-screen fixed top-0 border-r z-50`}
        >
          <Button
            onClick={btnUpdateMenuVisibility}
            className={`${
              isClicked ? "block" : "hidden"
            } lg:hidden absolute top-1 right-2 p-2 w-7 h-7 flex justify-center`}
            variant={"outline"}
          >
            <X />
          </Button>
          <Sidebar isExpanded={isClicked} setIsExpanded={setIsExpanded} open={open} setOpen={setOpen}/>
        </div>
      </div>
      <div className="transition-all duration-200 mx-auto w-[80%] md:w-[88%] lg:w-[77%] lg:ml-[14rem] md:pl-12 xl:pl-24 max-w-320 pt-10">
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}
