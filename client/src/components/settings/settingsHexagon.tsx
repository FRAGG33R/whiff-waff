import React, { useState } from "react";
import ImageUpload from "./uploadImg";
import { HexaGonProps } from "@/types/hexagonSetting";

const HexaGon: React.FC<HexaGonProps> = ({ avatar, onImageUpload }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleMouseEnter = () => {
    setShowImageUpload(true);
  };

  const handleMouseLeave = () => {
    setShowImageUpload(false);
  };

  return (
    <div
      className="mask mask-hexagon-2 flex items-center justify-center bg-DeepRose w-[280px] lg:w-[480px] h-32 lg:h-48 rotate-90 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mask mask-hexagon-2 w-[92%] h-[92%] bg-white text-black flex items-center justify-center">
        <img
          alt="profile picture"
          className="bg-DeepRose w-[130px] lg:w-[200px] -rotate-90"
          src={avatar}
        />
      </div>
      {showImageUpload && (
        <div className="mask mask-hexagon overlay absolute inset-0 flex items-center justify-center -rotate-90 bg-black opacity-80 border">
          <ImageUpload onImageUpload={onImageUpload} />
        </div>
      )}
    </div>
  );
};

export default HexaGon;