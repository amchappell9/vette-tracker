import AuthenticatedPage from "@/src/components/layouts/AuthenticatedPage/AuthenticatedPage";
import AllVettes from "@/src/features/AllVettes/AllVettes";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AllVettesPage() {
  return (
    <AuthenticatedPage
      title="All Vettes"
      pageAction={{ text: "Add Vette", href: "/add-vette", icon: PlusIcon }}
    >
      <AllVettes />
    </AuthenticatedPage>
  );
}
