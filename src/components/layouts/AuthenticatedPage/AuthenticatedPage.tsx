import React from "react";
import Card, { CardPaddingVariants } from "../../Card/Card";
import AuthenticatedPageHeader, {
  BackLinkConfig,
  PageAction,
} from "./AuthenticatedPageHeader/AuthenticatedPageHeader";
import Head from "next/head";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Footer from "../../Footer/Footer";

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

      <div className="flex-1 bg-white px-4 sm:px-6 md:px-8">
        <main className="mx-auto -mt-32 max-w-7xl pb-8">
          <Card padding={cardPadding}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Card>
        </main>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedPage;
