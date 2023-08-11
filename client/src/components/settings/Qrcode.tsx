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
        setQRSize(300); // breakpoint: 2xl or higher
    } else if (screenWidth >= 1280) {
        setQRSize(300); // breakpoint: xl
    } else if (screenWidth >= 1024) {
        setQRSize(240); // breakpoint: lg
    } else if (screenWidth >= 768) {
        setQRSize(150); // breakpoint: md
    } else if (screenWidth >= 640) {
        setQRSize(150); // breakpoint: sm
    } else {
        setQRSize(120); // width less than sm
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

