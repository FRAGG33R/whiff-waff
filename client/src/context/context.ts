import { createContext } from "react";
import userType from "@/types/userType";

export const userContext = createContext<userType | undefined>(undefined);