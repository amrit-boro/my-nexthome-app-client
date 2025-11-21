import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/userApi";

export const useGetUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return {
    data,
    isLoggedIn: !!data,
    isLoading,
    error,
  };
};
