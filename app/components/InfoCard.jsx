'use client'
import { useRouter } from "next/navigation";
import { Button } from "../components";
import Image from "next/legacy/image";
const InfoCard = ({
  content,
  warning,
  name,
  link,
  linkTo,
  image,
  classStyles,
}) => {
  const router = useRouter();
  return (
    <div className="flex-1 min-w-215 break-words max-w-max xs:max-w-none sm:w-full sm:min-w-155` minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-indigo-100 rounded-2xl my-4 ml-4 minlg:m-8 sm:my-2  cursor-pointer shadow-md sm:p-5 p-10">
      <div className="relative w-full h-full sm:h-50 xs:h-66 minmd:h-60 minlg:h-300 overflow-hidden">
        <h1 className="font-poppins font-semibold  dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:text-[1rem]">
          {content}
        </h1>

        {link && (
          <div className="flexCenter flex flex-col">
            <div className="relative flexCenter mt-6 sm:h-17 sm:w-none xs:h-35 minmd:h-60 minlg:h-300 h-100 w-100 rounded-md overflow-hidden">
              <Image
                src={image}
                width={200}
                height={170}
                objectFit="contain"
                alt="image"
              />
            </div>
            <Button
              btnName={name}
              classStyles="rounded-3xl sm:rounded-3xl p-8 mt-7"
              handleClick={() => router.push(linkTo)}
            />
          </div>
        )}
      </div>
      <h2
      className={`${classStyles} mt-2 font-poppins font-bold text-red-500 sm:text-sm minlg:text-xl`}
      >
        {warning}
      </h2>
    </div>
  );
};

export default InfoCard;
