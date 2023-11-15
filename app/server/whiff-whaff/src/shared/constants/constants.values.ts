import { ChatRoomType,  UserStatus } from "@prisma/client";

export const DEFAULT_RANK_USER = "ROOKIE";
export const DEFAULT_LEVEL_USER = 0;
export const DEFAULT_NB_LOSES_USER = 0;
export const DEFAULT_NB_WINS_USER = 0;
export const DEFAULT_LEVEL_ACHIEVEMENT_USER = 0;
export const PREFIX_USERNAME = 'guest_'
export const DEFAULT_PASSWORD_42_USER = ''
export const NAME_KEY_KOOKIE_TOKEN = 'token'
export enum PlayerStatus {
	ACTIVE = 'ONLINE',
	INACTIVE = 'OFFLINE',
}

export const CHANNEL_TYPES = Object.values(ChatRoomType).filter(v => typeof v !== "number").join('|')
export const USER_STATUS = Object.values(UserStatus).filter(v => typeof v !== "number" && v !== UserStatus.OWNER ).join('|')
export const SALT_ROUNDS = 10
export const BUCKET_TRIGRRED_EVENT = 'finish'
export const ERROR_TRIGRRED_EVENT = 'error'
export const UNDER_SCORE = '_'

export const NUMBER_OF_GAMES = 5;
export const NUMBER_OF_FRIENDS = 7;
export const NUMBER_OF_FIRST_PAGE = 0;