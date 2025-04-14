export type LoginRequest = {
  phone_number: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresInHour: number;
};

export type RegisterRequest = {
  name: string;
  phone_number: string;
  password: string;
  country?: string;
};

export type RegisterResponse = {};

