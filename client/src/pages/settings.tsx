import { useContext, useEffect } from "react";
import { userContext } from "@/context/context";

export default function settings() {
  const user = useContext(userContext);

  useEffect(() => {
    console.log("Settings", user);
  }, []);

  return <div>hello</div>;
}
