'use client';

import "../app/globals.css";
import PrimaryButton from "@/components/ui/buttons/primaryButton";
import LevelBar from "@/components/ui/progressBar/levelBar";
import { ThemeProvider } from "@material-tailwind/react";

export default function Login() {
  const theme = {
    progress: {
      defaultProps: {
        variant: "filled",
        color: "blue",
        size: "md",
        value: 0,
        label: false,
        className: "",
        barProps: {},
      },
      valid: {
        variants: ["filled", "gradient"],
        colors: [
          "blue-gray",
          "gray",
          "brown",
          "deep-orange",
          "orange",
          "amber",
          "yellow",
          "lime",
          "light-green",
          "green",
          "teal",
          "cyan",
          "light-blue",
          "blue",
          "indigo",
          "deep-purple",
          "purple",
          "pink",
          "red",
          "GreenishYellow"
        ],
        sizes: ["sm", "md", "lg"],
      },
      styles: {
        base: {
          container: {
            initial: {
              display: "flex",
              justifyContent: "flex-start",
              bg: "bg-blue-gray-50",
              overflow: "overflow-hidden",
              width: "w-full",
              fontFamily: "font-sans",
              borderRadius: "rounded-full",
              fontSize: "text-xs",
              fontWeight: "font-medium",
            },
            withLabel: {},
          },
          bar: {
            display: "flex",
            justifyContent: "justify-center",
            alignItems: "items-center",
            height: "h-full",
            overflow: "overflow-hidden",
            wordBreak: "break-all",
            borderRadius: "rounded-full",
          },
        },
        sizes: {
          sm: {
            container: {
              initial: {
                height: "h-1.5",
              },
              withLabel: {
                height: "h-3.5",
              },
            },
            bar: {},
          },
          md: {
            container: {
              initial: {
                height: "h-2.5",
              },
              withLabel: {
                height: "h-4",
              },
            },
            bar: {},
          },
          lg: {
            container: {
              initial: {
                height: "h-3.5",
              },
              withLabel: {
                height: "h-5",
              },
            },
            bar: {},
          },
        },
        variants: {
          filled: {
            "blue-gray": {
              backgroud: "bg-blue-gray-500",
              color: "text-white",
            },
            gray: {
              backgroud: "bg-gray-500",
              color: "text-white",
            },
            brown: {
              backgroud: "bg-brown-500",
              color: "text-white",
            },
            "deep-orange": {
              backgroud: "bg-deep-orange-500",
              color: "text-white",
            },
            orange: {
              backgroud: "bg-orange-500",
              color: "text-white",
            },
            amber: {
              backgroud: "bg-amber-500",
              color: "text-black",
            },
            yellow: {
              backgroud: "bg-yellow-500",
              color: "text-black",
            },
            lime: {
              backgroud: "bg-lime-500",
              color: "text-black",
            },
            "light-green": {
              backgroud: "bg-light-green-500",
              color: "text-white",
            },
            green: {
              backgroud: "bg-green-500",
              color: "text-white",
            },
            teal: {
              backgroud: "bg-teal-500",
              color: "text-white",
            },
            cyan: {
              backgroud: "bg-cyan-500",
              color: "text-white",
            },
            "light-blue": {
              backgroud: "bg-light-blue-500",
              color: "text-white",
            },
            blue: {
              backgroud: "bg-blue-500",
              color: "text-white",
            },
            indigo: {
              backgroud: "bg-indigo-500",
              color: "text-white",
            },
            "deep-purple": {
              backgroud: "bg-deep-purple-500",
              color: "text-white",
            },
            purple: {
              backgroud: "bg-purple-500",
              color: "text-white",
            },
            pink: {
              backgroud: "bg-pink-500",
              color: "text-white",
            },
            red: {
              backgroud: "bg-red-500",
              color: "text-white",
            },
            "GreenishYellow": {
              backgroud: "bg-[#CBFC01]",
              color: "text-white",
            },
          },
        },
      },
    },
  };
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <ThemeProvider value={theme}>
          <LevelBar />     
        </ThemeProvider>
    </div>
  );
}
