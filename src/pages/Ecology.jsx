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
import { useTranslation } from "react-i18next";

const ServicesBox = ({ title, Info, Icon, Styles, Pstyles, link }) => {
  const handleClick = () => {
    window.open(link);
  };
  return (
    <div className={Styles} onClick={handleClick}>
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

const Ecology = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-400 min-h-screen pt-[120px]">
      <div className="flex  md:flex-row flex-col-reverse">
        <div className=" p-4 flex flex-col items-center md:w-[50%] mx-[10px] mb-[20px] ">
          <LightSpeed top cascade>
            <h1 className="text-teal-200 dark:text-teal-400 text-4xl mb-4 font-bold">
              {t("ec.ecosphere")}
            </h1>
            <p className="">{t("ec.click")}</p>
          </LightSpeed>
          <Fade right>
            <ServicesBox
              link={"https://webcashfaucet.org/"}
              title={t("ec.faucet")}
              Info={t("ec.ecosphere1")}
              Styles={`flex  border-2 md:flex-row flex-col md:w-[450px] w-[264px]  p-2 rounded-2xl  border-green-400 font-extrabold   text-green-400 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
            />
          </Fade>

          <Fade top>
            <ServicesBox
              link={"https://webcash.org/"}
              title={t("ec.node")}
              Info={t("ec.ecosphere2")}
              Styles={`flex md:flex-row flex-col md:w-[450px] w-[264px] font-extrabold border-2  my-2 p-2 rounded-2xl border-yellow-500  text-yellow-500 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
            />
          </Fade>

          <Fade left>
            <ServicesBox
              link={"https://webcasa.app/"}
              title={t("ec.wallet")}
              Info={t("ec.ecosphere3")}
              Styles={`servicesShrink flex md:flex-row flex-col md:w-[450px]  w-[264px] border-2 min-h-[75px]  m-2 p-2 rounded-2xl font-extrabold border-cyan-400 text-cyan-400 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
              Pstyles={`ml-2`}
            />
          </Fade>
          <Fade right>
            <ServicesBox
              link={"https://polymedia.app/"}
              title={t("ec.app")}
              Info={t("ec.ecosphere4")}
              Styles={`servicesShrink flex md:flex-row flex-col md:w-[450px]  w-[264px] border-2 min-h-[75px]  m-2 p-2 rounded-2xl font-extrabold border-teal-400 text-teal-400 dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-800 ease-in-out duration-300`}
              Pstyles={`ml-2`}
            />
          </Fade>
        </div>
        <div className="md:w-[50%] w-full md:p-[80px] mt-[30px] px-[20px] mb-[30px]">
          <RubberBand>
            <div className="text-6xl font-bold text-[#6C6AA3] pb-[20px]">
              {t("ec.aboutWEBCASH")}
            </div>
          </RubberBand>
          <Swing>
            <div className="md:text-2xl font-bold text-[16px] ">
              {t("ec.in")}
            </div>
          </Swing>
        </div>
      </div>
    </div>
  );
};

export default Ecology;
