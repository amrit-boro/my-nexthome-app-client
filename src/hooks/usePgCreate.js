import { useMutation } from "@tanstack/react-query";
import { createPg as createPgApi } from "../services/apiPGs";
import { useNavigate } from "react-router-dom";

export const usePgcreate = () => {
  const navigate = useNavigate();
  const {
    mutate: createPg,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createPgApi,
    onSuccess: (user) => {
      console.log(user);
      window.alert("successfully created");
      navigate("/landlord");
    },
    onError: (err) => {
      console.log(err);
      window.alert(err);
    },
  });

  return { createPg, isLoading, error };
};
