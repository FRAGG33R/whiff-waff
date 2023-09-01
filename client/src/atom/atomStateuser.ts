import { atom } from "recoil";
import { createContext } from "react";
import { userType } from "../types/userType";


export const userContext = createContext<userType | undefined>(undefined);

export const userDataAtom = atom({
	key: `userData-${Math.random()}`,
	default: {},
  });
