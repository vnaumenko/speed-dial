import React, { useEffect } from "react";
import "@/style/style.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { I18nextProvider, useTranslation } from "react-i18next";
import style from "./style.module.css";
import { theme } from "@/style/theme";
import { Bookmarks } from "@/modules/Bookmarks";
import { Tools } from "@/modules/Tools";
import { Clocks } from "@/modules/Clocks";
import { i18n } from "@/langs";

export const App = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("windowTitle");
    document.documentElement.lang = localStorage.getItem("lang") ?? i18n.language;
  }, [i18n.language]);

  return (
    <Container maxWidth="container.xl" minWidth="2xl" height="100dvh" padding={8}>
      <div className={style.grid}>
        <div className={style.tools}>
          <Tools />
        </div>
        <div className={style.main}>
          <Bookmarks />
        </div>
        <div className={style.clocks}>
          <Clocks />
        </div>
      </div>
    </Container>
  );
};
