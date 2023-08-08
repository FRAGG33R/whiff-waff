import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

interface QRCodeProps {
  code: string;
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({ code }) => {
  const [qrSize, setQRSize] = useState(180);

  const updateQRCodeSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1248)
        setQRSize(250); 
      else if (screenWidth >= 992) { 
        setQRSize(200); 
      } else if (screenWidth >= 768) { 
        setQRSize(170);
      } else { 
        setQRSize(140); 
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
