import { Fragment, useState } from "react";
import { BackLinkConfig, PageAction } from "../AuthenticatedPage";
import MobileMenu from "../../MobileMenu/MobileMenu";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import navLinks from "@/constants/navLinks";
import NavLink from "@/components/NavLink/NavLink";
import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftIcon, CogIcon, MenuIcon } from "@heroicons/react/outline";
import { UserButton } from "@clerk/nextjs";

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
            <Link href="/" className="relative">
              <Logo variant="default" />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="mx-auto hidden gap-[clamp(1rem,_10vw_-_5.5rem,_3rem)] lg:flex">
            {navLinks.map((link) => (
              <NavLink
                href={link.path}
                key={link.path}
                className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                activeclassname="bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-500 text-lg"
              >
                {link.linkName}
              </NavLink>
            ))}
          </div>

          <UserButton afterSignOutUrl="/" />

          {/* Logout / Mobile Menu Button */}
          <div className="flex justify-end gap-4 sm:flex-1">
            {/* Desktop Logout Button */}
            <Menu as="div" className="relative ml-3 hidden lg:block">
              <div>
                <Menu.Button className="flex h-10 w-10 max-w-xs items-center justify-center rounded-full bg-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <CogIcon className="h-6 w-6 text-gray-400" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="ring-black absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/api/auth/logout"
                        className={
                          "block w-full rounded-md border-2 border-white px-4 py-1 hover:bg-gray-100"
                        }
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

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
    <Link
      href={href}
      className="flex items-center rounded bg-red-500 px-6 py-2 text-lg text-white drop-shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
    >
      <Icon className="mr-1 inline h-5 w-5" />
      {text}
    </Link>
  );
}
