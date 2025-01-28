import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";
import { TailwindIndicator } from "../components";
import UserDropDown from "@/components/UserDropDown";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import useBreakpointer from "@/hooks/useBreackpointer";
import Navbar from "@/components/Navbar";
// import OutsideClick from "@/hooks/useDetectClickOut";

export default function AppLayout() {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const width = useBreakpointer();
  // const ref = useRef<HTMLDivElement>(null);
  // const isClicked = OutsideClick(ref, setIsExpanded, isExpanded);

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
        <Navbar />
      </div>
      <div className="transition-all duration-200 mx-auto w-[80%] md:w-[88%] lg:w-[77%] lg:ml-[14rem] md:pl-12 xl:pl-24 max-w-320 pt-10">
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}
