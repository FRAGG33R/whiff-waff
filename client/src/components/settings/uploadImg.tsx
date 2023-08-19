import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@tabler/icons-react";
import { ImageUploadProps } from "../../types/uploadType";
import SecondaryButton from "../ui/buttons/primaryButton";

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/") && file.size <= 4 * 1024 * 1024) {
      setSelectedFile(file);
      onImageUpload(file);
      setShowModal(true);
    } else {
      const errorMessage =
        "Invalid file format or size. Please select an image file (max size: 4MB).";
      console.error(errorMessage);
      setUploadError(errorMessage);
      setShowModal(true);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={
          "border-2 border-dashed border-GreenishYellow p-4 rounded-lg text-center " +
          (isDragActive ? "bg-gray-100" : "bg-DeepRose")
        }
      >
        <input {...getInputProps()} />
        {selectedFile ? <p>{selectedFile.name}</p> : <IconUpload />}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-40">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded Image"
              />
            )}
            {uploadError && <p className="text-red-500 font-poppins">{uploadError}</p>}
            <div className="px-4 py-2 mt-2 ">
              <SecondaryButton text="Close" onClick={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;