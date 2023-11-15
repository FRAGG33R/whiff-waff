import { atom } from "recoil";
import { createContext } from "react";
import { FriendsProps , User, UserFriend} from "../types/userFriendType";


export const userContext = createContext<User| undefined>(undefined);

export const friendDataAtom = atom({
	key: `userData-${Math.random()}`,
	default: {},
  });
