import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";

const Requestepage = ({ req }: { req: any }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAccept = () => {};
  const handleRefuse = () => {};
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
          <div className=" w-12 lg:w-20 h-14  md:h-16 flex   ">
            <img
              src={req.image}
              alt="profile picture"
              className="sm:w-12 w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={`w-1/3  font-normal font-teko text-[1.3rem] xl:text-[1.4rem] 2xl:text-[2.5rem]  tracking-wide text-Mercury `}
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
                    Challenge
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
                    Block
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

export default Requestepage;
