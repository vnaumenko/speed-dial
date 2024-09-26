import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import style from "./style.module.css";
import { Bookmarks } from "@/modules/Bookmarks";
import { Tools } from "@/modules/Tools";
import { Clocks } from "@/modules/Clocks";
import { useStore } from "@/store";

export const App = () => {
  const { t, i18n } = useTranslation();

  const {
    flags: { isEdit },
  } = useStore();

  useEffect(() => {
    document.title = t("windowTitle");
    document.documentElement.lang = localStorage.getItem("lang") ?? i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (isEdit) {
      document.body.classList.add("isEdit");
    } else {
      document.body.classList.remove("isEdit");
    }
  }, [isEdit]);

  return (
    <Container maxWidth="container.xxl" minWidth="2xl" height="100dvh" padding={8}>
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
