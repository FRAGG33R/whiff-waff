import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { IconUpload } from '@tabler/icons-react';
import { ImageUploadProps } from "../../types/uploadType";


const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      onImageUpload(file);
      uploadFile(file);
    } else {
      console.error('Invalid file format. Please select an image file.');
    }
  }, [onImageUpload]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Image uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
    </div>
  );
};

export default ImageUpload;