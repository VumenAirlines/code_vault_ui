export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  userId: string;
  expiry: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  token: string;
  username: string;
  userId: string;
  expiry: string;
}
