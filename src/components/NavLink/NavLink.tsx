import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const linkAliases: Record<string, string[]> = {
  "/vettes": ["/add-vette"],
};

/**
 * Check if link is active. Uses the root of the page URL against a list of aliases.
 *
 * For example, if the link is /vettes the following routes will cause the link to show as active:
 * - /vettes
 * - /vettes/1234
 * - /add-vette
 */
function linkIsActive(linkHref: string, currentHref: string) {
  const linkRoot = "/" + currentHref.split("/")[1];

  if (linkAliases[linkHref]) {
    return linkHref === linkRoot || linkAliases[linkHref].includes(linkRoot);
  }

  return linkHref === linkRoot;
}

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
  const isActive = linkIsActive(href, router.pathname);

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
