export interface IuserForRegister {
  userName: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface IuserForLogin {
  userName: string;
  password: string;
  token: string;
}
