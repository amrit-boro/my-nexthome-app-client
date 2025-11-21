import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/authApi";
import { getUser as getUserApi } from "../services/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Logged in succesfull");
      navigate("/landlord"); // Navigate to landlord profile
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password are incorrect");
      window.alert(err);
    },
  });

  return { login, isLoading };
};

export const useUser = () => {
  const navigate = useNavigate();
  const { mutate: getUser, isLoading } = useMutation({
    mutationFn: getUserApi,
    onSuccess: (user) => {
      console.log(user);
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  return { getUser, isLoading };
};
