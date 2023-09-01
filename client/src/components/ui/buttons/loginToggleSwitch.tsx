import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { ToggleProps } from "@/types/toggleType";
import { useRouter } from "next/router";
const LoginToggleSwitch: React.FC<ToggleProps> = ({
  firstValue,
  secondValue,
  tab
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);
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
  return (
    <Tabs value={activeTab}  >
      <TabsHeader
        className="rounded-full bg-black bg-opacity-100 font-teko w-40 md:w-40 lg:w-44 h-12 md:h-12 lg:h-14"
        indicatorProps={{
          className: "bg-GreenishYellow  shadow-none rounded-full font-teko text-Ceramic",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => {
              router.push(`/${value.toLowerCase()}`);
            }}
            className={activeTab === value ? "text-DarkBg font-teko " : "font-teko text-Ceramic"}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
    
  );
};

export default LoginToggleSwitch;
