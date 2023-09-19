import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiWallet, BiNotification, BiShapePolygon } from "react-icons/bi";
import { VscRocket } from "react-icons/vsc";
import { GiPartyPopper } from "react-icons/gi";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { LightSpeed, Bounce, Fade, Flip, Roll, Rotete } from "react-reveal";
import RubberBand from "react-reveal/RubberBand";
import Swing from "react-reveal/Swing";
import Flash from "react-reveal/Flash";
import { BiShield } from "react-icons/bi";
import { RiFlashlightLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import ReactECharts from "echarts-for-react";

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

const PreSale = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-400 min-h-screen pt-[100px]">
      <div className="flex flex-col items-center">
        <Bounce>
          <h1 className="text-green-700 font-extrabold  text-6xl mt-[60px] ">
            🚀🚀🚀CLAIM YOUR AIRDROP🚀🚀🚀
          </h1>
        </Bounce>
        <div className="purple-glass flex md:flex-row flex-col  md:w-[800px] w-[90%]    my-12   p-4">
          <div className="flex flex-col items-center md:w-[70%] w-full">
            <LightSpeed top cascade>
              <h1 className="text-teal-200 font-bold dark:text-teal-400 text-4xl">
                空投信息
              </h1>
            </LightSpeed>

            <div className="flex justify-center w-full ">
              <ol className=" text-teal-200 dark:text-teal-400 mt-4 md:text-lg text-sm font-bold w-[450px]">
                <div className=" hover:scale-110 ease-in-out duration-500">
                  <Fade right>
                    <li className="purple-glass border-2 p-2  flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                      <div>空投总量</div>
                      <div>aaaaWEBCASH</div>
                    </li>
                  </Fade>
                </div>
                <div className="hover:scale-110 ease-in-out duration-500 ">
                  <Fade left>
                    <li className="purple-glass border-2 p-2 my-2  flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                      <div>已经领取的空投人数</div>
                      <div>aaaaWEBCASH</div>
                    </li>
                  </Fade>
                </div>
                <div className="hover:scale-110 ease-in-out duration-500">
                  <Fade right>
                    <li className="purple-glass border-2 p-2  my-2 flex w-full justify-between  cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                      <div>已经领取的空投总量</div>
                      <div>aaaaWEBCASH</div>
                    </li>
                  </Fade>
                </div>
                <div className="hover:scale-110 ease-in-out duration-500">
                  <Fade left>
                    <li className="purple-glass border-2 p-2 my-2 flex  w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                      <div> 空投总价值</div>
                      <div>aaaa$</div>
                    </li>
                  </Fade>
                </div>
                <div className="hover:scale-110 ease-in-out duration-500">
                  <Fade right>
                    <li className="purple-glass border-2 p-2  my-2 flex w-full justify-between cursor-pointer hover:bg-slate-800 hover:text-teal-600 ease-in-out duration-500">
                      <div> 你可以领取的数量</div>
                      <div>aaaaWEBCASH</div>
                    </li>
                  </Fade>
                </div>
              </ol>
            </div>
          </div>
          <div className="md:w-[50%] flex flex-col justify-center items-center ">
            <Flash>
              <div>🌈🌈🌈🌈</div>
              <div className="cursor-pointer bg-[#E2B53E] font-bold   rounded-md hover:rounded-xl ease-in-out duration-300 p-2 m-2 text-xl">
                快去领取你的空投
              </div>
              <div>禁止作弊,一经发现加入黑名单,限制交易</div>
            </Flash>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSale;
