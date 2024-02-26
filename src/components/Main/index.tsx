import { Container } from "@chakra-ui/react";
import React, { type PropsWithChildren, type ReactNode } from "react";
import style from "./style.module.css";

interface Props {
  widgetOne?: ReactNode;
  widgetTwo?: ReactNode;
  widgetThree?: ReactNode;
  tools?: ReactNode;
}

const Main = (props: PropsWithChildren<Props>) => {
  const { widgetOne, widgetTwo, widgetThree, children, tools } = props;

  return (
    <Container maxWidth="container.xl" minWidth="2xl" height="100dvh" padding={8}>
      <div className={style.grid}>
        <div className={style.tools}>{tools}</div>
        <div className={style.main}>{children}</div>
        <div className={style.widget1}>{widgetOne}</div>
        <div className={style.widget2}>{widgetTwo}</div>
        <div className={style.widget3}>{widgetThree}</div>
      </div>
    </Container>
  );
};

export { Main };
