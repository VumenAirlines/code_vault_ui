import { api } from "../../lib/axios";
import { type LoginCredentials, type LoginResponse } from "./types";

export const doLogin = async (
  creds: LoginCredentials
): Promise<LoginResponse> => {
  return (await api.post("/Auth/login", creds)).data;
};
