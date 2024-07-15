import { Image, Text } from "@chakra-ui/react";
import React, { type FC } from "react";

type Props = {
  title: string;
  src?: string;
};

export const ButtonContent: FC<Props> = (props) => {
  const { title, src } = props;

  return (
    <>
      <Image boxSize="32px" borderRadius="4" src={src} alt={title} />
      <Text
        lineHeight={1.5}
        whiteSpace="nowrap"
        width="full"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {title}
      </Text>
    </>
  );
};
