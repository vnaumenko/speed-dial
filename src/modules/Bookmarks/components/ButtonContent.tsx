import { Image, Text } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  title: string;
  src?: string;
};

export const ButtonContent: FC<Props> = (props) => {
  const { title, src } = props;

  return (
    <>
      <Image
        boxSize="8"
        borderRadius="4"
        src={src || undefined}
        alt={title}
        css={{ textIndent: "-999px", overflow: "hidden" }}
      />

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
