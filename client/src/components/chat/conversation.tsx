export default function Conversation() {
  const conversation = [
    {
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "2:33",
      user: "Navoos",
    },
    {
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "4:13",
      user: "Navoos",
    },
    {
      content:
        "Lorem Ipsum dolar sign nisi an abstruction of the middle, lines are broken !",
      time: "3:12",
      user: "Navoos",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="chat chat-start text-black">
        <div className="bg-GreenishYellow px-4 rounded-[12px] py-2 flex flex-col space-y-6 items-center justify-center">
		  <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-xl md:text-2xl">
			<div>{conversation[0].user}</div>
			<div>{conversation[0].time}</div>
		  </div>
		  <div className="font-poppins">It's over Anakin, <br />I have the high ground.</div>
        </div>
      </div>
      <div className="chat chat-end text-white">
        <div className="bg-HokiCl px-4 rounded-[12px] py-2 flex flex-col space-y-6 items-center justify-center">
		  <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-xl md:text-2xl">
			<div>{conversation[0].user}</div>
			<div>{conversation[0].time}</div>
		  </div>
		  <div className="font-poppins">It's over Anakin, <br />I have the high ground.</div>
        </div>
      </div>
    </div>
  );
}
