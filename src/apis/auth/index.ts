import axiosClient from "../../utils/axiosClient/index";

export const END_POINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "auth/me",
};

export interface UserLogin {
  [x: string]: any;
  username: string;
  password: string;
}

export interface Token {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
export interface UserResponse {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  updateAt: string;
}

export interface LoginResponse {
  data: {
    token: Token;
    user: UserResponse;
  };
}

export const loginAccount = (payload: UserLogin) => {
  return axiosClient.post<LoginResponse>(END_POINT.LOGIN, {
    username: payload.username,
    password: payload.password,
  });
};
export const registerAccount = (payload: UserLogin) => {
  return axiosClient.post(END_POINT.REGISTER, {
    username: payload.username,
    password: payload.password,
  });
};
