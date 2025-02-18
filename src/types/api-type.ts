export interface User {
  usId: string;
  usNm: string;
  usPw: string;
  usRole: string;
  usEmail: string;
  token: string;
}

export type ResponseData = {
  isOk: boolean;
  data?: any;
  message?: string;
};

export type AuthResponse = {
  token?: string;
  user?: User;
  message?: string;
};
