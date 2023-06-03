import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLinkClasses = cva(
  "relative px-4 py-2 text-lg font-medium transition-colors",
  {
    variants: {
      intent: {
        active: "text-white",
        inactive: "text-gray-300 hover:text-white",
      },
    },
    defaultVariants: {
      intent: "inactive",
    },
  }
);

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname.includes(href);

  return (
    <Link
      href={href}
      className={NavLinkClasses({ intent: isActive ? "active" : "inactive" })}
    >
      {isActive && (
        <motion.div
          layoutId="navLinkBackground"
          className="absolute inset-0 rounded-md bg-red-500"
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default NavLink;
