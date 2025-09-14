import { b } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { create } from "zustand";

export interface IUser {
  google: {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
  };
  data: {};
}

export interface IUserState {
  user?: IUser;
  setUser: (user: IUser) => void;
}

export const useUser = create<IUserState>((set) => ({
  user: undefined,
  setUser: (user: IUser) => set({ user }),
}));
