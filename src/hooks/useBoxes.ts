import { useQuery } from "react-query";
import { queryConfig } from "@/helpers/getQueryConfig";
import { getBoxes } from "@/helpers/getBoxes";

export const useBoxes = () => {
  return useQuery("boxes", getBoxes, {
    ...queryConfig,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    staleTime: 10000,
    retry: 3,
    retryDelay: 5000,
  });
};