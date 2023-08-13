import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconUpload } from '@tabler/icons-react';
import { ImageUploadProps } from "../../types/uploadType";


const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      onImageUpload(file);
    } else {
      console.error('Invalid file format. Please select an image file.');
    }
  }, [onImageUpload]);



  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={
        'border-2 border-dashed border-GreenishYellow p-4 rounded-lg text-center ' +
        (isDragActive ? 'bg-gray-100' : 'bg-DeepRose')
      }
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <p>{selectedFile.name}</p>
      ) : (
        <IconUpload />
      )}
      {uploadError && (
        <p className="text-red-500">{uploadError}</p>
      )}
    </div>
  );
};

export default ImageUpload;