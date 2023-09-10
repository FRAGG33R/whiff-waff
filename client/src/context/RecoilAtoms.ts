import { createContext } from "react";
import {loggedUserType, userType} from "@/types/userType";
import { atom } from "recoil";
import {matchHistoryType} from '@/types/userType'

export const userContext = createContext<userType | undefined>(undefined);

export const userAtom = atom({
	key: `userData-${Math.random()}`,
	default: {},
});

export const loggedUserContext = createContext<loggedUserType | undefined>(undefined);

export const loggedUserAtom = atom({
	key: `loggedUser-${Math.random()}`,
	default: {},
});

export const matchHistory = createContext<matchHistoryType | undefined>(undefined);

export const matchHistoryAtom = atom({
	key: `matchHistory-${Math.random()}`,
	default: [],
  });

  export const loggedUserFriends = createContext<loggedUserType | undefined>(undefined);
 
  export const loggedUserFriendsAtom = atom({
	key: `loggedUserFriends-${Math.random()}`,
	default: {},
  });