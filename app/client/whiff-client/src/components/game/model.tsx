import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { loggedUserAtom } from "@/context/RecoilAtoms";
import { userType } from "./../../types/userType";
import { useRouter } from "next/router";
import { ModelProps } from "@/types/model";

const Model: React.FC<ModelProps> = ({
  showModal,
  setShowModal,
  text,
  socket,
}) => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);

  const handleCancle = () => {
    router.push("/profile/" + (loggedUser as userType).userName);
    setShowModal(false);
  };
  return (
    <div>
      <Dialog
        className="bg-RhinoBlue bg-opacity-80 h-[400px] w-[200px] rounded-[20px]"
        open={showModal}
        handler={() => {}}
      >
        <DialogHeader className="text-GreenishYellow font-teko flex items-center justify-center text-[3rem] ">
          Game Over
        </DialogHeader>
        <DialogBody className="h-[210px] flex flex-col justify-center items-center">
          <div className=" font-poppins font-medium text-[1.5rem]">
            <p className="flex flex-col ">
              <span className="text-Mercury"> {text}</span>
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="white"
            onClick={handleCancle}
            className="mr-1 border-[3px] rounded-[20px] border-CarbonGrey"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
export default Model;
