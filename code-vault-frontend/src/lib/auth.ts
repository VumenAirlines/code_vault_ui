import { redirect } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export const protectedRouteLoader = () => {
  const token = useAuthStore.getState().token;

  if (!token) {
    return redirect("/login");
  }
  return null;
};
