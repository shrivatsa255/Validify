"use client"
import{ useEffect, useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from ".";
import { useStore } from "../store/store";

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/create-contract";
      case 2:
        return "/get-contract";
      case 3:
        return "/add-product";
      case 4:
        return "/verify-product";
      default:
        return "/";
    }
  };
  return (
    <ul
      className={`list-none flexCenter  flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {[
        "Home",
        "Create Contract",
        "Fetch Address",
        "Add Product",
        "Verify Product",
      ].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
            {isMobile && setIsOpen(false)}
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base hover:scale-110 duration-100 dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          }`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const { connectWallet, currentAccount,checkIfWalletIsConnected } = useStore();
  useEffect(()=>{
    checkIfWalletIsConnected();
  },[])
  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl hover:bg-teal-500 bg-teal-500"
      handleClick={() => {
        setActive("");
        router.push("/create-contract");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};
const checkActive = (active, setActive, pathname)  =>{
  switch (pathname) {
    case '/':
      if(active !== "Home") setActive("Home")
      break;
    case '/create-contract':
      if(active !== "Create Contract") setActive("Listed NFTs")
      break;
    case '/get-contract':
      if(active !== "Fetch Address") setActive("Fetch Address")
      break;
     case '/add-product':
       if(active !== "Add Product") setActive("Add Product")
      break;
     case '/verify-product':
       if(active !== "Verify Product") setActive("Verify Product")
      break;
    default:
      setActive("")
  }
}
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname()
  const { checkIfWalletIsConnected } = useStore()
  const [active, setActive] = useState("Home");
  const [isOpen, setIsopen] = useState(false);

    useEffect(() =>{
    checkActive(active,setActive,pathname)
    checkIfWalletIsConnected()
  },[pathname])

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src="/logo.webp"
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-4">Validify</p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src="/logo.webp"
              objectFit="contain"
              width={40}
              height={40}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="m1-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
        <div className="flex items-center  mx-5">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-rose-100 rounded-full ball" />
          </label>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {isOpen ? (
          theme === "dark" ? (
            <Image
              src="/cross.webp"
              objectFit="contain"
              width={25}
              height={25}
              alt="close"
              onClick={() => {
                setIsopen(false);
              }}
            />
          ) : (
            <Image
              src="/crossB.webp"
              objectFit="contain"
              width={25}
              height={25}
              alt="close"
              onClick={() => {
                setIsopen(false);
              }}
            />
          )
        ) : theme === "dark" ? (
          <Image
            src="/menu.webp"
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => {
              setIsopen(true);
            }}
          />
        ) : (
          <Image
            src="/menuB.webp"
            objectFit="contain"
            width={25}
            height={25}
            alt="close"
            onClick={() => {
              setIsopen(true);
            }}
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsopen} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
