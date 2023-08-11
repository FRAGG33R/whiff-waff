import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

interface QRCodeProps {
  code: string;
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({ code }) => {
  const [qrSize, setQRSize] = useState(180);

  const updateQRCodeSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1536) {
        setQRSize(350); 
    } else if (screenWidth >= 1280) {
        setQRSize(320); 
    } else if (screenWidth >= 1024) {
        setQRSize(280); 
    } else if (screenWidth >= 768) {
        setQRSize(180); 
    } else if (screenWidth >= 640) {
        setQRSize(150); 
    } else {
        setQRSize(120); 
    }
};

  useEffect(() => {
    updateQRCodeSize(); 
    window.addEventListener("resize", updateQRCodeSize);

    return () => {
      window.removeEventListener("resize", updateQRCodeSize);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "300%",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "30px",
        display: "inline-block"
      }}
    >
      <QRCode value={code} size={qrSize} />
    </div>
  );
};

export default QRCodeGenerator;

