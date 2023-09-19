import React from "react";
import { useTranslation } from "react-i18next";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { TbBrandTwitter, TbBrandTelegram } from "react-icons/tb";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex md:flex-row flex-col   w-full text-[#8AE5F6]  justify-center items-center">
      <div className="md:w-[50%] w-full md:flex-row flex-col flex md:gap-[40px] mb-2 justify-center items-center mt-[10px] ">
        <div className="flex">
          {/* <a href="#">
          <FiLinkedin className="text-2xl ml-2 cursor-pointer hover:bg-slate-800  rounded-md ease-in-out duration-500 hover:p-1" />
        </a> */}
          <a href="https://twitter.com/kanzure?s=09" target="_blank">
            <TbBrandTwitter className="text-4xl ml-2 cursor-pointer hover:bg-slate-800  rounded-md ease-in-out duration-500 hover:p-1" />
          </a>
          {/* <a href="https://discord.gg/fkcjdMD39a" target="_blank">
          <SiDiscord className="text-4xl ml-2 cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-600 rounded-md ease-in-out duration-500 hover:p-1" />
        </a> */}
          <a href="https://t.me/webcashfans" target="_blank">
            <TbBrandTelegram className="text-4xl ml-2 cursor-pointer hover:bg-slate-800  rounded-md ease-in-out duration-500 hover:p-1" />
          </a>
        </div>

        <div className="text-xl font-bold">
          Contact Us:contact@webcashfans.com
        </div>
      </div>

      {/* <div className="md:w-[50%] w-ful flex justify-center items-center ">
        <h1 className="font-extrabold text-3xl">{t("footer.note")}</h1>
      </div> */}
    </div>
    // <div className="flex md:flex-row flex-col h-[75px]  w-full">
    //   <div className="flex md:flex-row flex-col items-center">
    //     <section>s
    //       <div className="flex flex-wrap mt-6 ml-2">
    //         <a href="#">
    //           <FiLinkedin className="text-2xl ml-2 cursor-pointer hover:bg-slate-800  rounded-md ease-in-out duration-500 hover:p-1" />
    //         </a>
    //         <a href="#">
    //           <FiGithub className="text-2xl ml-2 cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-600 rounded-md ease-in-out duration-500  hover:p-1" />
    //         </a>
    //         <a href="#">
    //           <SiDiscord className="text-2xl ml-2 cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-600 rounded-md ease-in-out duration-500 hover:p-1" />
    //         </a>
    //       </div>
    //     </section>

    //     <section className="flex ">
    //       <h1 className="font-extrabold text-xl">
    //         Made with 💜 by NewDefi Team!
    //       </h1>
    //     </section>
    //     <div className="h-[75px] bg-slate-600 dark:bg-slate-900 text-cyan-300 dark:text-cyan-500">
    //     <footer>

    //         </section>
    //       </div>
    //     </footer>
    //   </div>
    //   </div>
    // </div>
  );
};

export default Footer;
