import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ButtonProps } from "../../../types/buttonsType";

const ToggleSwitch: React.FC<ButtonProps> = ({
  firstValue,
  secondValue,
  firstFunction,
  secondFunction,
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

  useEffect(() => {
    if (activeTab === firstValue) {
      firstFunction();
    } else if (activeTab === secondValue) {
      secondFunction();
    }
  }, [activeTab, firstValue, secondValue]);

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-full bg-black bg-opacity-100 font-teko w-44 md:w-52 lg:w-52 h-14 md:h-12 lg:h-14  "
        indicatorProps={{
          className:
            "bg-GreenishYellow  shadow-none rounded-full font-teko text-Ceramic",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
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

export default ToggleSwitch;
