"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
import QrReader from "react-qr-scanner";
const DynamicCopyCard = dynamic(() => import('../components/CopyCard'), { ssr: false });


const QRScanner = () => {
  const [data, setData] = useState(null);
  const [scanning, setScanning] = useState(true);

  const handleError = (error) => {
    console.error("QR Code Scanner Error:", error);
  };

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      setScanning((prev) => !prev);
    }
  };

  return (
    <>
      {scanning && (
        <QrReader
          constraints={{
            audio: false,
            video: { facingMode: "environment" },
          }}
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
      )}
      {data && !scanning && (
        <div>
          <DynamicCopyCard lable='Contract' content={data.split('?')[0]} />
          <DynamicCopyCard lable='Product Id' content={data.split('?')[1]} />
        </div>)


      }
    </>
  );
};

export default QRScanner;
