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


const Introduction = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getOption = () => {
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: `${t("in.proportion")}`,
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 40, name: `${t("in.reserves")}` },
            { value: 30, name: `${t("in.AP")}` },
            { value: 15, name: `${t("in.community")}` },
            { value: 15, name: `${t("in.mining")}` },
          ],
        },
      ],
    };
    return option;
  };
  return (
    <div className="bg-slate-400 min-h-screen pt-[140px] md:pt-[80px]">
      <div className="flex  md:flex-row flex-col">
        <div className="md:w-[50%] w-full md:p-[80px] px-[20px] ">
          <RubberBand>
            <div className="text-6xl font-bold text-[#6C6AA3] pb-[20px]">
              Webcash
            </div>
          </RubberBand>
          <Swing>
            <div className="md:text-2xl font-bold text-[16px] ">
              {t("in.in")}
            </div>
          </Swing>
        </div>
        <div className="md:w-[50%]  w-full justify-center items-center md:p-[140px]  pt-[20px]">
          <ReactECharts option={getOption()} />
          <div className="px-[20px] flex flex-col gap-1 justify-center items-start mb-[20px] ">
            <div className="border-[1px] border-white rounded-md">
              {t("in.reserves1")}
            </div>
            <div className="border-[1px] border-white rounded-md">
              {t("in.AP1")}
            </div>
            <div className="border-[1px] border-white rounded-md">
              {t("in.community1")}
            </div>
            <div className="border-[1px] border-white rounded-md">
              {t("in.mining1")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
