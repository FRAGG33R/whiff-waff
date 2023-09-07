export default function Conversation() {
  const conversation = [
    {
      type: "sender",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "2:33",
      userName: "Navoos",
    },
    {
      type: "receiver",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "4:13",
      userName: "Navoos",
    },
    {
      type: "sender",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "3:12",
      userName: "Navoos",
    },
    {
      type: "receiver",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "3:12",
      userName: "Navoos",
    },
    {
      type: "sernder",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "3:12",
      userName: "Navoos",
    },
  ];

  return (
    <div className="w-full h-full">
      {conversation.map((item, index) => {
        return (
          <div
			key={index}
            className={`chat ${
              item.type === "receiver"
                ? "chat-end text-white"
                : "chat-start text-black"
            } w-full `}
          >
            <div
              className={`${
                item.type === "receiver" ? "bg-HokiCl" : "bg-GreenishYellow"
              } px-4 md:w-[200px] lg:w-[300px] xl:w-[400px] 2xl:w-[600px] rounded-[12px] py-4 flex flex-col space-y-6 items-start justify-center`}
            >
              <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-xl md:text-2xl">
                <div>{item.userName}</div>
                <div>{item.time}</div>
              </div>
              <div className="font-poppins w-full ">
                It's over Anakin, I have the high ground.
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
