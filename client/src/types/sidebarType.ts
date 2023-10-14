import profile from "../../public/profile.svg";
import settings from "../../public/settings.svg";
import friends from "../../public/friends.svg";
import racket from "../../public/racket.svg";
import chat from "../../public/chat.svg";
import SideProfile from "../../public/PSIDE.svg";
import RacketSide from "../../public/GAMESIDE.svg";
import FriendsSide from "../../public/FRSIDE.svg";
import ChatSide from "../../public/CHATSIDE.svg";
import SettingsSide from "../../public/SETSIDE.svg";


export const navigation = [
  { name: `profile`, icon: SideProfile, activeIcon:  profile},
  { name: "game", icon: racket , activeIcon: RacketSide},
  { name: "chat", icon: chat, activeIcon: ChatSide},
  { name: "friends", icon: friends,   activeIcon: FriendsSide },
  { name: "settings", icon: settings , activeIcon: SettingsSide},
];
