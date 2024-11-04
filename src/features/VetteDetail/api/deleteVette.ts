import { VettesResponse } from "@/src/features/AllVettes/api/getAllVettes";
import { axios } from "@/src/lib/axios";
import { VetteObject } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * The object that will be return from the server upon successful deletion
 */
type SuccessfulResponseObject = {
  msg: string;
};

export const deleteVette = (
  vetteInfo: VetteObject
): Promise<SuccessfulResponseObject> => {
  const url = `/vettes/${vetteInfo.id}`;

  return axios.delete(url, {
    data: vetteInfo,
  });
};

export const useDeleteVette = () => {
  const queryClient = useQueryClient();

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

      // Remove vette from vette cache
      queryClient.removeQueries({ queryKey: ["vette", vetteInfo.id] });
    },
    mutationFn: deleteVette,
  });
};
