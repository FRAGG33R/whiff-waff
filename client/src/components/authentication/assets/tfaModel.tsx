import React, { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { KeyboardEvent } from "react";
import PrimaryButton from "../../ui/buttons/primaryButton";
import SecondaryButton from "../../ui/buttons/secondaryButton";
import UserInput from "../../ui/inputs/settingsInputs";
import { api } from "../../axios/instance";
import toast, { Toaster } from "react-hot-toast";
import { localApi } from "../../axios/instance";
import { useRouter } from "next/router";
import { parseJwt } from "@/lib/parseJwt";

const TfaModel = (props: { open: boolean; setOpen: Function; id: string }) => {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const router = useRouter();
  const handleOpen = () => props.setOpen(!open);

  const handleValidate = async () => {
    try {
      const response = await api.post("auth/valid-2fa", {
        id: props.id,
        pin: pin,
      });
	  localStorage.setItem("token", response.data.token);
	  const r = await localApi.post("/saveToken", { token : response.data.token });
	  router.push(`/profile/${parseJwt(response.data.token).user}`);

    } catch (error: any) {
      console.error("Error sending POST request:", error.response.data.message);
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidate();
    }
  };

  return (
    <Dialog
      className="bg-RhinoBlue h-[330px] rounded-[20px] flex items-center justify-center flex-col"
      open={props.open}
      handler={handleOpen}
      size="xs"
    >
      <Toaster position="top-right" />
      <DialogBody className="create-channel-form h-[200px] md:h-[240px] flex flex-col justify-center items-center gap-8">
        <div className="font-semibold font-poppins md:text-2xl text-white ">Verify Your Login</div>
		<div>
		<UserInput
			handleKeyDown={handleKeyDown}
			placeholder="﹡﹡﹡﹡﹡﹡"
			type="text"
			label="code"
			lableColor="bg-RhinoBlue"
			width="code"
			regExp={/^\d{6}$/}
			isError={pinError}
			isDisabled={false}
			value={pin}
			setError={setPinError}
			setValue={setPin}
		/>
        </div>
      <div className="w-[320px] gap-1 px-4 md:gap-4 flex items-center justify-center ">
        <SecondaryButton text="Cancel" onClick={handleOpen} />
        <PrimaryButton text="Confirm" onClick={handleValidate} />
      </div>
      </DialogBody>
    </Dialog>
  );
};

export default TfaModel;
