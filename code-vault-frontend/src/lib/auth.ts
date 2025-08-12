import { redirect } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export const protectedRouteLoader = () => {
  const token = useAuthStore.getState().token;

  if (!token) {
    return redirect("/login");
  }
  return null;
};
import type { LoaderFunction } from "react-router-dom";

export const authRouteLoader: LoaderFunction = async () => {
  const isLoggedIn = useAuthStore.getState().token;

  if (isLoggedIn) {
    return redirect("/");
  }

  return null;
};
