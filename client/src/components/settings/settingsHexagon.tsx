import React, { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { ImageUploadProps } from "../../types/uploadType";
import toast from "react-hot-toast";

const HexaGon: React.FC<ImageUploadProps> = ({ avatar, onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const handleMouseEnter = () => {
    setShowImageUpload(true);
  };

  const handleMouseLeave = () => {
    setShowImageUpload(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedFile(file);
      toast.success("Your profile picture has been updated", {
        duration: 5000,
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
      onImageUpload(file);
    }
  };

  const renderImage = () => {
    if (selectedFile) {
      return (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Uploaded Image"
          className="bg-DeepRose w-[130px] lg:w-[200px] -rotate-90"
        />
      );
    } else {
      return (
        <img
          alt="profile picture"
          className="bg-DeepRose w-[130px] lg:w-[200px] -rotate-90"
          src={avatar}
        />
      );
    }
  };

  return (
    <div
      className="mask mask-hexagon-2 flex items-center justify-center bg-DeepRose w-[280px] lg:w-[480px] h-32 lg:h-48 rotate-90"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mask mask-hexagon-2 w-[90%] h-[90%] bg-white text-black flex items-center justify-center">
        {renderImage()}
      </div>
        <div className="mask mask-hexagon overlay absolute inset-0 flex items-center justify-center -rotate-90 hover:bg-black opacity-80">
          <label htmlFor="image-upload" className="cursor-pointer">
            <input
              type="file"
              id="image-upload"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
            {
              showImageUpload && 
            <IconUpload />
            }
          </label>
        </div>
    </div>
  );
};

export default HexaGon;
