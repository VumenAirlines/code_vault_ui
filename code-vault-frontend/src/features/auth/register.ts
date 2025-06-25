import { api } from "../../lib/axios";
import { type RegisterCredentials, type RegisterResponse } from "./types";

export const register = async (
  creds: RegisterCredentials
): Promise<RegisterResponse> => {
  return (await api.post("/Auth/register", creds)).data;
};
