import React, { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import VectorIcon from "../../../../public/searchIcon.svg";
import { searchInputProps } from "../../../types/inputsType";
import { api } from "@/components/axios/instance";
import { searchResultType } from "@/types/searchType";
import { useRouter } from "next/router";

const SearchInput: React.FC<searchInputProps> = () => {
  const [token, setToken] = useState<string>("");
  const [searchResult, setSearchResult] = useState<searchResultType[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setLoaded(false);
    try {
      const res = await api.post(
        "/users/search",
        { userName: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResult(res.data.response);
      setLoaded(true);
    } catch (error) {
      setLoaded(true);
    }
  };
  const handleNavigation = async (userName : string) => {
	await router.push(`/profile/${userName}`)
	// if (router.pathname === `/profile/[id]`) router.reload();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
    else router.push("/login");
  }, []);

  return (
    <div className="relative w-full h-full text-gray-600 bg-transparent">
      <input
        type={"search"}
        name={"search"}
        placeholder={"Search for everything..."}
        onChange={(e) => {
          handleSearch(e.target.value);
          setSearchValue(e.target.value.length === 0 ? null : e.target.value);
        }}
        className="bg-transparent pr-4 w-full text-[#6C7FA7] placeholder:text-[#6C7FA7] placeholder:font-poppins h-full pl-10 lg:pl-16 text-sm md:text-md lg:text-xl focus:outline-none"
      />
      <div className="w-5 lg:w-8 min-h-1 absolute left-4 xl:top-5 md:top-4 lg:left-5">
        <Image src={VectorIcon} alt="vector icon" />
      </div>
      {searchValue !== null && loaded === true && (
        <div className="w-full absolute min-h-1 max-h-72 overflow-y-auto scrollbar scrollbar-track-rounded-full scrollbar-thumb-ViolentViolet  scrollbar-track-transparent z-50 bg-HokiCl rounded-[12px] md:rounded-[20px] mt-2 p-4">
          {searchResult.length > 0 && loaded === true && (
            <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-start space-y-2 bg-transparent">
              {searchResult.map((item, index) => {
                return (
                  <div
					key={index}
                    onClick={() => handleNavigation(item.userName)}
                    className="w-full h-[56px] lg:h-[70px] flex flex-row items-center justify-start gap-4 rounded-[12px] md:rounded-[20px] bg-ViolentViolet/[53%] px-2 text-white cursor-pointer "
                  >
                    <img
                      src={item.avatar}
                      alt="user avatar"
                      className="w-12 h-12 lg:w-14 lg:h-14 border-4 border-DeepRose rounded-[15px] lg:rounded-[20px] "
                    />
                    <div className="font-poppins lg:text-xl">
                      {item.userName}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {searchResult.length == 0 && loaded === true && (
            <div className="w-full h-full bg-transparent flex items-center justify-center">
              <div className="font-poppins text-white text-center text-md lg:text-2xl">
                Your search did not match any user.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
