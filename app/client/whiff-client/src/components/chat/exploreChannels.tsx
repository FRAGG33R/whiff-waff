import { useEffect, useState, KeyboardEvent } from "react";
import Image from "next/image";
import EXPLORE from "../../../public/EXPLORE.svg";
import Descovery from "../../../public/Discovery.svg";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import ModelChannel from "./modelChannel";
import { useRouter } from "next/router";
import { api } from "../axios/instance";
import { channelType, expoloreChannelListType } from "@/types/chatType";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { channelAtom } from "@/context/RecoilAtoms";
import UserInput from "../ui/inputs/userInput";
import PrimaryButton from "../ui/buttons/primaryButton";

const ExploreChannels = (props: {
  selectedChannel: channelType;
  setSelectedChannel: Function;
}) => {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [exploreChannelList, setExploreChannelList] = useState<
    expoloreChannelListType[]
  >([]);
  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [item, setItem] = useState<expoloreChannelListType>({} as any);
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
		handleJoinChannel(item);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setDisplayPassword(false);
  };

  const handleJoinChannel = async (item: expoloreChannelListType) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      var req;
      if (password.length > 0)
        req = {
          channelName: item.name,
          channelPassword: password,
        };
      else
        req = {
          channelName: item.name,
        };
      const res = await api.post("/chat/room/join", req, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newChannel: channelType = {
        roomChat: {
          id: res.data.id,
          name: res.data.name,
        },
        avatars: res.data.avatars,
        message: [],
      };
      setChannel((prev: channelType[]) => [...prev, newChannel]);
      props.setSelectedChannel(newChannel);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
    }
  };

  const fetchData = async (token: string) => {
    try {
      const res = await api.get("/chat/exploreChannels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExploreChannelList(res.data);
    } catch (error: any) {
    }
  };

  useEffect(() => {
    if (open === false) return;
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else fetchData(token);
  }, [open]);

  return (
    <div className="w-full flex flex-row  gap-2 justify-center xl:justify-start ">
      <button
        onClick={handleOpen}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={EXPLORE}
          alt="information icon"
          className="w-10 md:w-16 h-full "
        />
        <div className="2xl:w-[80%] 2xl:flex items-center justify-start font-teko font-meduim hidden 2xl:text-3xl 3xl:text-4xl text-[#6C7FA7] text-opacity-50">
          {" "}
          Explore channels
        </div>
      </button>
      <Dialog
        className="bg-RhinoBlue  h-[600px] w-[200px] rounded-[20px]"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <Toaster position="top-right" />
        <DialogHeader className="text-Mercury font-teko flex items-center justify-center gap-3 ">
          <Image
            src={Descovery}
            alt="information icon"
            className="w-[8%] h-[8%] "
          />
          <div className=" 2xl:w-[80%] flex items-center justify-start font-teko font-semibold  text-3xl text-Mercury ">
            {" "}
            Channels
          </div>
        </DialogHeader>
        <DialogBody className="h-[510px] flex flex-col justify-center items-center">
          <div className="w-full h-full px-2 lg:px-4 space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
            {displayPassword === false ? (
              <>
                {exploreChannelList.map((item, index) => (
                  <ModelChannel
                    key={index}
                    channelName={item.name}
                    channelType={item.type}
                    avatars={item.avatars || []}
                    handleJoinChannel={() => {
						setItem(item);
                      if (item.type === "PROTECTED") setDisplayPassword(true);
					  else
                      handleJoinChannel(item);
                    }}
                  />
                ))}
              </>
            ) : (
              <div className="w-full h-full flex flex-col space-y-4 items-center justify-center">
                <div className=" flex items-center justify-center">
                  <UserInput
                    handleKeyDown={handleKeyDown}
                    placeholder="*********"
                    type="password"
                    label="Password"
                    lableColor="bg-RhinoBlue"
                    width="xl"
                    regExp={/^.{1,}$/}
                    isError={errorPassword}
                    isDisabled={false}
                    value={password}
                    setError={setErrorPassword}
                    setValue={setPassword}
                  />
                </div>
                <PrimaryButton
                  onKeyDown={() => {}}
                  text="Confirm"
                  onClick={() => handleJoinChannel(item)}
                />
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default ExploreChannels;
