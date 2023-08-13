import { createContext } from "react";
import userType from "@/types/userType";
import { atom } from "recoil";

export const userContext = createContext<userType | undefined>(undefined);

export const userAtom = atom({
	key: 'userData',
	default: {},
  });