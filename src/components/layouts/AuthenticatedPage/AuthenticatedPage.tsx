import React from "react";

import Footer from "@/src/components/Footer";
import Card from "../../Card";
import { CardPaddingVariants } from "../../Card/Card";
import AuthenticatedPageHeader from "./AuthenticatedPageHeader/AuthenticatedPageHeader";
import Head from "next/head";

export type BackLinkConfig = {
  backLinkText: string;
  backLinkHref: string;
};

export type PageAction = {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  text: string;
  href: string;
};

type AuthenticatedPageProps = {
  children: React.ReactNode;
  cardPadding?: CardPaddingVariants;
  title: string;

  /** The properties used to create an action link on the page. */
  pageAction?: PageAction;
  backLinkConfig?: BackLinkConfig;
};

const AuthenticatedPage = ({
  children,
  cardPadding,
  title,
  pageAction,
  backLinkConfig,
}: AuthenticatedPageProps) => {
  return (
    <div className="flex h-full flex-col">
      <Head>
        <title>{title}</title>
      </Head>

      <AuthenticatedPageHeader
        title={title}
        backLinkConfig={backLinkConfig}
        pageAction={pageAction}
      />

      <div className="flex-1 px-4 sm:px-6 md:px-8">
        <main className="mx-auto -mt-32 max-w-7xl pb-8">
          <Card padding={cardPadding}>{children}</Card>
        </main>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedPage;
