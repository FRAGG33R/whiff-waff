import React, { useState , useEffect} from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ButtonProps } from '../../../types/buttonsType';
import { useRouter } from 'next/router';
import { ToggleProps } from '@/types/toggleType';

const ChannelToggleSwitch: React.FC<ToggleProps> = ({firstValue, secondValue, firstFunction, secondFunction, tab}) => {
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
  function switchTab(value: any) {
    setActiveTab(value);
    if (activeTab === firstValue) {
      firstFunction();
    }else if (activeTab === secondValue) {
      secondFunction();
    }
  }

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-full bg-black bg-opacity-100 font-teko w-40 md:w-40 lg:w-44 h-8 md:h-8 lg:h-10  "
        indicatorProps={{
          className:
            "bg-GreenishYellow  shadow-none rounded-full font-teko text-Ceramic",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => switchTab(value)}
            className={
              activeTab === value
                ? "text-DarkBg font-teko "
                : "font-teko text-Ceramic"
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