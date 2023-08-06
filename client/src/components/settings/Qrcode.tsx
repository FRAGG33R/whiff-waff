import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

interface QRCodeProps {
  code: string;
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({ code }) => {
  const [qrSize, setQRSize] = useState(120);

  useEffect(() => {
    function updateQRCodeSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200)
        setQRSize(200); 
      else if (screenWidth >= 992) { 
        setQRSize(180); 
      } else if (screenWidth >= 768) { 
        setQRSize(150);
      } else { 
        setQRSize(100); 
      }
    }

    window.addEventListener("load", updateQRCodeSize);
    window.addEventListener("resize", updateQRCodeSize);

    return () => {
      window.removeEventListener("load", updateQRCodeSize);
      window.removeEventListener("resize", updateQRCodeSize);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "300%",
        backgroundColor: "#f2f2f2",
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
