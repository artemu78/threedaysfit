import { create } from "zustand";
export interface IWorkoutSet {
  exercise: string;
  weight: number;
  reps: number;
}

export interface IGoogleUser {
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
}

export interface IUser {
  googleData?: IGoogleUser;
  data?: Record<string, IWorkoutSet[]>;
}

export interface IUserState {
  user?: IUser;
  setUser: (user: IUser) => void;
  setGoogleData: (google: IUser["googleData"]) => void;
  setDataProgress: (data: IUser["data"]) => void;
}

export const useUser = create<IUserState>((set) => ({
  user: undefined,
  setUser: (user: IUser) => set({ user }),
  setGoogleData: (google: IUser["googleData"]) =>
    set((state) => ({
      user: { ...state.user, googleData: google } as IUser,
    })),
  setDataProgress: (data: IUser["data"]) =>
    set((state) => ({ user: { ...state.user, data } as IUser })),
}));
