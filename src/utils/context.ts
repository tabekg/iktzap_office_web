import { Dispatch, SetStateAction, createContext } from "react";
import { IUser } from "../models/user";

export const UserContext = createContext<TUserContext | null>(null);

export type TUserContext = {
  user: IUser | null | undefined;
  setUser: Dispatch<SetStateAction<IUser | null | undefined>>;
};
