import React from "react";
import FriendGame from "./firendGame";
import Expert from "../../../public/expert.svg";
import GrandMaster from "../../../public/grandMaster.svg";
import Legend from "../../../public/LEGEND.svg";
import Rookie from "../../../public/Rookie.svg";
import Chanllenger from "../../../public/Challenger.svg";
import { useState, useEffect } from "react";
import { Friend } from "../../types/FriendType";
import axios from "axios";

const friendList = () => {
  const friends: Friend[] = [
    {
      userName: "Safae",
      level: 5,
      status: "Online",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&w=1000&q=80",
      rankSvg: Expert,
    },
    {
      userName: "Kamal",
      level: 12,
      status: "Online",
      image:
        "https://cdn.intra.42.fr/users/2f44c3084696e9e7c96f6af38c788ebc/kfaouzi.jpg",
      rankSvg: GrandMaster,
    },
    {
      userName: "Ayoub",
      level: 7,
      status: "Online",
      image:
        "https://cdn.intra.42.fr/users/b1149873b30401e627ea9ece25018f30/ataji.jpg",
      rankSvg: Rookie,
    },
    {
      userName: "Issam",
      level: 1,
      status: "Online",
      image:
        "https://cdn.intra.42.fr/users/ddb8e56b85279d1000fa7ad2389f46c9/ibenmain.jpg",
      rankSvg: Rookie,
    },
    {
      userName: "Houssam",
      level: 17,
      status: "Online",
      image:
        "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
      rankSvg: GrandMaster,
    },
    {
      userName: "Aissam",
      level: 5,
      status: "Offline",
      image:
        "https://cdn.intra.42.fr/users/5d05347ef84ba22771ba3bcf84804482/abarchil.jpg",
      rankSvg: Chanllenger,
    },
    {
      userName: "Yakoub",
      level: 4,
      status: "InGame",
      image:
        "https://cdn.intra.42.fr/users/be24997028ca0ec07a15af6975840eb6/yakhoudr.jpg",
      rankSvg: Legend,
    },
  ];
  const [friend, setFriends] = useState([]);

  let jwtToken: string | null = null;

  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("token");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/friends");
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friend data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
      {friends.map((friend, index) => (
        <FriendGame friends={friend} key={index} />
      ))}
    </div>
  );
};

export default friendList;
