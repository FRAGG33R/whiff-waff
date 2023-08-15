import React from "react";
import Requestepage from "./Requestepage";
import { Request } from "../../types/FriendType";
import axios from "axios";
import { useEffect, useState } from "react";

const requestsList = () => {
  const requests: Request[] = [
    {
      userName: "Safae",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&w=1000&q=80",
    },
    {
      userName: "Kamal",
      image:
        "https://cdn.intra.42.fr/users/2f44c3084696e9e7c96f6af38c788ebc/kfaouzi.jpg",
    },
    {
      userName: "Ayoub",
      image:
        "https://cdn.intra.42.fr/users/b1149873b30401e627ea9ece25018f30/ataji.jpg",
    },
    {
      userName: "Issam",
      image:
        "https://cdn.intra.42.fr/users/ddb8e56b85279d1000fa7ad2389f46c9/ibenmain.jpg",
    },
    {
      userName: "Houssam",
      image:
        "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
    },
    {
      userName: "Aissam",
      image:
        "https://cdn.intra.42.fr/users/5d05347ef84ba22771ba3bcf84804482/abarchil.jpg",
    },
    {
      userName: "Yakoub",
      image:
        "https://cdn.intra.42.fr/users/be24997028ca0ec07a15af6975840eb6/yakhoudr.jpg",
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
      {requests.map((request, index) => (
        <Requestepage req={request} key={index} />
      ))}
    </div>
  );
};

export default requestsList;
