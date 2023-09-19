import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightSpeed, Bounce, Fade, Flip } from "react-reveal";
import { BiShield } from "react-icons/bi";
import { RiFlashlightLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { useGlobalContext } from "../context";
import { useInterval } from "ahooks";
import { parseEther } from "viem";
import { useTranslation } from "react-i18next";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { formatUnits, isAddress } from "ethers/lib/utils";
import dayjs from "dayjs";
// import binance from "../assets/images/binance.png";
// import huobi from "../assets/images/huobi.png";
// import okex from "../assets/images/okex.png";

const countDown = (diffTime) => {
  let day = Math.floor(diffTime / (60 * 60 * 24));
  let hours = Math.floor((diffTime / (60 * 60)) % 24);
  let minutes = Math.floor((diffTime / 60) % 60);
  let seconds = Math.floor(diffTime % 60);
  return day + " D " + hours + " H " + minutes + " M " + seconds + " S ";
};
const ServicesBox = ({ title, Info, Icon, Styles, Pstyles }) => {
  return (
    <div className={Styles}>
      <div>
        <h1 className="serviceHead mt-1">
          {Icon}
          <p className={Pstyles}>{title}</p>
        </h1>
      </div>

      <div>
        <p className="ml-4 mt-4 text-center">{Info}</p>
      </div>
    </div>
  );
};

const Home = ({ setIsActive }) => {
  const navigate = useNavigate();
  const [bugvalue, setBugValue] = useState(0.1);
  const [bugAmount, setBugAmount] = useState(0);
  const { t } = useTranslation();
  const [diffTime, setDifftime] = useState(0);
  const {
    setShowAlert,
    balance,
    address,
    readContract,
    writeContract,
    chain,
    alreadyClaim,
    setLoading,
    shareAddress,
    setShareAddress,
  } = useGlobalContext();
  const { openConnectModal } = useConnectModal();
  // setShowAlert({ status: true, type: "info", message: "aaa" });
  const handleAirDrop = async () => {
    setLoading({
      status: true,
      message: `${t("modal.note3")}`,
    });
    let _shareaddress;

    if (shareAddress === "") {
      _shareaddress = "0x0000000000000000000000000000000000000000";
    } else {
      _shareaddress = shareAddress;
    }
    if (!isAddress(_shareaddress)) {
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("modal.note9")}`,
      });
      setLoading({
        status: false,
        message: `${t("modal.note4")}`,
      });
      return;
    }
    if (address == _shareaddress) {
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("home.new2")}`,
      });
      setLoading({
        status: false,
        message: `${t("modal.note4")}`,
      });
      return;
    }
    try {
      const tx = await writeContract.getAirDrop(_shareaddress, {
        value: parseEther("0.00316"),
      });
      await tx.wait();
      setLoading({
        status: false,
        message: "",
      });
      setBugAmount(bugAmount + 1);
      setShowAlert({
        status: true,
        type: "success",
        message: `${t("modal.note1")}`,
      });
      return;
    } catch (error) {
      console.log(error);
      setLoading({
        status: false,
        message: `${t("modal.note3")}`,
      });
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("modal.note2")}`,
      });
    }
  };

  const handlePreSale = async () => {
    setLoading({
      status: true,
      message: `${t("modal.note4")}`,
    });
    let _shareaddress;

    if (shareAddress === "") {
      _shareaddress = "0x0000000000000000000000000000000000000000";
    } else {
      _shareaddress = shareAddress;
    }
    if (!isAddress(_shareaddress)) {
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("modal.note9")}`,
      });
      setLoading({
        status: false,
        message: `${t("modal.note4")}`,
      });
      return;
    }
    if (address == _shareaddress) {
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("home.new2")}`,
      });
      setLoading({
        status: false,
        message: `${t("modal.note4")}`,
      });
      return;
    }
    try {
      const tx = await writeContract.preSale(
        parseEther(String(bugvalue)),
        _shareaddress,
        {
          value: parseEther(String(bugvalue)),
        }
      );
      await tx.wait();
      setLoading({
        status: false,
        message: "Pre Sale...",
      });
      setShowAlert({
        status: true,
        type: "success",
        message: `${t("modal.note5")}`,
      });
      return;
    } catch (error) {
      console.log(error);
      setLoading({
        status: false,
        message: "Get AirDrop...",
      });
      setShowAlert({
        status: true,
        type: "failure",
        message: `${t("modal.note6")}`,
      });
    }
  };

  useInterval(async () => {
    if (address === undefined) {
      return;
    }
    try {
      const totalClaimAirDropTime = await readContract.totalClaimAirDropTime();

      setBugAmount(formatUnits(totalClaimAirDropTime, "wei"));
    } catch (error) {}
  }, 500);

  useEffect(() => {
    setDifftime(1688306400 - parseInt(Date.parse(new Date()) / 1000));
  }, []);

  useInterval(() => {
    if (diffTime == 0) {
      return;
    }
    setDifftime(diffTime - 1);
  }, 1000);

  return (
    <div className="flex flex-col bg-slate-400 min-h-screen items-center pt-[100px]">
      <Bounce>
        <h1 className="text-green-700 font-extrabold  text-6xl mt-[60px] mb-0 ">
          🚀🚀🚀🚀{t("home.cliamAirDrop")}
        </h1>
        <h1 className="text-[20px] max-w-2xl">🚀🚀🚀🚀{t("home.airDropI")}</h1>
      </Bounce>
      <Bounce>
        <div className=" w-[90%] md:w-full md:text-center">
          <a
            href="https://bscscan.com/token/0xb0914CE7AE24CAF808928B5B3Fea80a34160e130"
            target="_blank"
            className="text-xl text-white font-bold break-words "
          >
            {t("home.ca")}0xb0914CE7AE24CAF808928B5B3Fea80a34160e130
          </a>
        </div>
      </Bounce>
      <Bounce>
        <div className="text-5xl text-red-500 font-bold">
          {countDown(diffTime)}
        </div>
      </Bounce>

      <div className="purple-glass flex md:flex-row flex-col  md:w-[800px] w-[90%] mb-12   p-4">
        <div className="flex flex-col items-center md:w-[70%] w-full">
          <LightSpeed top cascade>
            <h1 className="text-teal-200 font-bold dark:text-teal-400 text-4xl">
              {t("home.airdropInformation")}
            </h1>
          </LightSpeed>

          <div className="flex justify-center w-full ">
            <ol className=" text-teal-200 dark:text-teal-400 mt-4 md:text-lg text-sm font-bold w-[450px]">
              <div className=" hover:scale-110 ease-in-out duration-500">
                <Fade right>
                  <li className="purple-glass border-2 p-2  flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                    <div>{t("home.totalairdrop")}</div>
                    <div>63000000000Webcash</div>
                  </li>
                </Fade>
              </div>
              <div className="hover:scale-110 ease-in-out duration-500 ">
                <Fade left>
                  <li className="purple-glass border-2 p-2 my-2  flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                    <div>{t("home.peoplereceived")}</div>
                    {/* <div> {Number(bugAmount)}</div> */}
                    <div> 358</div>
                  </li>
                </Fade>
              </div>
              <div className="hover:scale-110 ease-in-out duration-500">
                <Fade right>
                  <li className="purple-glass border-2 p-2  my-2 flex w-full justify-between  cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                    <div>{t("home.theTotalOfReceived")}</div>
                    {/* <div>{Number(bugAmount) * 100000}Webcash</div> */}
                    <div>{358 * 100000}Webcash</div>
                  </li>
                </Fade>
              </div>
              <div className="hover:scale-110 ease-in-out duration-500">
                <Fade left>
                  <li className="purple-glass border-2 p-2 my-2 flex  w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                    <div>{t("home.balance")}</div>
                    <div>
                      {address ? `${balance}Webcash` : `${t("home.CW")}`}
                    </div>
                  </li>
                </Fade>
              </div>
              <div className="hover:scale-110 ease-in-out duration-500">
                <Fade right>
                  <li className="purple-glass border-2 p-2  my-2 flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                    <div>{t("home.youClaim")}</div>
                    <div>
                      {" "}
                      {address
                        ? !alreadyClaim
                          ? "100000Webcash"
                          : "0Webcash"
                        : `${t("home.CW")}`}
                    </div>
                  </li>
                </Fade>
              </div>
            </ol>
          </div>
        </div>

        <div className="md:w-[30%] w-full flex flex-col justify-center items-center gap-0  pt-[80px]">
          <input
            placeholder={t("home.pleaseHold")}
            value={shareAddress}
            onChange={(e) => {
              setShareAddress(e.target.value);
            }}
            className=" py-[10px] pl-[6px] mt-[20px] bg-[#2D5CF6] border-[#2D5CF6] border-2 rounded-xl text-xl text-white"
          />
          <div className={`text-[#E2B53E] mt-[0px] text-[10px]`}>
            {t("home.inviterAddress")}
          </div>
          {address ? (
            <button
              disabled={alreadyClaim}
              onClick={handleAirDrop}
              className="text-black font-bold text-2xl bg-[#E2B53E] border-2 border-[#AEF4E4] rounded-md py-[10px] px-[30px] hover:rounded-2xl hover:scale-110 ease-in-out duration-500"
            >
              {!alreadyClaim
                ? `🌈 ${t("home.claim")}🌈`
                : `🚫 ${t("home.alreadyClaim")}🚫`}
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              className="text-black font-bold text-2xl bg-[#E2B53E] border-2 border-[#AEF4E4] rounded-md py-[10px] px-[30px] hover:rounded-2xl hover:scale-110 ease-in-out duration-500"
            >
              🌈{t("home.CW")}🌈
            </button>
          )}
        </div>
      </div>
      <Bounce>
        <h1 className="text-indigo-600 font-extrabold text-6xl my-[40px]  ">
          🚨🚨🚨🚨🚨{t("home.PRESALE")}
        </h1>
      </Bounce>
      <div className="md:mb-0 mb-5 flex md:flex-row flex-col-reverse justify-between bg-[#6C6AA3] md:w-full w-[90%] rounded-2xl md:rounded-none md:border-none border-[#2A1385] border-[1px]">
        <div className=" p-4 flex flex-col items-center md:w-[50%] w-full ">
          <LightSpeed top cascade>
            <h1 className="text-teal-200 dark:text-teal-400 text-4xl mb-6 font-bold">
              {t("home.whywcu")}
            </h1>
          </LightSpeed>
          <Fade right>
            <ServicesBox
              title={t("home.security")}
              Info={t("home.security1")}
              Icon={<BiShield className="text-3xl  text-green-400 " />}
              Styles={`flex  border-2 md:flex-row flex-col md:w-[450px] w-[264px]  p-2 rounded-2xl  border-green-400 font-extrabold   text-green-400 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
            />
          </Fade>

          <Fade top>
            <ServicesBox
              title={t("home.jewelry")}
              Info={t("home.jewelry1")}
              Icon={
                <RiFlashlightLine className="text-3xl text-yellow-500 ml-2" />
              }
              Styles={`flex md:flex-row flex-col md:w-[450px] w-[264px] font-extrabold border-2  my-2 p-2 rounded-2xl border-yellow-500  text-yellow-500 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
            />
          </Fade>

          <Fade left>
            <ServicesBox
              title={t("home.systematic")}
              Info={t("home.systematic1")}
              Icon={<BsCoin className="text-3xl text-cyan-400 ml-2" />}
              Styles={`servicesShrink flex md:flex-row flex-col md:w-[450px]  w-[264px] border-2 min-h-[75px]  m-2 p-2 rounded-2xl font-extrabold border-cyan-400 text-cyan-400 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
              Pstyles={`ml-2`}
            />
          </Fade>
          {/* <div className="flex gap-[40px]">
            <img
              src={binance}
              alt="binance"
              className="w-[50px] h-[50px] rounded-xl "
            />
            <img
              src={okex}
              alt="okex"
              className="w-[50px] h-[50px] rounded-xl "
            />

            <img
              src={huobi}
              alt="huobi"
              className="w-[50px] h-[50px] rounded-xl bg-white "
            />
          </div> */}
        </div>
        <div className="md:w-[50%] w-full flex flex-col p-[20px] pt-[60px]">
          <div className="text-3xl text-[#AEF4E4] py-[10px]">
            {t("home.systematic1")}
          </div>
          <div className="text-xl text-[#AEF4E4]">
            <div>{t("home.preSaleRules1")}</div>
            <div>{t("home.preSaleRules2")}</div>
            <div>{t("home.preSaleRules3")}</div>
            <div>{t("home.new1")}</div>
          </div>
          <input
            placeholder={t("home.pleaseHold")}
            value={shareAddress}
            onChange={(e) => {
              setShareAddress(e.target.value);
            }}
            className=" py-[10px] pl-[6px] mt-[20px] bg-[#2D5CF6] border-[#2D5CF6] border-2 rounded-xl text-xl text-white"
          />
          <div className={`text-[#E2B53E] mt-[0px] text-[10px]`}>
            {t("home.inviterAddress")}
          </div>

          <div className="flex items-center gap-4">
            <input
              type="number"
              min={0.1}
              max={1}
              step={0.1}
              value={bugvalue}
              onChange={(e) => {
                setBugValue(e.target.value);
              }}
              className="w-[100px] p-[10px] mt-[10px] bg-[#2D5CF6] border-[#2D5CF6] border-2 rounded-xl text-xl text-white mb-[10px]"
            />
            <div className="ml-[-12px] mt-[6px] text-xl text-white">BNB</div>
            <div className="text-xl text-[#E2B53E]  mt-[6px]">
              🤑🤑🤑{t("home.youWillR")}
              <span className="text-white">
                {(bugvalue * 50000000).toFixed(1)}
              </span>
              Webcash
            </div>
          </div>

          <div className={`text-[#E2B53E] mt-[-6px] text-[10px]`}>
            {t("home.adjustAmount")}
          </div>
          {/* <div className="flex items-center gap-4">
            <input
              value={bugvalue}
              onChange={(e) => {
                setBugValue(e.target.value);
              }}
              className="w-[100px] p-[10px] mt-[20px] bg-[#2D5CF6] border-[#2D5CF6] border-2 rounded-xl text-xl text-white mb-[10px]"
            />
          </div>

          <div className={`text-[#E2B53E] mt-[-6px] text-[10px]`}>
            邀请者地址
          </div> */}
          {address ? (
            <button
              onClick={handlePreSale}
              className="font-bold text-2xl mt-[40px] text-black bg-[#E2B53E] w-[200px] border-2 border-[#AEF4E4] rounded-md py-[10px] px-[30px] hover:rounded-2xl hover:scale-110 ease-in-out duration-500"
            >
              🌈{t("home.buy")}🌈
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              className="font-bold text-2xl mt-[40px] text-black bg-[#E2B53E] w-[200px] border-2 border-[#AEF4E4] rounded-md py-[10px] px-[30px] hover:rounded-2xl hover:scale-110 ease-in-out duration-500"
            >
              🌈{t("home.CW")}🌈
            </button>
          )}

          {/* <p className="text-md mt-[20px]">
            {t("home.detailedInstructions")}？
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsActive("/presale");
                navigate("/presale");
              }}
            >
              {t("home.clickHere")}🔥
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
