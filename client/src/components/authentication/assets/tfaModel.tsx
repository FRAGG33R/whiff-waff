import React, { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { KeyboardEvent } from "react";
import PrimaryButton from "../../ui/buttons/primaryButton";
import SecondaryButton from "../../ui/buttons/secondaryButton";
import UserInput from "../../ui/inputs/settingsInputs";

const TfaModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };
  const handleConfirm = () => {};
  return (
    <div>
      <div className="w-full flex flex-row gap-2 justify-center xl:justify-start">
        <button
          onClick={handleOpen}
          className="flex items-center justify-start  gap-2"
        >
          <div className="2xl:w-[80%] 2xl:flex items-center justify-start font-teko font-meduim hidden 2xl:text-3xl 3xl:text-4xl text-[#6C7FA7] text-opacity-50">
            Create new channel
          </div>
        </button>
        <Dialog
          className="bg-RhinoBlue h-[330px] rounded-[20px] flex items-center justify-center flex-col"
          open={open}
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
      </div>
    </div>
  );
};

export default TfaModel;
