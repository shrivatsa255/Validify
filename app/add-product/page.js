"use client"
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
const DynamicInfoCard = dynamic(() => import('../components/InfoCard'), { ssr: false });
const DynamicInput = dynamic(() => import('../components/Input'), { ssr: false });
const DynamicButton = dynamic(() => import('../components/Button'), { ssr: false });


import { useStore } from '../store/store'; // Adjust the import path as necessary
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";

const AddProduct = () => {
 const {
    currentAccount,
    addProducts,
    updateStatus,
    setCompanyContractAddress,
    loading,
    companyContractAddress
 } = useStore();

 // State variables for user input
//  const [companyContractAddress, setCompanyContractAddress] = useState("");
 const [productId, setProductId] = useState("");
 const [manufactureId, setManufactureId] = useState("");
 const [productName, setProductName] = useState("");
 const [productBrand, setProductBrand] = useState("");
 const [url, setUrl] = useState('')

const handleAddProducts=()=>{
    addProducts(productId)
}
 const qrRef = useRef();

 const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
 };

 const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={companyContractAddress+'?'+productId}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
      includeMargin={true}
    />
 );

 return (
    <div className="flex-1 sm:px-4 p-12">
      <div className="md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-bold ml-4 sm:ml-0">
          Add Products
        </h1>
        <div className="mt-5 text-justify">
          <h3 className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl font-semibold ml-4 sm:ml-0">
            Description
          </h3>
          <DynamicInfoCard
            content="Companies can add the products manufactured by them to the blockchain SMART-CONTRACT"
            warning="Add a product to the SMART-CONTRACT by providing the details of the company contract address and the product details"
            classStyles="text-md"
          />
          <div className="ml-4 sm:ml-0">
            <DynamicInput
              title="Contract Address"
              placeholder="Enter the company contract address"
              handleClick={(e) => setCompanyContractAddress(e.target.value)}
            />
            <DynamicInput
              title="Product Id"
              placeholder="Enter Product Id"
              handleClick={(e) => setProductId(e.target.value)}
            />
            <DynamicInput
              title="Manufacturer Id"
              placeholder="Enter Manufacturers Id"
              handleClick={(e) => setManufactureId(e.target.value)}
            />
            <DynamicInput
              title="Product Name"
              placeholder="Enter Product Name"
              handleClick={(e) => setProductName(e.target.value)}
            />
            <DynamicInput
              title="Brand"
              placeholder="Enter Product Brand"
              handleClick={(e) => setProductBrand(e.target.value)}
            />
            <div className="mt-8 flex justify-end">
              <DynamicButton
                btnName="Add Product"
                classStyles="rounded-xl mb-7"
                handleClick={handleAddProducts}
              />
            </div>
            <div className={!loading && "hidden"}>
              {currentAccount ? (
                <div>
                 {loading ? (
                    toast.promise("Transaction in proceess...")
                 ) : (
                    <DynamicInfoCard content={updateStatus} />
                 )}
                </div>
              ) : (
                toast.warning("Connect to MetaMask")
              )}
            </div>
            <div className="flex-col dark:bg-nft-black-3 p-5 bg-indigo-100 rounded-2xl">
              <div ref={qrRef} className="sm:flexCenter">{qrcode}</div>
              <DynamicInput
                type="text"
                value={companyContractAddress+'?'+productId}
                handleClick={(e) => setUrl(e.target.value)}
                placeholder="Address of Company"
              />
              <DynamicButton 
                btnName="Download QR Code"
                classStyles="rounded-xl mt-5"
                disabled={!companyContractAddress}
                handleClick={downloadQRCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default AddProduct;
