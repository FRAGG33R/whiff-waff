export interface userStatisticsType {
  wins: number;
  loses: number;
  level: number;
  rank: string;
}

export interface userAchievementsType {
  level: number;
  achievement: {
    name: string;
    description: string;
  };
}

export  interface userType {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  stat: userStatisticsType;
  achievements: userAchievementsType[];
}

interface playerType {
	avatar : string;
	userName : string;
}

interface gameType {
	playerOne : playerType,
	playerTwo : playerType,
}

export  interface matchHistoryType {
	game  : gameType, 
	scoreLeft : number,
	scoreRight : number
}

export interface loggedUserType {
	avatar : string,
	userName : string,
	level : Number
}