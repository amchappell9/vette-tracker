import { VettesResponse } from "@/features/AllVettes/api/getAllVettes";
import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { VetteObject } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * The object that will be return from the server upon successful deletion
 */
type SuccessfulResponseObject = {
  msg: string;
};

export const deleteVette = (
  vetteInfo: VetteObject
): Promise<SuccessfulResponseObject> => {
  return axios.delete("/vettes", {
    data: vetteInfo,
  });
};

export const useDeleteVette = () => {
  return useMutation({
    onSuccess: (data, vetteInfo, context) => {
      // Remove vette from all vettes cache
      const previousVettes = queryClient.getQueryData<VettesResponse>([
        "vettes",
      ]);
      const updatedVettes = previousVettes?.vettes.filter(
        (vette) => vette.id !== vetteInfo.id
      );

      queryClient.setQueryData(["vettes"], {
        vettes: updatedVettes,
      });

      // If you invalidate the query here it causes the detail card to start refetching,
      // which causes a 404 error. Only invalidate once you're navigated away
      // queryClient.invalidateQueries(["vette", vetteInfo.id]);
    },
    mutationFn: deleteVette,
  });
};
