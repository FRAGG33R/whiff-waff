import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination(props: {
  max: number;
  active: number;
  setActive: (index: number) => void;
}) {
  const [max, setMax] = useState(props.max);
  const getItemProps = (index: number) =>
    ({
      className:
        props.active === index
          ? "w-8 md:w-10 md:h-10 h-8 md:text-lg bg-GreenishYellow text-black"
          : "w-8 md:w-10 md:h-10 h-8 md:text-lg bg-transparent",
      variant: props.active === index ? "filled" : "text",
      color: props.active === index ? "blue" : "blue-gray",
      onClick: () => props.setActive(index),
    } as any);

  const next = () => {
    if (props.active === max) return;

    props.setActive(props.active + 1);
  };

  const prev = () => {
    if (props.active === 1) return;

    props.setActive(props.active - 1);
  };

  return (
    <div className="flex items-center md:gap-4">
      <button
        className="flex items-center md:gap-2 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-GreenishYellow hover:text-black"
        onClick={prev}
        disabled={props.active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </button>
      <div className="flex items-center md:gap-2">
        {Array.from({ length: max }, (_, index) => (
          <IconButton {...getItemProps(index + 1)}>{index + 1}</IconButton>
        ))}
      </div>
      <button
        className="flex items-center md:gap-2 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-GreenishYellow hover:text-black"
        onClick={next}
        disabled={props.active === max}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}
