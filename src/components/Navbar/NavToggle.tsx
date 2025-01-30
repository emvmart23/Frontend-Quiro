import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";

import { Button } from "../ui/Button";
import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";

export const NavToggle = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-4 py-4">
            <ul>
              <NavLinks />
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
