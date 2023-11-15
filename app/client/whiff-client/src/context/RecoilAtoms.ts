import { createContext } from "react";
import {dataGameType, loggedUserType, scoreIdType, userType} from "@/types/userType";
import { atom } from "recoil";
import {matchHistoryType} from '@/types/userType'
import { channelType, conversationType } from "@/types/chatType";
import { Socket } from "socket.io-client";

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

export const chatContext = createContext<conversationType[] | undefined>(undefined);

export const chatAtom = atom({
	key: `chat-${Math.random()}`,
	default: {},
});

export const channelContext = createContext<channelType[] | undefined>(undefined);

export const channelAtom = atom({
	key: `channel-${Math.random()}`,
	default: {},
});

export const idContext = createContext<string | undefined>(undefined);

export const idAtom = atom({
	key: `id-${Math.random()}`,
	default: "",
});

export const scoreIdContext = createContext<scoreIdType | undefined>(undefined);

export const scoreIdAtom = atom({
	key: `scoreId-${Math.random()}`,
	default: {},
});

export const socketContext = createContext<Socket | null>(null);

export const socketAtom = atom({
	key: `socket-${Math.random()}`,
	default: {},
});

export const dataGameContext = createContext<dataGameType | undefined>(undefined);

export const dataGameAtom = atom({
	key: `dataGame-${Math.random()}`,
	default: {},
});