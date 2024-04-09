import React from 'react'
import Button from './Button'
import { MdContentCopy } from "react-icons/md";
import { toast } from 'sonner';

const CopyCard = ({content ='', lable = ''}) => {
 const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
 };
  return (
     <div className="flex min-w-215  max-w-max xs:max-w-none sm:w-full sm:min-w-fit minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-indigo-100 rounded-2xl my-4 sm:ml-0 minlg:m-8 sm:my-2 shadow-md sm:p-10 p-10">
      <div className="relative w-full flex flex-row sm:flex-col md:flex-col  h-full sm:h-50 xs:h-66 minmd:h-60 minlg:h-300 justify-center items-center ">
        <h1 className= {`tracking-tight font-poppins font-semibold md:text-sm dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:text-sm`} >
          {lable} : {content}
        </h1>
        <Button btnName={<MdContentCopy size={20} />} handleClick={() => handleCopy(content)} classStyles='rounded-full text-center w-fit sm:mt-3 ml-3' />
    </div>
    </div>
  )
}

export default CopyCard