import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination(props: {
  max: number;
  active: number;
  setActive: (index: number) => void;
}) {
  const [max, setMax] = useState(props.max);
  const [startPage, setStartPage] = useState(1);
  const endPage = Math.min(startPage + 4, max);
  
  const getItemProps = (index: number) =>
    ({
      className:
        props.active === index
          ? "w-8 md:w-10 md:h-10 h-8 md:text-lg bg-GreenishYellow text-black"
          : "w-8 md:w-10 md:h-10 h-8 md:text-lg bg-transparent text-white",
      variant: props.active === index ? "filled" : "text",
      color: props.active === index ? "blue" : "blue-gray",
      onClick: () => props.setActive(index),
    } as any);

  const next = () => {
    if (props.active === max) return;

    if (props.active === endPage && endPage < max)
      setStartPage(startPage + 1);
    props.setActive(props.active + 1);
  };

  const prev = () => {
    if (props.active === 1) return;
    if (props.active === startPage && startPage > 1)
      setStartPage(startPage - 1);
    props.setActive(props.active - 1);
  };

  return (
    <div className="flex items-center md:gap-4 md:pt-6">
      <button
        className="flex items-center md:gap-2 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-GreenishYellow hover:text-black"
        onClick={prev}
        disabled={props.active === 1}
	>
        <ArrowLeftIcon strokeWidth={2} className="h-6 md:h-4 w-4" />
        <div className="md:block hidden">Previous</div>
      </button>
      <div className="flex items-center md:gap-2">
        {Array.from({ length: props.max }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <IconButton key={pageNumber} {...getItemProps(pageNumber)}>
              {pageNumber}
            </IconButton>
          );
        })}
      </div>
      <button
        className="flex items-center md:gap-2 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-GreenishYellow hover:text-black"
        onClick={next}
        disabled={props.active === max}
      >
        <div className="md:block hidden">Next</div>
        <ArrowRightIcon strokeWidth={2} className="h-6 md:h-4 w-4" />
      </button>
    </div>
  );
}
