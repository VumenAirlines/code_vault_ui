import { doLogin } from "../login";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: doLogin,
    onSuccess: (data) => {
      login({ username: data.username, userId: data.userId }, data.token);
      navigate("/snippets");
    },
    onError: (err) => {
      console.error(`Error logging in: ${err}`);
    },
  });
};
