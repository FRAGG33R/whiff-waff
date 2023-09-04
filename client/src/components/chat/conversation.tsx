export default function Conversation() {
  const conversation = [
    {
      type: "receiver",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "2:33",
      userName: "Navoos",
    },
    {
      type: "sender",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "4:13",
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
      time: "2:33",
      userName: "Navoos",
    },
    {
      type: "sender",
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "4:13",
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
  ];

  return (
    <div className="w-full h-full overflow-y-scroll">
      {conversation.map((item, index) => {
        return (
          <div className={`chat ${item.type === "receiver" ? 'chat-end text-white' : "chat-start text-black"} `}>
            <div className={`${item.type === 'receiver' ? "bg-HokiCl" : "bg-GreenishYellow"} px-4  xl:w-[400px] 2xl:w-[600px] rounded-[12px] py-2 flex flex-col space-y-6 items-center justify-center`}>
              <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-xl md:text-2xl">
                <div>{item.userName}</div>
                <div>{item.time}</div>
              </div>
              <div className="font-poppins w-full">
                It's over Anakin, I have the high ground. 
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
