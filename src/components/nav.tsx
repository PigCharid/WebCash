import React from "react";
import { useState, useEffect } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import i18n from "../local/i18n";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useInterval } from "ahooks";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { parseUnits } from "ethers/lib/utils.js";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import axios from "axios";
// import TokenPrice from "./TokenPrice";
import menu from "../assets/images/menu.svg";
// import { setAlert } from "../store";
const Nav = ({ isActive, setIsActive }) => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [language, setLanguage] = useState("en");
  const changeLanguage = (e) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  const navlist = [
    {
      name: `${t("nav.home")}`,
      link: "/",
    },
    // {
    //   name: `${t("nav.airDropRule")}`,
    //   link: "/airdrop",
    // },

    // {
    //   name: `${t("nav.preSaleRule")}`,
    //   link: "/presale",
    // },
    {
      name: `${t("nav.earn")}`,
      link: "/earn",
    },
    {
      name: `${t("nav.introduction")}`,
      link: "/introduction",
    },

    {
      name: `${t("nav.ecology")}`,
      link: "/ecology",
    },
  ];
  return (
    <div className="">
      {/* PC */}
      <div className="lg:flex hidden justify-between items-center p-2 fixed bg-slate-600 text-cyan-300 w-full z-10">
        <div className="flex items-center ">
          <div className="bg-yellow-500  hover:bg-yellow-300 font-bold  rounded-md hover:rounded-xl ease-in-out duration-300 p-2 m-2 text-xl text-black">
            <Link to="/">
              {/* <IoLogoGithub className="text-3xl" /> */}
              WEBCASH
            </Link>
          </div>
          <div className="flex gap-2">
            {navlist.map((el, i) => (
              <div
                key={i}
                onClick={() => {
                  setIsActive(el.link);
                  navigate(el.link);
                }}
                className={`${
                  isActive == el.link && "border-2  border-white"
                } cursor-pointer hover:bg-slate-700 font-bold   rounded-md hover:rounded-xl  p-2 m-2 text-xl`}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-center w-full">
            <TokenPrice />
          </div> */}

        <div className="flex justify-end gap-2 mr-2">
          <div className="flex items-center">
            <select
              className="bg-[#131517] border-[2px] rounded-lg"
              value={language}
              onChange={(e) => changeLanguage(e)}
            >
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>
          </div>
          {address && (
            <div className=" bg-slate-700 font-bold rounded-md hover:rounded-xl ease-in-out duration-300 p-2  text-xl cursor-pointer">
              {chain?.id !== 56 ? (
                <p
                  className="text-rose-600 whitespace-nowrap "
                  onClick={openChainModal}
                >
                  Network Error
                </p>
              ) : (
                <p>BSC</p>
              )}
            </div>
          )}

          {address && (
            <div className=" bg-slate-700 font-bold rounded-md hover:rounded-xl ease-in-out duration-300 p-2  text-xl cursor-pointer">
              <p className="whitespace-nowrap">
                {data?.formatted.slice(0, data?.formatted.indexOf(".") + 5)}
                &nbsp;BNB
              </p>
            </div>
          )}

          {address && (
            <div className=" bg-slate-700 font-bold rounded-md hover:rounded-xl ease-in-out duration-300 p-2  text-xl cursor-pointer">
              <p>
                {address.slice(0, 6)}..{address.slice(38, 42)}
              </p>
            </div>
          )}
          {!address && (
            <p
              className=" hover:bg-slate-700 font-bold  border-2 border-cyan-300 dark:border-cyan-500 rounded-md hover:rounded-xl ease-in-out duration-300 p-2 m-2 text-xl cursor-pointer whitespace-nowrap "
              onClick={openConnectModal}
            >
              Connect Wallet
            </p>
          )}
        </div>
      </div>
      {/* 移动端 */}
      {/* <div className="lg:hidden md:flex-row flex-col flex justify-between items-center text-cyan-300  w-full fixed bg-slate-600 z-10 ">
        <div className="flex justify-between items-center">
          <div className="bg-yellow-500  hover:bg-yellow-300 font-bold  rounded-md hover:rounded-xl  p-2 m-2 text-xl text-black">
            <Link to="/">
              <div
                onClick={() => {
                  setToggleDrawer(false);
                  setIsActive("/");
                }}
              >
                WEBCASH
              </div>
            </Link>
          </div>
          <div className="flex items-end pl-[180px]">
            <select
              className="bg-[#131517] border-[2px] rounded-lg"
              value={language}
              onChange={(e) => changeLanguage(e)}
            >
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>

        <div className="flex mx-4 mb-6">
          <ConnectButton />
        </div>
      </div> */}
      <div className="md:hidden md:flex-row flex-col flex  text-cyan-300  w-full fixed bg-slate-600 z-10 ">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="bg-yellow-500  hover:bg-yellow-300 font-bold  rounded-md hover:rounded-xl ease-in-out duration-300 p-2 m-2 text-xl text-black">
              <Link to="/">
                {/* <IoLogoGithub className="text-3xl" /> */}
                WEBCASH
              </Link>
            </div>
            <div className="">
              <select
                className="bg-[#131517] border-[2px] rounded-lg"
                value={language}
                onChange={(e) => changeLanguage(e)}
              >
                <option value="en">EN</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
          <div className="mr-[10px]">
            <ConnectButton />
          </div>
        </div>
        <div className="flex gap-2">
          {navlist.map((el, i) => (
            <div
              key={i}
              onClick={() => {
                setIsActive(el.link);
                navigate(el.link);
              }}
              className={`${
                isActive == el.link && "border-2  border-white"
              } cursor-pointer hover:bg-slate-700 font-bold   rounded-md hover:rounded-xl  p-2 m-2 text-md`}
            >
              {el.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;
