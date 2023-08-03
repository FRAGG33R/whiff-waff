import React from "react";
import QRCode from "qrcode.react";

interface QRCodeProps {
  code: string;
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({ code }) => {
  return (
    <div style={{ maxWidth: "200%", backgroundColor: "#f2f2f2", borderRadius: "10px", padding: "10px", display: "inline-block" }}>
      

      <QRCode value={code} size={120} className="qrcode" />
    </div>
  );
};

export default QRCodeGenerator;