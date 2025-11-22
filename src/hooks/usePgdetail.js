import { useQuery } from "@tanstack/react-query";
import { getdetailById, getPgDetail } from "../services/apiPGs";

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

export const useRoomdetails = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["roomdetail", id],
    queryFn: () => getdetailById(id),
  });
  return { data, isLoading };
};
