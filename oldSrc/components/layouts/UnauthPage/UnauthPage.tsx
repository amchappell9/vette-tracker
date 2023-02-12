import { ReactNode } from "react";
import { Link } from "react-router-dom";

import Footer from "../../Footer";
import Logo from "../../Logo/Logo";

type UnauthPageProps = {
  children: ReactNode;
};

const UnauthPage = ({ children }: UnauthPageProps) => {
  return (
    <div className="flex min-h-full flex-col">
      <header>
        <div className="mx-auto max-w-full py-6 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between px-4 sm:px-0">
            {/* Logo */}
            <Link to="/">
              <Logo variant="inverted" className="h-8 sm:h-10" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto h-full max-w-7xl px-6 py-12 lg:px-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UnauthPage;
