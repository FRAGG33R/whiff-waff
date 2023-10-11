import { HexaGonProps } from "@/types/hexagonSetting";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@tabler/icons-react";
import { ImageUploadProps } from "../../types/uploadType";
import toast, { Toaster } from "react-hot-toast";
import ValidationAlert from "../ui/alerts/validationAlert";

const HexaGon: React.FC<HexaGonProps & ImageUploadProps> = ({setErrorFile ,setSelected, avatar, onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleMouseEnter = () => {
    setShowImageUpload(true);
  };

  const handleMouseLeave = () => {
    setShowImageUpload(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/") && file.size <= 4 * 1024 * 1024) {
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
      setUploadError(null);
      setSelected(true);
    } else {
      const errorMessage =
        "Invalid file format or size. Please select an image file (max size: 4MB).";
      setUploadError(errorMessage);
      setErrorFile(true);
      toast.success("Invalid file format or size. Please select an image file (max size: 4MB).", {
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
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
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
      {showImageUpload && (
        <div className="mask mask-hexagon overlay absolute inset-0 flex items-center justify-center -rotate-90 bg-black opacity-80">
          <div {...getRootProps()} className={isDragActive ? "bg-gray-100" : ""}>
            <input {...getInputProps()} />
            {selectedFile ? <p>{selectedFile.name}</p> : <IconUpload />}
            <Toaster position="top-right" />
          </div>
        </div>
      )}
    </div>
  );
};


export default HexaGon;