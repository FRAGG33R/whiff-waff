import SideBar from "../layout/sideBar";
import NavBar from "../layout/navBar";
import UserBar from "./userBar";
import { conversation } from "@/types/dummy";
import { Fragment, useEffect, useState } from "react";
import { FormEvent, MouseEvent } from "react";
import { IconSend } from "@tabler/icons-react";
import CreateChannel from "./createChannel";
import ChannelToggleSwitch from "../ui/buttons/channelToggleSwitch";
import ExploreChannels from "./exploreChannels";
import SingleConversationHistory from "./singleConversationHistory";
import ChannelsConversation from "./channelsConversation";
import { avatar } from "@material-tailwind/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { chatAtom, loggedUserAtom } from "@/context/RecoilAtoms";
import { conversationType, messageType } from "@/types/chatType";
import Conversation from "./conversation";
import { loggedUserType } from "@/types/userType";
import ChannelSettings from "./channelSetting";

export default function ChatComponent() {
  const [chat, setChat] = useRecoilState(chatAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [socket, setSocket] = useState<any>();
  const [conversations, setConversations] = useState<conversationType[]>(chat as conversationType[]);
  const [selectedConversatoin, setSelectedConversation] =
    useState<conversationType | null>(
      (chat as conversationType[]).length > 0 ? (chat as conversationType[])[0] : null
    );
  const [messageContent, setMessageContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Chat");
  const handleToggle = (value: string) => {
    setActiveTab(value);
  };

  const dummyArray1 = [
    {
      channelName: "3assker6",
      userName: "JohnWick",
      avatars: [
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
      ],
      lastMessage: "Hello there!",
    },
    {
      channelName: "3assker",
      userName: "JohnWick",
      avatars: [
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
      ],
      lastMessage: "Hello there!",
    },
    {
      channelName: "3assker",
      userName: "JohnWick",
      avatars: [
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
      ],
      lastMessage: "Hello there!",
    },
    {
      channelName: "3assker2",
      userName: "JohnWick",
      avatars: [
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
      ],
      lastMessage: "Hello there!",
    },
    {
      channelName: "3assker3",
      userName: "JohnWick",
      avatars: [
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
        
      ],
      lastMessage: "Hello there!",
    },
  ];

  const handleNewMessage = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (messageContent?.length === 0) {
      alert("Message should not be empty !");
      return;
    }
    const date = Date.now();
    const newMessage = {
      receiverId: selectedConversatoin?.receiver.id,
      content: messageContent,
      currentDate: date,
    };

    if (selectedConversatoin) {
      const newSelectedConversation: conversationType = {
        receiver: selectedConversatoin.receiver,
        messages: [
          ...selectedConversatoin?.messages,
          {
            content: newMessage.content,
            type: "sender",
            date: String(newMessage.currentDate),
          },
        ],
      };
      setSelectedConversation((prev) => newSelectedConversation);
    }
    socket.emit("message", newMessage);
    setMessageContent("");
  };

  const handleChange = (value: string) => {
    setMessageContent(value);
  };

  const handleSelectedConversation = (conversation: conversationType) => {
    setSelectedConversation(conversation);
  };

  const handleReceivedMessage = (message: any) => {
	console.log("I received this message: ", message);
	const newMessage : messageType = {
		content: message.content,
		type: "receiver",
		date: message.currentDate,
		};
	if (selectedConversatoin) {
		// const newSelectedConversation: conversationType = {
		//   receiver: selectedConversatoin.receiver,
		//   messages: [
		// 	...selectedConversatoin?.messages,
		// 	{
		// 	  content: newMessage.content,
		// 	  type: newMessage.type,
		// 	  date: String(newMessage.date),
		// 	},
		//   ],
		// };
		setSelectedConversation((prev : conversationType | null) => {
			const newArray  : messageType[] = [...prev!.messages, newMessage];
			console.log('new array ', newArray);
			return {
				receiver : prev?.receiver!,
				messages : newArray
			};
		})
	  }
  };

  const handleConnection = () => {
    console.log("connection successfuly");
  };

  const handleException = (error: any) => {
    console.log("socket error : ", error);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://34.173.232.127:6080/", {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", handleConnection);
    socket.on("exception", handleException);
    socket.on("message", handleReceivedMessage);
    setSocket(socket);
    return () => {
      socket.off("connect", handleConnection);
      socket.off("message", handleReceivedMessage);
      socket.off("exception", handleException);
    };
  }, []);

  return (
    <div className="w-[98%] h-[98%] md:h-[97%] flex items-center justify-start gap-2 md:gap-10 flex-row text-white overflow-y-hidden pt-2">
      <div className="h-full min-w-[60px] w-[60px] md:w-[100px] pt-2">
        <SideBar />
      </div>
      <div className="h-full w-[89%] md:w-full space-y-2 md:space-y-10 pt-2">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
          <NavBar
            level={String((loggedUser as loggedUserType).level)}
            useName={(loggedUser as loggedUserType).userName}
            avatar={(loggedUser as loggedUserType).avatar}
          />
        </div>
        <div className="w-full h-[92%] md:h-[91%] flex flex-row space-x-2 md:space-x-10 overflow-y-hidden overflow-x-hidden">
          <div className="h-full min-w-[60px] max-w-[400px] w-1/4 md:w-1/3 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px] flex flex-col items-center justify-start py-12 space-y-12">
            <div className="hidden w-full px-4 h-32  md:flex justify-center items-center">
              <ChannelToggleSwitch
                firstValue="Chat"
                secondValue="Channels"
                onToggle={handleToggle}
              />
            </div>
            {activeTab === "Chat" ? (
              <div className="w-full h-full px-2 lg:px-4 space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
                {conversations.map((item: conversationType, index: number) => (
                  <SingleConversationHistory
                    key={index}
                    userName={item.receiver.userName}
                    lastMessage={
                      item.messages[item.messages.length - 1].content
                    }
                    avatar={item.receiver.avatar}
                    selected={
                      selectedConversatoin?.receiver.userName ===
                      item.receiver.userName
                    }
                    messagePrefix={
                      item.messages[item.messages.length - 1].type ===
                      "sender"
                    }
                    onClick={() => handleSelectedConversation(item)}
                  />
                ))}
              </div>
            ) : (
              <>
                <motion.div
                  whileTap={{ backgroundColor: "#2e4169" }}
                  className="w-full px-4  h-24 2xl:h-32 flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]"
                >
                  <CreateChannel />
                </motion.div>
                <motion.div
                  whileTap={{ backgroundColor: "#2e4169" }}
                  className="w-full px-4  h-24 2xl:h-32 flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]"
                >
                  <ExploreChannels />
                </motion.div>
                <div className="w-full h-full px-2 lg:px-4 space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
                  {dummyArray1.map((item, index) => (
                    <ChannelsConversation
                      key={index}
                      lastUser={item.userName}
                      channelName={item.channelName}
                      lastMessage={item.lastMessage}
                      avatars={item.avatars || []}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="h-full w-full space-y-2 md:space-y-10 flex items-start justify-start flex-col">
            <div className="w-full h-16 md:h-24 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              {selectedConversatoin && (
                <UserBar
                  userName={selectedConversatoin?.receiver.userName}
                  email={selectedConversatoin.receiver.email}
                  avatar={selectedConversatoin.receiver.avatar}
                />
              )}
            </div>
            <div className="w-full flex itmes-center min-h-[780px] 3xl:h-full max-h-[957px]  justify-center py-4 lg:py-10 px-4 lg:px-10 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              <div className="w-full h-[76%] md:h-full flex flex-col items-center justify-between space-y-2">
                {selectedConversatoin && (
                  <Conversation conversation={selectedConversatoin} />
                )}
                <div className="h-16 md:h-24 w-full flex items-end justify-center ">
                  <form className="w-full min-h-1" onSubmit={handleNewMessage}>
                    <div className="w-full h-12 md:h-16 rounded-[12px] md:rounded-[20px] bg-[#606060]/[12%] focus:bg-[#606060]/[12%] font-poppins flex flex-row items-center justify-center px-2">
                      <input
                        type="text"
                        placeholder="Write a message..."
                        onChange={(e) => handleChange(e.target.value)}
                        value={messageContent}
                        className="input input-ghost w-full h-full rounded-[12px] md:rounded-[20px] bg-transparent focus:ring-0 focus:outline-none placeholder:text-HokiCl focus:text-HokiCl caret-GreenishYellow tracking-wide text-HokiCl  text-md md:text-[1.3rem] "
                      />
                      <button
                        onClick={handleNewMessage}
                        className="w-10 h-8 md:h-12 md:w-12 rounded-[12px] md:rounded-[17px] bg-GreenishYellow text-black flex items-center justify-center"
                      >
                        <IconSend className="md:w-6 md:h-6 w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  