import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ethers } from "ethers";
import { ABI, ADDRESS } from "../contract";
import { useAccount, useChainId, useNetwork } from "wagmi";
import { formatEther, formatUnits, parseEther } from "viem";
import { useInterval } from "ahooks";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const GlobalContext = createContext();
const search = window.location.search;
const params = new URLSearchParams(search);
export const GlobalContextProvider = ({ children }) => {
  const [battleName, setBattleName] = useState("Test");
  const [readContract, setReadContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [hasTokenNumbers, setHasTokenNumbers] = useState(7);
  const [writeContract, setWriteContract] = useState(null);
  const [shareAddress, setShareAddress] = useState("");
  const [alreadyClaim, setAlreadyClaim] = useState(false);
  const [balance, setBalance] = useState(0);
  // const location = useLocation();
  const { address } = useAccount();
  const { chain } = useNetwork();
  // console.log(address, chain);
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });

  const [showLoading, setLoading] = useState({
    status: false,
    message: "",
  });
  //* Set the smart contract and provider to the state
  useEffect(() => {
    const setReadContractAndProvider = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/bsc"
      );
      const ReadContract = new ethers.Contract(ADDRESS, ABI, provider);
      setProvider(provider);
      setReadContract(ReadContract);
    };

    setReadContractAndProvider();
  }, []);

  //* Set the smart contract and provider to the state
  useEffect(() => {
    const setWriteContractAndProvider = async () => {
      if (window.ethereum === undefined) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const writeContract = new ethers.Contract(ADDRESS, ABI, signer);
      setWriteContract(writeContract);
    };
    setWriteContractAndProvider();
  }, [address, chain]);

  useInterval(() => {
    const getBalance = async () => {
      if (address === undefined) {
        setBalance(0);
        return;
      }
      try {
        const balance = await readContract?.balanceOf(address);
        setBalance(formatEther(balance));
      } catch (error) {
        console.log("getBalance", error);
      }
    };
    getBalance();
  }, 1000);
  useEffect(() => {
    if (params.get("address") == undefined) {
      return;
    } else {
      setShareAddress(params.get("address"));
    }
  });
  useEffect(() => {
    const alreadyClaim = async () => {
      if (address === undefined) {
        setAlreadyClaim(true);
        return;
      }
      try {
        const _airdropAble = await readContract?.alreadyCliamAirDrop(address);
        setAlreadyClaim(_airdropAble);
      } catch (error) {
        console.log("alreadyClaim", error);
      }
    };
    alreadyClaim();
  });

  //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [3000]);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // useInterval(async () => {
  //   if (readContract) {
  //     const filter = readContract.filters.Transfer("0xC85bcdF70ece5cf21960B48F1676aAdd0Ca0ACfB",null,null);
  //     const current = await provider.getBlockNumber();
  //      const transferamout =  await readContract.queryFilter(filter,current-2000,current-1000);
  //      console.log(transferamout?.length)
  //   }
  // }, 1000);

  return (
    <GlobalContext.Provider
      value={{
        battleName,
        showAlert,
        setShowAlert,
        address,
        readContract,
        writeContract,
        balance,
        alreadyClaim,
        showLoading,
        setLoading,
        shareAddress,
        setShareAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
