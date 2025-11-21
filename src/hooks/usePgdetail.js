import { useQuery } from "@tanstack/react-query";
import { getPgDetail } from "../services/apiPGs";

export const usePgdetail = () => {
  const { data: pgdetail, isLoading } = useQuery({
    queryKey: ["pgdetail"],
    queryFn: getPgDetail,
  });
  return {
    pgdetail,
    isLoading,
  };
};
