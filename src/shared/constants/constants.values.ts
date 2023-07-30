export const DEFAULT_RANK_USER = "ROOKIE";
export const DEFAULT_LEVEL_USER = 0;
export const DEFAULT_NB_LOSES_USER = 0;
export const DEFAULT_NB_WINS_USER = 0;
export const DEFAULT_LEVEL_ACHIEVEMENT_USER = 0;

export enum PlayerStatus {
    ACTIVE = 'ONLINE',
    INACTIVE = 'OFFLINE',
  }

export const SALT_ROUNDS = 10
export const JWT_EXPIRATION_TIME = '10d'