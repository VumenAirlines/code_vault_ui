import type { User } from "../../types";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  token: string;
  user: User;
}
