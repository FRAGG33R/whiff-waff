import React, { useState, useEffect } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { ToggleChatProps } from "@/types/toggleType";

const ChannelToggleSwitch: React.FC<ToggleChatProps> = ({
  firstValue,
  secondValue,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState(firstValue);

  const data = [
    {
      label: firstValue,
      value: firstValue,
    },
    {
      label: secondValue,
      value: secondValue,
    },
  ];

  function switchTab(value: any) {
    setActiveTab(value);
    onToggle(value);
  }
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-md md:rounded-full bg-black bg-opacity-10 font-teko w-full lg:w-40 2xl:w-56 3xl:w-72 h-6 md:h-10 lg:h-12 xl:h-14"
        indicatorProps={{
          className:
            "bg-GreenishYellow shadow-none rounded-md md:rounded-full font-teko text-Ceramic",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => switchTab(value)}
            className={
              activeTab === value
                ? "text-DarkBg font-teko text-[8px] md:text-lg xl:text-2xl"
                : "font-teko text-HokiCl text-[8px] md:text-lg xl:text-2xl"
            }
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default ChannelToggleSwitch;
