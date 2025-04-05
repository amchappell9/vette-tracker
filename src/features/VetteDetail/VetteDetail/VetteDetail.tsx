import Alert from "@/src/components/Alert/Alert";
import VetteDetailCard from "../VetteDetailCard/VetteDetailCard";
import { VetteObject } from "@/src/types";

const VetteDetail = ({
  vette,
  successMessage,
}: {
  vette: VetteObject;
  successMessage?: "updated" | "added";
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Show alert if vette was updated */}
      {successMessage && (
        <Alert alertType={"success"}>
          {successMessage === "added"
            ? "Your Vette was successfully added!"
            : "Your Vette was successfully updated!"}
        </Alert>
      )}
      <VetteDetailCard vetteData={vette} />
    </div>
  );
};

export default VetteDetail;
