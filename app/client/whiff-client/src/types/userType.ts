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
  status : string;
  otpEnable : boolean;
}

interface playerType {
	avatar : string;
	userName : string;
}

interface gameType {
	playerOne : playerType,
	playerTwo : playerType,
}

export  interface singleMatchType {
	game  : gameType, 
	scoreLeft : number,
	scoreRight : number
}

export interface  matchHistoryType {
	historyGame : singleMatchType[],
	gamesNumber : number,
	elementsNumber : number
}
export interface loggedUserType {
	avatar : string,
	userName : string,
	level : Number
	id : string
}

export interface scoreIdType {
  score1 : number
  score2 : number
}

export interface dataGameType {
  type : string,
  map : string,
  mode : string,
  inveter : boolean,
  userName : string
}