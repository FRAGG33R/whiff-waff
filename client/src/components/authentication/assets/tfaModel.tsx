import React, { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { KeyboardEvent } from "react";
import PrimaryButton from "../../ui/buttons/primaryButton";
import SecondaryButton from "../../ui/buttons/secondaryButton";
import UserInput from "../../ui/inputs/settingsInputs";

const TfaModel = (props : {open : boolean, setOpen : Function}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);


  const handleOpen = () => props.setOpen(!open);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };
  const handleConfirm = () => {};
  return (
        <Dialog
          className="bg-RhinoBlue h-[330px] rounded-[20px] flex items-center justify-center flex-col"
          open={props.open}
          handler={handleOpen}
          size="xs"
        >
          <DialogBody className="create-channel-form h-[200px] md:h-[240px] flex flex-col justify-center items-center gap-6">
            <div>
              <UserInput
                handleKeyDown={handleKeyDown}
                placeholder="email@gmail.com"
                type="email"
                label="Email"
                lableColor="bg-[#27345f] sm:bg-[#273461] md:bg-[#293867] lg:bg-[#293867] xl:bg-[#293867] 2xl:bg-[#293867] 3xl:bg-[#293867]"
                width="xl"
                regExp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                isError={emailError}
                isDisabled={true}
                value={email}
                setError={setEmailError}
                setValue={setEmail}
              />
            </div>
            <div>
              <UserInput
                handleKeyDown={handleKeyDown}
                placeholder="*********"
                type="text"
                label="Pin"
                lableColor="bg-RhinoBlue"
                width="xl"
                regExp={/^.{4,}$/}
                isError={errorPassword}
                isDisabled={false}
                value={password}
                setError={setErrorPassword}
                setValue={setPassword}
              />
            </div>
          </DialogBody>
          <div className="w-[320px] gap-1 px-4 md:gap-4 flex items-center justify-center">
            <SecondaryButton text="Cancel" onClick={handleOpen} />
            <PrimaryButton text="Confirm" onClick={handleConfirm} />
          </div>
        </Dialog>
  );
};

export default TfaModel;
