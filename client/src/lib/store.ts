import { create } from "zustand";

export interface IWorkoutSet {
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
  googleData?: Partial<IGoogleUser>;
  access_token?: string;
  dailyData?: Record<string, IWorkoutSet[]>;
}

export interface IUserState {
  user?: IUser;
  setUser: (user: IUser) => void;
  setGoogleData: (google: IUser["googleData"]) => void;
  setDailyProgress: (data: IUser["dailyData"]) => void;
  setAccessToken: (token: string) => void;
}

export const useUser = create<IUserState>((set) => ({
  user: undefined,
  setUser: (user: IUser) => set({ user }),
  setGoogleData: (google: IUser["googleData"]) =>
    set((state) => ({
      user: { ...state.user, googleData: google } as IUser,
    })),
  setDailyProgress: (data: IUser["dailyData"]) =>
    set((state) => ({ user: { ...state.user, dailyData: data } as IUser })),
  setAccessToken: (token: string) => set((state) => ({ user: { ...state.user, access_token: token } }))
}));
