import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import zh from "./zh.json";
import en from "./en.json";
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};
i18n
  // .use(LanguageDetector)
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({
    //初始化
    resources,
    fallbackLng: "en", //默认当前环境的语言
    detection: {
      caches: ["localStorage", "sessionStorage", "cookie"],
    },
  });

export default i18n;
