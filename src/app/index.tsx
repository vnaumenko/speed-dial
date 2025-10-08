import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bookmarks } from "@/modules/Bookmarks";
import { Clocks } from "@/modules/Clocks";
import { Folders } from "@/modules/Folders";
import { Tools } from "@/modules/Tools";
import { useStore } from "@/store";
import style from "./style.module.css";

export const App = () => {
  const { t, i18n } = useTranslation();

  const {
    flags: { isEdit },
    settings: { size },
  } = useStore();

  useEffect(() => {
    document.title = t("windowTitle");
    document.documentElement.lang =
      localStorage.getItem("lang") ?? i18n.language;
  }, [i18n.language, t]);

  useEffect(() => {
    document.documentElement.style.fontSize = `var(--size-${size})`;
  }, [size]);

  useEffect(() => {
    if (isEdit) {
      document.body.classList.add("isEdit");
    } else {
      document.body.classList.remove("isEdit");
    }
  }, [isEdit]);

  return (
    <Container
      padding={{
        base: 4,
        lg: 8,
      }}
      minH="100dvh"
      display="flex"
    >
      <div className={style.grid}>
        <div className={style.tools}>
          <Tools />
        </div>
        <div className={style.main}>
          <Folders />
          <Bookmarks />
        </div>
        <div className={style.clocks}>
          <Clocks />
        </div>
      </div>
    </Container>
  );
};
