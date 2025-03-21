import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import VetteDetail from "@/src/features/VetteDetail/VetteDetail/VetteDetail";
import { VetteObject } from "@/src/types";
import { getAuth } from "@clerk/nextjs/server";
import { PencilAltIcon } from "@heroicons/react/outline";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async (ctx) => {
  const { userId } = getAuth(ctx.req);
  const { vetteId } = ctx.query;

  // Validate user is logged in
  if (userId === null) {
    return {
      redirect: {
        destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }

  // Validate vetteId is a string
  if (typeof vetteId !== "string") {
    return { notFound: true };
  }

  const res = await fetch(`${process.env.BACKEND_BASE_URL}/vettes/${vetteId}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const vette = (await res.json()) as VetteObject;

  if (!vette) {
    return { notFound: true };
  }

  return { props: { vette } };
}) satisfies GetServerSideProps<{ vette: VetteObject }>;

export default function VetteById({
  vette,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AuthenticatedPage
      title={`${vette.year} Corvette ${vette.submodel}`}
      backLinkConfig={{
        backLinkText: "Back to All Vettes",
        backLinkHref: "/vettes",
      }}
      pageAction={{
        icon: PencilAltIcon,
        text: "Edit Vette",
        href: `/add-vette?vetteToEdit=${vette.id}`,
      }}
    >
      <VetteDetail vette={vette} />
    </AuthenticatedPage>
  );
}
