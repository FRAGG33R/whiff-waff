import { createContext } from "react";
import {userType} from "@/types/userType";
import { atom } from "recoil";
import {matchHistoryType} from '@/types/userType'
export const userContext = createContext<userType | undefined>(undefined);

export const userAtom = atom({
	key: `userData-${Math.random()}`,
	default: {},
});

export const matchHistory = createContext< matchHistoryType[] | undefined>(undefined);

export const matchHistoryAtom = atom({
	key: `matchHistory-${Math.random()}`,
	default: [],
  });