import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import { User } from "../../types/userFriendType";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../axios/instance";

const RequestePage = ({ req, pendingFriends, setPendingFriends }: { req: User, pendingFriends : User[],  setPendingFriends : Function }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  let jwtToken: string | null = null;

  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("token");
  }
  const  handleAccept = async() => {
    try {
      setPendingFriends(pendingFriends.filter((friend:User) => friend.id !== req.id));

      const res = await api.patch (
        "/users/friendshipResponse",
        {
          id:req.id,
          status: "ACCEPTED"
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
    }
      catch (error) {
      }
      router.push("/friends");
  };

  const handleRefuse = async() => {
    try{
      setPendingFriends(pendingFriends.filter((friend:User) => friend.id !== req.id));
      const res = await api.patch("/users/friendshipResponse",
        {
          id:req.id,
          status: "REFUSED"
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    }
      catch (error) {
      }
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div
      className={`w-[95%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]
     `}
    >
      <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center ">
        <div className="h-full w-1/2 flex flex-row items-center  md:space-x-4 space-x-2 2xl:gap-10 ">
          <div className=" w-12 lg:w-20 h-14  md:h-16 flex   tooltip"
          data-tip={`${req.userName}  `}>
            <img
              src={req.avatar}
              alt="profile picture"
              className="sm:w-12 w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={`w-1/3  font-normal font-teko text-[1.3rem] xl:text-[1.4rem] 2xl:text-[2.5rem]  tracking-wide text-Mercury sm:block hidden`}
          >
            {req.userName}
          </div>
        </div>

        <div className="h-full w-1/2 flex flex-row justify-end space-x-2 lg:space-x-4">
          <div className="w-full lg:w-[15%] h-full hidden sm:flex items-center justify-center ">
            <PrimaryButton text="Accept" onClick={handleAccept} />
          </div>
          <div className="w-full lg:w-[15%] h-full  hidden sm:flex items-center justify-center ">
            <SecondaryButton text="Refuse" onClick={handleRefuse} />
          </div>
          <div className="w-[60%] h-full flex items-center justify-center sm:hidden">
            <button className="text-[#CBFC01]" onClick={handleDropdownToggle}>
              &#9660;
            </button>
          </div>
          {isDropdownOpen && (
            <ul className="menu-dropdown-show w-full h-20  bg-HokiCl   rounded-xl flex flex-col  ">
              <li>
                <a>
                  <button
                    className="font-teko text-lg text-Mercury h-10 w-full hover:bg-DeepRose hover:rounded-md"
                    onClick={handleAccept}
                  >
                    Accepted
                  </button>
                </a>
              </li>
              <li>
                <a>
                  {" "}
                  <button
                    className="font-teko text-lg text-Mercury h-10 w-full hover:bg-DeepRose hover:rounded-md"
                    onClick={handleRefuse}
                  >
                    Refuse
                  </button>
                </a>
              </li>
            </ul>
          )}
          <div />
        </div>
      </div>
    </div>
  );
};

export default RequestePage;
