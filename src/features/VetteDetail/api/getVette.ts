import { axios } from "@/src/lib/axios";
import { VetteObject } from "@/src/types";
import { queryOptions, skipToken, useQuery } from "@tanstack/react-query";

export const getVette = ({
  vetteId,
}: {
  vetteId: string;
}): Promise<VetteObject> => {
  return axios.get(`/vettes/${vetteId}`);
};

type UseVetteProps = { vetteId: string | string[] | undefined };

export function getVetteQueryOptions({ vetteId }: UseVetteProps) {
  return queryOptions({
    queryKey: ["vette", vetteId],
    queryFn:
      typeof vetteId === "string" ? () => getVette({ vetteId }) : skipToken,
    staleTime: 5 * 60 * 1000,
    retryDelay: 1000,
  });
}

export const useVette = (props: UseVetteProps) => {
  return useQuery(getVetteQueryOptions(props));
};
