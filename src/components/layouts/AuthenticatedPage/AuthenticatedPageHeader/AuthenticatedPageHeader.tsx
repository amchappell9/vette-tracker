import Logo from "@/src/components/Logo/Logo";

import { UserButton, useAuth } from "@clerk/nextjs";
import { ArrowLeftIcon, MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "../../MobileMenu/MobileMenu";
import { BackLinkConfig, PageAction } from "../AuthenticatedPage";
import NavLinks from "./NavLinks";
import Button from "@/src/components/Button/Button";

type HeaderProps = {
  backLinkConfig?: BackLinkConfig;
  title: string;
  pageAction?: PageAction;
};

function AuthenticatedPageHeader({
  backLinkConfig,
  title,
  pageAction,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoaded, userId } = useAuth();

  const userSignedIn = isLoaded && userId;

  return (
    <>
      <MobileMenu
        isOpen={mobileMenuOpen}
        dismiss={() => setMobileMenuOpen(false)}
      />
      <div className="bg-gray-700 px-4 pb-32 sm:px-6 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center border-b border-gray-600 py-4 pt-6">
          {/* Logo */}
          <div className="flex-1">
            <Link href={userSignedIn ? "/vettes" : "/"} className="relative">
              <Logo variant="default" />
            </Link>
          </div>

          {/* Nav Links */}
          <NavLinks />

          {/* Logout / Mobile Menu Button */}
          <div className="flex justify-end gap-4 sm:flex-1">
            <div className="hidden lg:block">
              <UserButton afterSignOutUrl="/" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        <header className="pt-6">
          {/* Back Link */}
          {backLinkConfig ? (
            <div className="mx-auto mb-4 max-w-7xl">
              <Link
                href={backLinkConfig.backLinkHref}
                className="text-gray-300 hover:underline"
              >
                <ArrowLeftIcon className="mr-1 inline h-5 w-5 align-text-bottom" />
                {backLinkConfig.backLinkText}
              </Link>
            </div>
          ) : null}

          <div className="flex max-w-7xl flex-col gap-4 sm:mx-auto sm:flex-row sm:justify-between">
            {/* Title + Page Action Button */}
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            {pageAction ? <PageActionLink {...pageAction} /> : null}
          </div>
        </header>
      </div>
    </>
  );
}

export default AuthenticatedPageHeader;

type PageActionLinkProps = {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  text: string;
  href: string;
};

function PageActionLink({ icon: Icon, text, href }: PageActionLinkProps) {
  return (
    <Button as="link" href={href} className="flex items-center">
      <Icon className="mr-1 inline h-5 w-5" />
      {text}
    </Button>
  );
}
