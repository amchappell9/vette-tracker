import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";
import { VetteObject } from "../../../types/types";

export const getVette = ({
  vetteId,
}: {
  vetteId: string;
}): Promise<VetteObject> => {
  return axios.get(`/vettes/${vetteId}`);
};

export const useVette = ({ vetteId }: { vetteId: string }) => {
  return useQuery({
    queryKey: ["vette", vetteId],
    queryFn: () => getVette({ vetteId }),
  });
};
