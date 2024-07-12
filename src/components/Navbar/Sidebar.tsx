import NavLinks from "./NavLinks";
import { links } from "./links";

interface Props { 
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded, open, setOpen }: Props) {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <NavLinks key={index} index={index} links={link} isExpanded={isExpanded} setIsExpanded={setIsExpanded} open={open} setOpen={setOpen} />
        ))}
      </ul>
    </nav>
  );
}
