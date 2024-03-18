import {create} from 'zustand';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { ValidifyAddress, ValidifyAddressesABI } from './constents';
import { toast } from 'sonner';


const fetchContract = (signerOrProvider) =>
 new ethers.Contract(ValidifyAddress, ValidifyAddressesABI, signerOrProvider);

export const useStore = create((set, get) => ({
 currentAccount: '',
 contractAddress: '', // Initialized as an empty string
 loading: false, // Initialized as false
 updateStatus: '', // Initialized as an empty string
 modal: false, // Initialized as false
 companyContractAddress: '', // Initialized as an empty string
 productId: '', // Initialized as an empty string
 manufactureId: '', // Initialized as an empty string
 productName: '', // Initialized as an empty string
 productBrand: '',
 productStatus:'', // Initialized as an empty string
 walletAddress: '', // Initialized as an empty string
 connectWallet: async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    set({ currentAccount: accounts[0] });
    window.location.reload();
 },
 checkIfWalletIsConnected: async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      set({ currentAccount: accounts[0] });
    } else {
      console.log("No accounts found");
    }
 },
 fetchContractAddress: async (walletAddress) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      if (walletAddress) {
        const address = await contract.getCompanySmartContractAddress(
          walletAddress
        );
        set({ contractAddress: address });
      } else {
        toast.info("Enter wallet address");
      }
    } catch (error) {
      toast.error("Oops... Something went wrong")
      console.log(error);
    }
 },
 createContract: async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      if (get().currentAccount) {
        set({ updateStatus: "Validate the transaction through your wallet", loading: true });
        let transaction = await contract.createSmartContract();
        await transaction.wait();
        await get().fetchContractAddress(get().currentAccount);
        set({ updateStatus: "Contract created \n Address: ", loading: false });
        toast.success("Contract Creation Successful")
      } else {
        toast.warning("Please check that you are connected to a wallet");
      }
    } catch (error) {
      toast.error('Oops Something went wrong!!!');
      console.log(error)
    }
 },
 checkProduct: async (companyContractAddress, productId) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      const result = await contract.checkProduct(
        companyContractAddress,
        parseInt(productId, 36)
      );
      set({ productStatus: result });
    } catch (error) {
      toast.error("Oops Something went wrong!!!")
      console.log(error);
    }
 },
 addProducts: async (productId) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    try {
      const list = JSON.parse("[" + parseInt(productId, 36) + "]");
      console.log(list)
      console.log(get().currentAccount)
      console.log(get().companyContractAddress)
      if (get().currentAccount && get().companyContractAddress && list) {
        set({ updateStatus: "Validate the transaction through your wallet", loading: true });
        let transaction = await contract.addproduct(
          get().currentAccount,
          get().contractAddress,
          list
        );
        await transaction.wait();
        set({ updateStatus: "Products Added", loading: false });
        toast.success("Products Added Successfully")
      } else {
        toast.info(
          "Please check that you are connected to a wallet, and that you have provided all the fields"
        );
      }
    } catch (error) {
      toast.warning("Unauthorized, Only contract owner can add products");
      console.log(error);
    }
 },
 // Additional functions to toggle modal and set product details
 toggleModal: () => set({ modal: !get().modal }),
 setCompanyContractAddress: (address) => set({ companyContractAddress: address }),
 setProductId: (id) => set({ productId: id }),
 setManufactureId: (id) => set({ manufactureId: id }),
 setProductName: (name) => set({ productName: name }),
 setProductBrand: (brand) => set({ productBrand: brand }),
 setWalletAddress: (address) => set({ walletAddress: address }),
 setProductStatus: (result) => set({productStatus:result})
}));
