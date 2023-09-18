import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
  } from "@material-tailwind/react";
import { ModelProps } from '@/types/model';
  

const Model:React.FC<ModelProps> = ({ showModal, setShowModal , text}) => {
  return (
    <div>

<Dialog
          className="bg-RhinoBlue bg-opacity-80 h-[400px] w-[200px] rounded-[20px]"
          open={showModal}
          handler={() => setShowModal(false)}
        >
          <DialogHeader className="text-GreenishYellow font-teko flex items-center justify-center text-[3rem] ">
          Game Over
          </DialogHeader>
          <DialogBody className="h-[210px] flex flex-col justify-center items-center" >
            <div className=" font-poppins font-medium text-[1.5rem]">
              <p className="flex flex-col ">
                <span className="text-Mercury">{text}</span>
              </p>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="white"
              onClick={() => setShowModal(false)} 
              className="mr-1 border-[3px] rounded-[20px] border-CarbonGrey"
            >
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>
    </div>
  )
  }
export default Model;