
export interface UserFriend {
  firstData: Array<User>;
  secondData: Array<User>;
}
export interface User {
  id: string;
  avatar: string;
  userName: string;
  stat: {
    level: number;
    rank: string;
  };
}

export interface FriendsProps {
  data: {
    receiver: User;
    sender: User;
    status: string;
  }[];
}