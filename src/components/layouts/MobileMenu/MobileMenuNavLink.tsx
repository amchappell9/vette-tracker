import { cva } from "class-variance-authority";
import Link from "next/link";
import { useRouter } from "next/router";

const linkClasses = cva(
  "-ml-3 w-full inline-block rounded-md py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-offset-1 focus:ring-offset-white",
  {
    variants: {
      intent: {
        active:
          "bg-red-500 text-white -mx-3 px-3 py-2 rounded-md font-medium hover:bg-red-500",
        inactive: "text-gray-50",
      },
    },
    defaultVariants: {
      intent: "inactive",
    },
  }
);

type MobileMenuNavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const MobileMenuNavLink = ({ href, children }: MobileMenuNavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={linkClasses({ intent: isActive ? "active" : "inactive" })}
    >
      {children}
    </Link>
  );
};

export default MobileMenuNavLink;
