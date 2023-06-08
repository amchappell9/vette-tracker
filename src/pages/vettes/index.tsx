import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import AllVettes from "@/src/features/AllVettes";
import { VetteObject } from "@/src/types";
import { getAllVettesById } from "@/src/utils/dbHelpers";
import { getAuth } from "@clerk/nextjs/server";
import { PlusIcon } from "@heroicons/react/outline";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
  vettes: VetteObject[];
}> = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (userId === null) {
    return {
      redirect: {
        destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }

  const vettes = await getAllVettesById(userId);

  return {
    props: {
      vettes,
    },
  };
};

export default function AllVettesPage({
  vettes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AuthenticatedPage
      title="All Vettes"
      pageAction={{ text: "Add Vette", href: "/add-vette", icon: PlusIcon }}
    >
      <AllVettes vettes={vettes} />
    </AuthenticatedPage>
  );
}
