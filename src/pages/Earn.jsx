import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiWallet, BiNotification, BiShapePolygon } from "react-icons/bi";
import { VscRocket } from "react-icons/vsc";
import { GiPartyPopper } from "react-icons/gi";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { LightSpeed, Bounce, Fade, Flip } from "react-reveal";
import { BiShield } from "react-icons/bi";
import { RiFlashlightLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { Slider, Input } from "@arco-design/web-react";
import { useGlobalContext } from "../context";
import { useInterval } from "ahooks";
import { ethers } from "ethers";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import share from "../assets/images/share.png";
import { isAddress } from "ethers/lib/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { flare } from "viem/chains";
import { useTranslation } from "react-i18next";

const Earn = ({ setIsActive }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [shareAddress, setShareAddress] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [promoteAmount, setPromoteAmount] = useState(0);
  const [promoted, setPromoted] = useState(0);

  const [alreadyCliamPromoteRewardAmount, setAlreadyCliamPromoteRewardAmount] =
    useState(0);
  const {
    setShowAlert,
    balance,
    address,
    readContract,
    writeContract,
    chain,
    alreadyClaim,
    setLoading,
  } = useGlobalContext();
  //* Handle alerts
  useEffect(() => {
    if (isCopy) {
      const timer = setTimeout(() => {
        setIsCopy(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isCopy]);
  const handleShareLink = (shareAddress) => {
    const valid = isAddress(shareAddress);
    if (!valid) {
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("modal.note7")}`,
      });
      return;
    }
    setShareLink(`https://webcashfans.com?address=${shareAddress}`);
  };

  // setShowAlert({ status: true, type: "info", message: "aaa" });

  useInterval(async () => {
    if (address === undefined) {
      return;
    }
    try {
      const promotedAmount = await readContract.getPromotedAmount(address);
      setPromoted(promotedAmount?.toString());
    } catch (error) {}
  }, 500);
  useInterval(async () => {
    if (address === undefined) {
      return;
    }
    try {
      const promoteReward = await readContract.promoteReward(address);
      setPromoteAmount(formatEther(promoteReward, "wei"));
    } catch (error) {}
  }, 500);

  const handleCopy = () => {
    if (shareLink === "") {
      setShowAlert({
        status: true,
        type: "info",
        message: `${t("modal.note8")}`,
      });
      return;
    }
    setIsCopy(true);
  };
  return (
    <div className="flex flex-col bg-[#6C6AA3] min-h-screen items-center pt-[140px] md:pt-[100px]">
      <div className="md:mb-0 mb-5 flex md:flex-row flex-col-reverse  justify-between bg-[#6C6AA3] md:w-full w-[90%] rounded-2xl md:rounded-none md:border-none border-[#2A1385] border-[1px]">
        <div className=" p-4 flex flex-col items-center justify-center md:w-[50%] w-full ">
          <img src={share} alt="share" />
        </div>
        <div className="md:w-[50%] w-full flex flex-col p-[20px] pt-[100px]">
          <div className="text-3xl text-[#AEF4E4] py-[10px] font-bold">
            {t("earn.title")}
          </div>
          <div className="text-xl text-[#AEF4E4]">
            <div>{t("earn.link1")}</div>
            <div>{t("earn.link2")}</div>
          </div>
          <div className="hover:scale-110 ease-in-out duration-500 ">
            <Fade left>
              <li className="purple-glass border-2 p-2 my-2  flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                <div>{t("earn.earn1")}</div>
                <div>{promoted}</div>
              </li>
            </Fade>
          </div>
          <div className="hover:scale-110 ease-in-out duration-500 ">
            <Fade right>
              <li className="purple-glass border-2 p-2 my-2  flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                <div>{t("earn.earn2")}</div>
                <div>{promoteAmount}Webcash</div>
              </li>
            </Fade>
          </div>
          <div className="flex items-center md:flex-row md:justify-between flex-col gap-4">
            <div>
              <input
                placeholder={`${t("earn.pleaseHold")}`}
                value={shareAddress}
                onChange={(e) => {
                  setShareAddress(e.target.value);
                }}
                className="md:w-[400px] w-[100%] py-[10px] pl-[6px] mt-[20px] bg-[#2D5CF6] border-[#2D5CF6] border-2 rounded-xl text-xl text-white mb-[10px]"
              />
              <div className={`text-[#E2B53E] mt-[-6px] text-[10px]`}>
                {t("earn.pleaseHold")}
              </div>
            </div>

            <div className="text-xl text-[#E2B53E]  mt-[6px]">
              <button
                onClick={() => {
                  handleShareLink(shareAddress);
                }}
                className="font-bold text-xl  text-black bg-[#E2B53E] w-[240px] border-2 border-[#AEF4E4] rounded-md py-[10px] px-[10px] hover:rounded-2xl hover:scale-110 ease-in-out duration-500"
              >
                🌈{t("earn.link3")}🌈
              </button>
            </div>
          </div>

          <p className="text-md mt-[20px]">
            {shareLink === "" ? `${t("earn.link5")}` : `${t("earn.link4")}`}
            <span id="copy">{shareLink}</span>
          </p>
          {isCopy ? (
            <div className="border-[1px] rounded-lg p-2 w-[140px] cursor-pointer">
              {t("earn.copy2")}🔥
            </div>
          ) : (
            <CopyToClipboard text={shareLink}>
              <button
                className="border-[1px] rounded-lg p-2 w-[120px] cursor-pointer"
                onClick={() => {
                  handleCopy();
                }}
              >
                {t("earn.copy1")}🔥
              </button>
            </CopyToClipboard>
          )}

          <p className="text-md mt-[20px]">
            {t("earn.note")}
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsActive("/");
                navigate("/");
              }}
            >
              {t("home.clickHere")}🔥
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Earn;
