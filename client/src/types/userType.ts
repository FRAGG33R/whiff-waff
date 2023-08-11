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

export default interface userType {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  stat: userStatisticsType;
  achievements: userAchievementsType[];
}
