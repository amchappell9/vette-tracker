import NavLink from "@/components/NavLink/NavLink";
import navLinks from "@/constants/navLinks";

const NavLinks = () => {
  return (
    <div className="mx-auto hidden gap-[clamp(1rem,_10vw_-_5.5rem,_3rem)] lg:flex">
      {navLinks.map((link) => (
        <NavLink href={link.path} key={link.path}>
          {link.linkName}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
