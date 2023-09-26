import SideBar from "../layout/sideBar";
import NavBar from "../layout/navBar";
import UserBar from "./userBar";
import { useEffect, useState } from "react";
import { FormEvent, MouseEvent } from "react";
import { IconSend } from "@tabler/icons-react";
import CreateChannel from "./createChannel";
import ChannelToggleSwitch from "../ui/buttons/channelToggleSwitch";
import ExploreChannels from "./exploreChannels";
import SingleConversationHistory from "./singleConversationHistory";
import ChannelsConversation from "./channelsConversation";
import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { chatAtom, loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { conversationType, messageType } from "@/types/chatType";
import Conversation from "./conversation";
import { loggedUserType, userType } from "@/types/userType";
import { useRouter } from "next/router";
import { api } from "../axios/instance";
import toast, { Toaster } from "react-hot-toast";
import { IconMessagesOff, IconMessageOff } from "@tabler/icons-react";
import IndividualChatComponent from "./individualChatComponent";

export default function ChatComponent() {
  const [chat] = useRecoilState(chatAtom);
  const [loggedUser] = useRecoilState(loggedUserAtom);
  const [socket, setSocket] = useState<any>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [conversations, setConversations] = useState<conversationType[]>(
    chat as conversationType[]
  );
  const [selectedConversatoin, setSelectedConversation] =
    useState<conversationType | null>(null);
  const [messageContent, setMessageContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Chat");
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

  const router = useRouter();

  const handleToggle = (value: string) => {
    setActiveTab(value);
  };

  const findSelectedConversation = async (token: string) => {
    if (router.query.chatId === (loggedUser as loggedUserType).userName) {
      setSelectedConversation(
        (chat as conversationType[]).length > 0
          ? (chat as conversationType[])[0]
          : null
      );
      return;
    }
    const conversation = (chat as conversationType[]).find(
      (item: conversationType) => item.receiver.userName === router.query.chatId
    );
    if (conversation) {
      setSelectedConversation((prev: conversationType | null) => {
        return {
          receiver: conversation.receiver,
          messages: conversation.messages,
        };
      });
    } else {
      try {
        const res = await api.get(`/users/profile/${router.query.chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // throw an exception when the user not a friend of the logged user and router.back() to the previous page
        const userData = res.data.response.user;
        const newConversation: conversationType = {
          receiver: {
            id: userData.id,
            userName: userData.userName,
            email: userData.email,
            avatar: userData.avatar,
          },
          messages: [],
        };
        setSelectedConversation((prev: conversationType | null) => {
          return {
            receiver: newConversation.receiver,
            messages: [],
          };
        });
        setConversations((prev: conversationType[]) => [
          ...prev,
          newConversation,
        ]);
      } catch (err: any) {
        router.push("/404");
      }
    }
  };

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
            isError: false,
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

  const handleSelectedConversation = async (conversation: conversationType) => {
    console.log("conversation : ", conversation.receiver.userName);
    try {
      const res = await api.get(
        `/chat/individualConversations/${conversation.receiver.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              token.length > 0 ? token : localStorage.getItem("token")
            }`,
          },
        }
      );
      setSelectedConversation((prev: conversationType | null) => {
        return {
          receiver: conversation.receiver,
          messages: res.data.messages,
        };
      });
      console.log("res : ", res.data);
      router.push(`/chat/${conversation.receiver.userName}`);
    } catch (error) {}
  };

  const handleReceivedMessage = (message: any) => {
    console.log("I received this message: ", message);
      setSelectedConversation((prev: conversationType | null) => {
        if (prev) {
          const newMessage: messageType = {
            content: message.content,
            type: "receiver",
            date: message.currentDate,
            isError: false,
          };
          const newMessages: messageType[] = [...prev.messages, newMessage];
          return {
            receiver: prev.receiver,
            messages: newMessages,
          };
        } else return prev;
      });
  };

  const handleConnection = () => {
    console.log("connection successfuly");
  };

  const handleException = (error: any) => {
    console.log("socket error : ", error.message);
    toast.error(error.message, {
      style: {
        borderRadius: "12px",
        padding: "12px",
        background: "#6C7FA7",
        color: "#fff",
        fontFamily: "Poppins",
        fontSize: "18px",
      },
    });
    //   setIsError(true);
    //update the laset message on the selected conversation to be an error message
    setSelectedConversation((prev: conversationType | null) => {
      if (prev) {
        const newMessages: messageType[] = [...prev.messages];
        newMessages[newMessages.length - 1].isError = true;
        return {
          receiver: prev.receiver,
          messages: newMessages,
        };
      }
      return prev;
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else {
      setToken(token);
      findSelectedConversation(token);
    }

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
      <Toaster position="top-right" />
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
          <div className="h-full min-w-[60px] max-w-[400px] w-1/4 md:w-1/3 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px] flex flex-col items-center justify-start  space-y-6">
            <div className="hidden w-full px-4 h-28 md:flex justify-center items-center">
              <ChannelToggleSwitch
                firstValue="Chat"
                secondValue="Channels"
                onToggle={handleToggle}
              />
            </div>
            {activeTab === "Chat" ? (
              <IndividualChatComponent
                conversations={conversations}
                handleSelectedConversation={handleSelectedConversation}
                selectedConversation={selectedConversatoin!}
              />
            ) : (
              <>
                <div className="w-full h-full px-2 lg:px-4 space-y-2 xl:space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
                  <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
                    <CreateChannel />
                  </div>
                  <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
                    <ExploreChannels />
                  </div>
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
            <div className="w-full h-16 md:h-24 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px] ">
              {selectedConversatoin && (
                <UserBar
                  userName={selectedConversatoin?.receiver.userName}
                  email={selectedConversatoin.receiver.email}
                  avatar={selectedConversatoin.receiver.avatar}
                />
              )}
            </div>
            <div className="w-full flex itmes-center min-h-[10px] md:min-h-[780px] 3xl:h-full max-h-[957px] justify-center py-4 lg:py-10 px-4 lg:px-10 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              <div className="w-full h-full flex flex-col items-center justify-between space-y-2">
                {selectedConversatoin ? (
                  <Conversation conversation={selectedConversatoin} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-2 py-12 font-poppins font-medium text-sm 2xl:text-xl">
                    <IconMessageOff
                      stroke={2}
                      className="h-4 w-4 md:h-8 md:w-8"
                    />
                    <div className="text-center">No messages</div>
                  </div>
                )}
                {selectedConversatoin && (
                  <div className="h-16 md:h-24 w-full flex items-end justify-center">
                    <form
                      className="w-full min-h-1"
                      onSubmit={handleNewMessage}
                    >
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
