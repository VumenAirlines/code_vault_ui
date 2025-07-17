import { useAuthStore } from "../../../stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const doLogout = () => {
    queryClient.clear();
    logout();
    navigate("/login");
  };

  return doLogout;
};
