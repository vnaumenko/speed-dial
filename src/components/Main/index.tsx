import { Container } from "@chakra-ui/react";
import React, { type PropsWithChildren, type ReactNode } from "react";
import style from "./style.module.css";

interface Props {
  widgetOne?: ReactNode;
  widgetTwo?: ReactNode;
  widgetThree?: ReactNode;
  widgetFour?: ReactNode;
  widgetFive?: ReactNode;
  widgetSix?: ReactNode;
  widgetSeven?: ReactNode;
  tools?: ReactNode;
}

const Main = (props: PropsWithChildren<Props>) => {
  const {
    widgetOne,
    widgetTwo,
    widgetThree,
    widgetFour,
    widgetFive,
    widgetSix,
    widgetSeven,
    children,
    tools,
  } = props;

  return (
    <Container
      maxWidth={"container.xl"}
      height={"100dvh"}
      paddingBlockStart={16}
      paddingBlockEnd={12}
    >
      <div className={style.tools}>{tools}</div>
      <div className={style.grid}>
        <div className={style.main}>{children}</div>
        <div className={style.widget1}>{widgetOne}</div>
        <div className={style.widget2}>{widgetTwo}</div>
        <div className={style.widget3}>{widgetThree}</div>
        <div className={style.widget4}>{widgetFour}</div>
        <div className={style.widget5}>{widgetFive}</div>
        <div className={style.widget6}>{widgetSix}</div>
        <div className={style.widget7}>{widgetSeven}</div>
      </div>
    </Container>
  );
};

export { Main };
