import { NavLink, useLocation } from "react-router-dom";
import { links } from "./links";

// interface Props {
//   setIsExpanded: (value: boolean) => void;
//   isExpanded?: boolean;
// }

export default function SidebarItems() {
  const location = useLocation();

  return links.map((link) => {
    const isActive = location.pathname === link.path;
    return (
      <NavLink
        key={link.id}
        // className={`${
        //   isExpanded
        //     ? "visible translate-x-0 opacity-100"
        //     : "invisible opacity-0"
        // } lg:visible lg:translate-x-0 lg:opacity-100 flex w-[11.4rem] ml-4 h-[3.8rem] hover:scale-105`}
        className="lg:visible lg:translate-x-0 lg:opacity-100 flex w-[11.4rem] ml-4 h-[3.8rem] hover:scale-105"
        to={link.path || ""}
      >
        <div
          className={`${
            isActive ? " bg-foreground dark:text-black text-white" : ""
          } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground text-sm rounded transition-all duration-75 origin-left mt-4 flex items-center gap-5`}
        >
          {link.title}
        </div>
      </NavLink>
    );
  });
}
