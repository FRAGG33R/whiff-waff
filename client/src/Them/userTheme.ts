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
          boxShadow: "shadow-lg shadow-blue-gray-500/10",
          fontFamily: "font-sans",
          fontSize: "text-sm",
          fontWeight: "font-normal",
          color: "text-blue-gray-500",
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
            bg: "hover:bg-[#23336C] hover:bg-opacity-80 focus:bg-[#23336C] focus:bg-opacity-60 active:bg-[#23336C] active:bg-opacity-60",
            color:
              "hover:bg-[#23336C]  focus:text-[#23336C]  active:text-[#23336C] ",
            outline: "outline-none",
          },
          disabled: {
            opacity: "opacity-50",
            cursor: "cursor-not-allowed",
            pointerEvents: "pointer-events-none",
            userSelect: "select-none",
            bg: "hover:bg-transparent focus:bg-transparent active:bg-transparent",
            color:
              "hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500",
          },
        },
      },
    },
  },
};
