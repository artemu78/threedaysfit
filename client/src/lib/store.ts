import { create } from "zustand";
import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ISingleRep {
  isComplete: boolean;
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
  dailyData?: Record<string, ISingleRep[]>;
}

export interface IUserState {
  user?: IUser;
  setUser: (user: IUser) => void;
  setGoogleData: (google: IUser["googleData"]) => void;
  setDailyProgress: (exerciseId: string, exerciseSet: ISingleRep[]) => void;
  setAccessToken: (token: string) => void;
}

const paramStorage = {
  getItem: (name: string): string | null => {
    console.log('getItem', name);
    return "some shit";
  },
  setItem: (name: string, value: string): void => {
    console.log('setItem', name, value);
  },
  removeItem: (name: string): void => {
    console.log('removeItem', name);
  },
};

export const useUser = create<IUserState>()(persist(
  (set) => ({
    user: undefined,
    setUser: (user: IUser) => set({ user }),
    setGoogleData: (google: IUser["googleData"]) =>
      set((state) => ({
        user: { ...state.user, googleData: google } as IUser,
      })),
    setDailyProgress: (exerciseId: string, exerciseSet: ISingleRep[]) =>
      set((state) => ({
        user: {
          ...state.user,
          dailyData: {
            ...state.user?.dailyData,
            [exerciseId]: exerciseSet,
          },
        },
      })),
    setAccessToken: (token?: string) => set((state) => ({ user: { ...state.user, access_token: token } }))
  }),
  {
    name: 'position-storage',
    storage: createJSONStorage(() => paramStorage),
  }));
