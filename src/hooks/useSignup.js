import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { signup as signupApi } from "../services/authApi";

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account created succesfully");
      window.alert("Account created succesfully");
    },
    onError: (err) => {
      console.log(err);
      window.alert(err);
    },
  });

  return { signup, isLoading };
};
