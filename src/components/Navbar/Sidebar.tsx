import NavLinks from "./NavLinks";

interface Props {
  open: number | undefined;
  setOpen : (value: undefined | number) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded, open, setOpen }: Props) {
  return (
    <nav className="mt-6">
        <ul>
          <NavLinks isExpanded={isExpanded} setIsExpanded={setIsExpanded} open={open} setOpen={setOpen} />
        </ul>
    </nav>
  );
}
