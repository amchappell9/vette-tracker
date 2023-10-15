import { useRouter } from "next/router";
import Alert from "@/src/components/Alert";
import VetteDetailCard from "../VetteDetailCard";
import { VetteObject } from "@/src/types";

const VetteDetail = ({ vette }: { vette: VetteObject }) => {
  const router = useRouter();
  const { isConfirmationView, isUpdate } = router.query;

  return (
    <>
      {isConfirmationView && isUpdate === "false" && (
        <Alert alertType={"success"} className="mb-8">
          Your Vette has been added!
        </Alert>
      )}

      {isConfirmationView && isUpdate === "true" && (
        <Alert alertType={"success"} className="mb-8">
          Your Vette has been updated!
        </Alert>
      )}

      <VetteDetailCard vetteData={vette} wasUpdated={false} />
    </>
  );
};

export default VetteDetail;
