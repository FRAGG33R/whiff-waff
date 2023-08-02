import totalWins from "../../public/totalWins.svg";
import totalMatches from "../../public/totalMatches.svg";
import totalLoses from "../../public/totalLoses.svg";

interface matchStatistics {
    title: string;
    value: number;
    avatar: string;
}

export const matchStatistics: matchStatistics[] = [
    { title: "Total Matches", value: 120, avatar: totalMatches },
    { title: "Total Wins", value: 89, avatar: totalWins },
    { title: "Total Loses", value: 39, avatar: totalLoses },
  ];