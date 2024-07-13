import { axios } from "@/src/lib/axios";
import { VetteObject } from "@/src/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getVette = ({
  vetteId,
}: {
  vetteId: string | string[] | undefined;
}): Promise<VetteObject> => {
  if (typeof vetteId === "undefined" || Array.isArray(vetteId)) {
    return Promise.reject(new Error("Vette ID is invalid"));
  }

  return axios.get(`/vettes/${vetteId}`);
};

type UseVetteProps = {
  vetteId: string | string[] | undefined;
  enabled: boolean;
};

export function getVetteQueryOptions({ vetteId, enabled }: UseVetteProps) {
  return queryOptions({
    queryKey: ["vette", vetteId],
    queryFn: () => getVette({ vetteId }),
    staleTime: 5 * 60 * 1000,
    retryDelay: 1000,
    enabled: enabled,
  });
}

export const useVette = (props: UseVetteProps) => {
  return useQuery(getVetteQueryOptions(props));
};
