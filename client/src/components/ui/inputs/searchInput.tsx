import React, { useState, useEffect } from "react";
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
  const router = useRouter();

  const handleSearch = async (value: string) => {
    console.log("val : ", value);
    try {
      const res = await api.post(
        "/users/search",
        { userName: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("res : ", res.data.response);
      setSearchResult(res.data.response);
    } catch (error) {
      console.log(error);
    }
  };

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
      {searchValue !== null && (
        <div className="w-full absolute h-60 z-50 bg-blue-600  p-4">
          {searchResult && (
            <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-center space-y-2">
				{searchResult.map((item, index) => {
					return (
						<div className="w-full h-12 flex flex-row items-center justify-between">
							{item.userName}
							<img src={item.avatar} alt="user avatar" className="w-10 h-10" />
						</div>
					)
				})}
			</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
