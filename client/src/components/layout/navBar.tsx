import SearchInput from "../ui/inputs/searchInput"

export default function NavBar() {
	return (
		<div className="w-full h-full flex flex-row space-x-6 lg:space-x-0 lg:justify-between bg-[#606060]/[12%] rounded-[20px]">
			<div className="h-full w-[40%] lg:w-[46%] xl:w-[40%] flex flex-row items-center">
				<SearchInput onSearch={() =>{}} placeholder="Search for everything..."/>
			</div>
			<div className="h-full w-[15%] lg:w-[12%] xl:w-[10%] flex flex-row border-2 border-blue-300"></div>
			<div className="h-full w-[15%] lg:w-[12%] xl:w-[10%] flex flex-row border-2 border-blue-300"></div>
			<div className="h-full w-[30%] lg:w-[20%] xl:w-[15%] flex flex-row border-2 border-blue-300"></div>
		</div>
	)
}