export const theme = {
  menu: {
    defaultProps: {
      placement: "bottom",
      offset: 5,
      dismiss: {
        itemPress: true,
      },
      animate: {
        unmount: {},
        mount: {},
      },
      lockScroll: false,
    },
    styles: {
      base: {
        menu: {
          bg: "bg-white",
          minWidth: "min-w-[180px]",
          p: "p-3",
          border: "border border-blue-gray-50",
          borderRadius: "rounded-md",
          boxShadow: "shadow-lg shadow-[#D2386D]/10",
          fontFamily: "font-sans",
          fontSize: "text-sm",
          fontWeight: "font-normal",
          color: "text-[#D2386D]",
          overflow: "overflow-auto",
          outline: "focus:outline-none",
          zIndex: "z-[999]",
        },
        item: {
          initial: {
            display: "block",
            width: "w-full",
            pt: "pt-[9px]",
            pb: "pb-2",
            px: "px-3",
            borderRadius: "rounded-md",
            textAlign: "text-start",
            lightHeight: "leading-tight",
            cursor: "cursor-pointer",
            userSelect: "select-none",
            transition: "transition-all",
            bg: "hover:bg-[#D2386D] hover:bg-opacity-80 focus:bg-[#D2386D] focus:bg-opacity-100 active:bg-[#D2386D] active:bg-opacity-100",
            color:
              "hover:bg-[#D2386D]  focus:text-[#D2386D]  active:text-[#D2386D]",
            outline: "outline-none",
          },
          disabled: {
            opacity: "opacity-50",
            cursor: "cursor-not-allowed",
            pointerEvents: "pointer-events-none",
            userSelect: "select-none",
            bg: "hover:bg-[#D2386D] focus:bg-[#D2386D] active:bg-[#D2386D]",
            color:
              "hover:text-[#D2386D] focus:text-[#D2386D]  active:text-[#D2386D] ",
          },
        },
      },
    },
  },
};


