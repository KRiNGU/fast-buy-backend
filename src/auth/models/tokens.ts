export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  sub: number;
  login: string;
  email: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & {
  refreshToken: string;
};
