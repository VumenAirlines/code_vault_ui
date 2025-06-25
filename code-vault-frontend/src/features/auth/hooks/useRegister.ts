import { register } from "../register";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate("/snippets");
    },
    onError: (err) => {
      console.error(`Error registering: ${err}`);
    },
  });
};
