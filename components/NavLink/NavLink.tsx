import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  className: string;
  activeclassname: string;
};

export default function NavLink(props: NavLinkProps) {
  const router = useRouter();
  const isActive = router.pathname === props.href;

  return (
    <Link
      {...props}
      className={isActive ? props.activeclassname : props.className}
    >
      {props.children}
    </Link>
  );
}
