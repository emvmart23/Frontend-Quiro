import { ArrowRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { links } from "./links";

interface Props {
  open: number | undefined;
  setOpen: (value: undefined | number) => void;
  setIsExpanded: (value: boolean) => void;
  isExpanded?: boolean;
}

export default function SidebarItems({ isExpanded, open, setOpen }: Props) {
  const location = useLocation();

  const toggle = (id: number) => {
    setOpen(open === id ? undefined : id);
  };

  return (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.path;

        return link.childrens && link.childrens.length > 0 ? (
          <div
            key={link.id}
            className={`${open === link.id ? "h-auto" : "h-[3.8rem]"} ${
              isExpanded ? "visible" : "invisible"
            } lg:visible ml-4 block rounded-md overflow-hidden px-2 pt-7`}
          >
            <div
              onClick={() => toggle(link.id)}
              className="flex gap-x-3 items-center hover:scale-105 cursor-pointer "
            >
              <span className="flex justify-start gap-5">
                {link.icon && <i>{link.icon}</i>}
                <span className="text-[0.9rem] ">{link.title}</span>
              </span>
              <ArrowRight
                size={15}
                className={`${
                  open === link.id ? "rotate-90" : ""
                } transition-all`}
              />
            </div>
            <div
              className={`${
                open === link.id
                  ? "h-auto block text-[0.8rem] leading-loose"
                  : "h-0 hidden"
              } font-normal `}
            >
              {link.childrens.map((child, index) => {
                const isActiveSubMenu = location.pathname === child.path;

                return (
                  <NavLink
                    key={index}
                    className="flex w-[11.4rem] ml-4 h-[3.4rem] hover:scale-105 "
                    to={child.path || ""}
                  >
                    <div
                      className={`${
                        isActiveSubMenu
                          ? "bg-foreground dark:text-black text-white"
                          : ""
                      } p-2 w-full text-[0.7rem] group-hover:bg-primary group-hover:text-background text-foreground text-start rounded mt-5 flex items-center gap-5`}
                    >
                      {child.icon && <i>{child.icon}</i>}
                      {child.title}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ) : (
          <NavLink
            key={link.id}
            onClick={() => setOpen(undefined)}
            className={`${
              isExpanded
                ? "visible translate-x-0 opacity-100"
                : "invisible opacity-0"
            } lg:visible lg:translate-x-0 lg:opacity-100 flex w-[11.4rem] ml-4 h-[3.8rem] hover:scale-105`}
            to={link.path || ""}
          >
            <div
              className={`${
                isActive ? " bg-foreground dark:text-black text-white" : ""
              } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground text-sm rounded transition-all duration-75 origin-left mt-4 flex items-center gap-5`}
            >
              {link.icon && <i>{link.icon}</i>}
              {link.title}
            </div>
          </NavLink>
        );
      })}
    </>
  );
}
