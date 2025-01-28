import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <nav className="hidden lg:flex items-center justify-center p-[2.8rem]">
      <ul className="flex items-center justify-center">
        <NavLinks/>
      </ul>
    </nav>
  );
}
