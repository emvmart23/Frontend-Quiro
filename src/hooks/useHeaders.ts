import { useQuery } from "react-query";
import { getHeaders } from "@/helpers/getHeaders";
import { queryConfig } from "@/helpers/getQueryConfig";

export const useHeaders = () => {
  return useQuery("headers", getHeaders, {
    ...queryConfig,
    refetchInterval: 26100,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    staleTime: 10000,
    retry: 3,
    retryDelay: 5000,
  });
};