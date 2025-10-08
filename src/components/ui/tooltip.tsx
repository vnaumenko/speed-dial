import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import { forwardRef, type ReactNode, type RefObject } from "react";

export type TooltipProps = {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
  content: ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
} & ChakraTooltip.RootProps;

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    showArrow,
    children,
    disabled,
    portalled = true,
    content,
    contentProps,
    portalRef,
    openDelay = 0,
    closeDelay = 0,
    ...rest
  } = props;

  if (disabled) return children;

  return (
    <ChakraTooltip.Root openDelay={openDelay} closeDelay={closeDelay} {...rest}>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
});

Tooltip.displayName = "Tooltip";

export { Tooltip };
