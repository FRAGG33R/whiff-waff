import SideBar from "../layout/sideBar";
import NavBar from "../layout/navBar";
import UserBar from "./userBar";
import { useEffect, useState } from "react";
import { FormEvent, MouseEvent } from "react";
import { IconSend } from "@tabler/icons-react";
import ChannelToggleSwitch from "../ui/buttons/channelToggleSwitch";
import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { channelAtom, chatAtom, loggedUserAtom } from "@/context/RecoilAtoms";
import {
  channelMessageType,
  channelType,
  conversationType,
  messageType,
} from "@/types/chatType";
import Conversation from "./conversation";
import { loggedUserType } from "@/types/userType";
import { useRouter } from "next/router";
import { api } from "../axios/instance";
import toast, { Toaster } from "react-hot-toast";
import { IconMessageOff } from "@tabler/icons-react";
import IndividualChatComponent from "./individualChatComponent";
import ChannelChatComponent from "./channelChatComponent";
import ChannelBar from "./channelBar";
import ChannelConversation from "./channelConversation";
import e from "cors";

interface blockedUser {
id: string;
  userName: string;
}
export default function ChatComponent() {
  const [chat] = useRecoilState(chatAtom);
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [blockedUsers, setBlockedUsers] = useState<blockedUser[]>([]);
  const [socket, setSocket] = useState<any>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [conversations, setConversations] = useState<conversationType[]>(
    chat as conversationType[]
  );
  const [selectedConversatoin, setSelectedConversation] =
    useState<conversationType | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<channelType | null>(
    null
  );
  const [messageContent, setMessageContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Chat");
  const router = useRouter();

  const handleToggle = (value: string) => {
    setActiveTab(value);
  };

  const findSelectedConversation = async (token: string) => {
    if (activeTab === "Chat") {
      if (router.query.chatId === (loggedUser as loggedUserType).userName) {
        setSelectedConversation(
          (chat as conversationType[]).length > 0
            ? (chat as conversationType[])[0]
            : null
        );
        return;
      }
      const conversation = (chat as conversationType[]).find(
        (item: conversationType) =>
          item.receiver.userName === router.query.chatId
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
    } else {
      const channelName = router.query.chatId;
      try {
        const res = await api.get(`chat/room/Conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
		setBlockedUsers(res.data.Conversationdata.blockedUsers);
        setLoggedUser((prev: loggedUserType) => {
          return {
            ...prev,
            id: res.data.loggedUser.id,
          };
        });

        setChannel(res.data.Conversationdata.roomsConversations);
        setSelectedChannel((prev: channelType | null) => {
          const channel = res.data.Conversationdata.roomsConversations.find(
            (item: channelType) => item.roomChat.id === channelName
          );
		  let newSelectedChannel: channelType;
          if (channel)
            newSelectedChannel =  channel;
		else
			newSelectedChannel = res.data.Conversationdata.roomsConversations[0];
			if (newSelectedChannel) {
			const newMessages: channelMessageType[] = newSelectedChannel.message.filter((item: channelMessageType) => {
				const user = res.data.Conversationdata.blockedUsers.find((user: blockedUser) => user.id === item.user.id);
				if (user)
					return false;
				return true;
			});
			newSelectedChannel = {
				roomChat: newSelectedChannel.roomChat,
				message: newMessages,
				avatars: newSelectedChannel.avatars,
			};
			return newSelectedChannel;
		}
		return null;
		});
		
      } catch (error: any) {
      }
    }
  };

  const handleNewMessage = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (messageContent?.length === 0) {
      toast.error("Message should not be empty !", {
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
      return;
    }
    if (activeTab === "Chat") {
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
    } else {
      const date = Date.now();
      const newMessage = {
        receiverId: selectedChannel?.roomChat.id,
        content: messageContent,
        currentDate: date,
      };
      if (selectedChannel) {
        const newSelectedChannel: channelType = {
          roomChat: selectedChannel.roomChat,
          message: [
            ...selectedChannel.message,
            {
              user: {
                id: (loggedUser as loggedUserType).id,
                userName: (loggedUser as loggedUserType).userName,
                avatar: (loggedUser as loggedUserType).avatar,
                email: "",
              },
              message: {
                content: newMessage.content,
                type: "sender",
                date: String(newMessage.currentDate),
              },
              isError: false,
            },
          ],
          avatars: selectedChannel.avatars,
        };
        setSelectedChannel((prev) => newSelectedChannel);
      }
      socket.emit("room", newMessage);
    }
    setMessageContent("");
  };

  const handleChange = (value: string) => {
    setMessageContent(value);
  };

  const handleSelectedChannel = async (channel: channelType) => {
    try {
      const res = await api.get(
        `/chat/room/Conversations/${channel.roomChat.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              token.length > 0 ? token : localStorage.getItem("token")
            }`,
          },
        }
      );
    //   setSelectedChannel((prev: channelType | null) => {
    //     const newMessages: channelMessageType[] = res.data.roomConversation.map(
    //       (item: any) => {
    //         return {
    //           user: {
    //             id: item.user.id,
    //             userName: item.user.userName,
    //             avatar: item.user.avatar,
    //             email: item.user.email,
    //           },
    //           message: {
    //             content: item.message.content,
    //             type: item.message.type,
    //             date: item.message.date,
    //           },
    //           isError: false,
    //         };
    //       }
    //     );
    //     return {
    //       roomChat: channel.roomChat,
    //       message: newMessages,
    //       avatars: channel.avatars,
    //     };
    //   });
	//set the messages but without the blocked users messages
	const newMessages: channelMessageType[] = res.data.roomConversation.filter((item: channelMessageType) => {
		const user = blockedUsers.find((user: blockedUser) => user.id === item.user.id);
		if (user)
			return false;
		return true;
	}
	);
	setSelectedChannel((prev: channelType | null) => {
		return {
			roomChat: channel.roomChat,
			message: newMessages,
			avatars: channel.avatars,
		};
	}
	);
      //   router.push(`/chat/${channel.roomChat.id}`);
    } catch (error) {}
  };

  const handleSelectedConversation = async (conversation: conversationType) => {
    try {
      const res = await api.get(
        `/chat/individualConversations/${conversation.receiver.id}`,
        {
          headers: {
            Authorization: `Bearer ${
				localStorage.getItem("token")
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
      router.push(`/chat/${conversation.receiver.userName}`);
    } catch (error) {}
  };

  const handleReceivedMessage = (message: any) => {
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

  const handleReceivedRoomMessage = (message: any) => {
    setSelectedChannel((prev: channelType | null) => {
      if (prev) {
        const newMessage: channelMessageType = {
          user: {
            id: message.roomSender.user.id,
            userName: message.roomSender.user.userName,
            avatar: "",
            email: "",
          },
          message: {
            content: message.message,
            type: "receiver",
            date: message.date,
          },
          isError: false,
        };
        const newMessages: channelMessageType[] = [...prev.message, newMessage];
        return {
          roomChat: prev.roomChat,
          message: newMessages,
          avatars: prev.avatars,
        };
      } else return prev;
    });
  };

  const handleConnection = () => {
  };

  const handleException = (error: any) => {
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

  const handleRoomException = (error: any) => {
    toast.error(error, {
      style: {
        borderRadius: "12px",
        padding: "12px",
        background: "#6C7FA7",
        color: "#fff",
        fontFamily: "Poppins",
        fontSize: "18px",
      },
    });
	setSelectedChannel((prev: channelType | null) => {
		if (prev) {
			const newMessages: channelMessageType[] = [...prev.message];
			newMessages[newMessages.length - 1].isError = true;
			return {
				roomChat: prev.roomChat,
				message: newMessages,
				avatars: prev.avatars,
			};
		}
		return prev;
		});
  };

  useEffect(() => {
    const socket = io("http://e3r10p16.1337.ma:8889/", {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    socket.on("connect", handleConnection);
    socket.on("exception", handleException);
    socket.on("roomException", handleRoomException);
    socket.on("message", handleReceivedMessage);
    socket.on("room", handleReceivedRoomMessage);
    setSocket(socket);
    return () => {
      socket.off("connect", handleConnection);
      socket.off("message", handleReceivedMessage);
      socket.off("room", handleReceivedRoomMessage);
	  socket.on("roomException", handleRoomException);
      socket.off("exception", handleException);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else {
      setToken(token);
      findSelectedConversation(token);
      setLoaded(true);
    }
  }, [activeTab]);

  return (
    <div className="w-[98%] h-[98%] md:h-[97%] flex items-center justify-start gap-2 md:gap-10 flex-row text-white overflow-y-hidden overflow-x-hidden pt-2">
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
        <div className="w-full h-[96%] md:h-[91%] flex flex-row space-x-2 md:space-x-10 overflow-y-hidden overflow-x-hidden">
          <div className="h-full min-w-[60px] max-w-[400px] w-1/4 md:w-1/3 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px] flex flex-col items-center justify-start  space-y-6">
            <div className="w-full  md:px-4 h-28 flex justify-center items-center">
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
                <ChannelChatComponent
                  channels={channel as channelType[]}
                  handleSelectedChannel={handleSelectedChannel}
                  selectedChannel={selectedChannel!}
                  setSelectedChannel={setSelectedChannel}
                />
              </>
            )}
          </div>
          <div className="h-full w-full space-y-2 md:space-y-10 flex items-start justify-start flex-col">
            <div className="w-full h-16 md:h-24 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px] ">
              {selectedConversatoin && activeTab === "Chat" && (
                <UserBar
                  userName={selectedConversatoin?.receiver.userName}
                  email={selectedConversatoin.receiver.email}
                  avatar={selectedConversatoin.receiver.avatar}
                />
              )}
              {selectedChannel &&
                selectedChannel.roomChat &&
                activeTab === "Channels" && (
                  <ChannelBar
                    channelName={selectedChannel?.roomChat?.name || ""}
                    avatars={selectedChannel?.avatars!}
                    channelId={selectedChannel?.roomChat.id!}
                    setSelectedChannel={setSelectedChannel}
                    selectedChannel={selectedChannel}
                  />
                )}
            </div>
            <div className="w-full md:w-full flex itmes-center h-full md:max-h-[957px] justify-center py-4 lg:py-10 px-4 lg:px-10 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              <div className="w-full h-full flex flex-col items-center justify-between space-y-2">
                {activeTab === "Chat" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {selectedChannel ? (
                      <ChannelConversation conversation={selectedChannel} />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center space-y-2 py-12 font-poppins font-medium text-sm 2xl:text-xl">
                        <IconMessageOff
                          stroke={2}
                          className="h-4 w-4 md:h-8 md:w-8"
                        />
                        <div className="text-center">No messages</div>
                      </div>
                    )}
                  </>
                )}
                {(selectedConversatoin || selectedChannel) && (
                  <div className="h-16 md:h-24 w-full flex items-end justify-center">
                    <form
                      className="w-full min-h-1"
                      onSubmit={handleNewMessage}
                    >
                      <div className="w-10/12 md:w-full h-12 md:h-16 rounded-[12px] md:rounded-[20px] bg-[#606060]/[12%] focus:bg-[#606060]/[12%] font-poppins flex flex-row items-center justify-center px-2">
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
