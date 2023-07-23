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

const ToggleSwitch: React.FC<ButtonProps> = ({firstValue, secondValue, firstFunction, secondFunction}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.pathname === '/login' ? firstValue : secondValue);

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
    <Tabs value={activeTab}  >
      <TabsHeader
        className="rounded-full bg-black bg-opacity-100 font-teko w-32 md:w-32 lg:w-36 h-8 md:h-10 lg:h-12  "
        indicatorProps={{
          className: "bg-GreenishYellow  shadow-none rounded-full font-teko text-Ceramic",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => switchTab(value)}
            className={activeTab === value ? "text-DarkBg font-teko " : "font-teko text-Ceramic"}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  
  );
};

export default ToggleSwitch;