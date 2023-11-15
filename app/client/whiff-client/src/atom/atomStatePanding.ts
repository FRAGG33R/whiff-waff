import { atom } from "recoil";
import { createContext } from "react";
import { FriendsProps , User, UserFriend} from "../types/userFriendType";


export const userContext = createContext<UserFriend| undefined>(undefined);

export const pandingDataAtom = atom({
	key: `userData-${Math.random()}`,
	default: {},
  });
