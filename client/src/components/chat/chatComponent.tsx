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
import { IconMessageOff, IconMessagesOff } from "@tabler/icons-react";
import IndividualChatComponent from "./individualChatComponent";
import ChannelChatComponent from "./channelChatComponent";
import ChannelBar from "./channelBar";
import ChannelConversation from "./channelConversation";

export default function ChatComponent() {
  const [chat] = useRecoilState(chatAtom);

  const [channel, setChannel] = useRecoilState(channelAtom);
  const [loggedUser] = useRecoilState(loggedUserAtom);
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
    console.log("all conversations", chat);
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
          //   try {
          //     const res = await api.get(
          //       `/chat/room/Conversations/${router.query.chatId}`,
          //       {
          //         headers: {
          //           Authorization: `Bearer ${token}`,
          //         },
          //       }
          //     );
          //     setSelectedChannel((prev: channelType | null) => {
          //       const newMessages: channelMessageType[] =
          //         res.data.roomConversation.map((item: any) => {
          //           return {
          //             roomSender: {
          //               user: {
          //                 id: item.user.id,
          //                 userName: item.user.userName,
          //               },
          //             },
          //             message: item.message.content,
          //             type: item.message.type,
          //             date: item.message.date,
          //             isError: false,
          //           };
          //         });
          //       return {
          //         roomChat: res.data.roomConversation.roomChat,
          //         message: newMessages,
          //         avatars: res.data.roomConversation.avatars,
          //       };
          //     });
          //   } catch (error: any) {
          router.push("/404");
          //   }
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
        setChannel(res.data.Conversationdata.roomsConversations);
        setSelectedChannel((prev: channelType | null) => {
          const channel = res.data.Conversationdata.roomsConversations.find(
            (item: channelType) => item.roomChat.id === channelName
          );
          if (channel) {
            return channel;
          }
          return res.data.Conversationdata.roomsConversations[0];
        });
      } catch (error: any) {}
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
      setSelectedChannel((prev: channelType | null) => {
        const newMessages: channelMessageType[] = res.data.roomConversation.map(
          (item: any) => {
            return {
              roomSender: {
                user: {
                  id: item.user.id,
                  userName: item.user.userName,
                },
              },
              message: item.message.content,
              type: item.message.type,
              date: item.message.date,
              isError: false,
            };
          }
        );
        return {
          roomChat: channel.roomChat,
          message: newMessages,
          avatars: channel.avatars,
        };
      });
    //   router.push(`/chat/${channel.roomChat.id}`);
    } catch (error) {}
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
    // toast.error(error.message, {
    //   style: {
    //     borderRadius: "12px",
    //     padding: "12px",
    //     background: "#6C7FA7",
    //     color: "#fff",
    //     fontFamily: "Poppins",
    //     fontSize: "18px",
    //   },
    // });
    // //setIsError(true);
    // //update the laset message on the selected conversation to be an error message
    // setSelectedConversation((prev: conversationType | null) => {
    //   if (prev) {
    //     const newMessages: messageType[] = [...prev.messages];

    //     newMessages[newMessages.length - 1].isError = true;
    //     return {
    //       receiver: prev.receiver,
    //       messages: newMessages,
    //     };
    //   }
    //   return prev;
    // });
  };

	useEffect(() => {
	  const socket = io("http://34.173.232.127:6080/", {
		  extraHeaders: {
			  authorization: `Bearer ${localStorage.getItem("token")}`,
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
        <div className="w-full h-[96%] md:h-[91%] flex flex-row space-x-2 md:space-x-10 overflow-y-hidden overflow-x-hidden">
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
