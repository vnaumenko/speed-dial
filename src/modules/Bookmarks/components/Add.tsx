import { Box, Dialog, IconButton, Portal, useDialog } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IoMdAdd } from "react-icons/io";
import { Tooltip } from "@/components/ui/tooltip";
import { useStore } from "@/store";
import { Form } from "./Form";

const Add = memo(() => {
  const {
    flags: { isEdit },
    createBookmark,
  } = useStore();

  const { t } = useTranslation();

  const dialog = useDialog();

  const addBookmarkLabel = t("addBookmark");

  if (!isEdit) return null;

  return (
    <Dialog.RootProvider value={dialog} lazyMount>
      <Box display="flex" width="100%" justifyContent="center">
        <Tooltip
          content={addBookmarkLabel}
          positioning={{ placement: "bottom" }}
          openDelay={0}
          closeDelay={0}
        >
          <Dialog.Trigger asChild>
            <IconButton
              aria-label={addBookmarkLabel}
              size="lg"
              variant="outline"
            >
              <IoMdAdd />
            </IconButton>
          </Dialog.Trigger>
        </Tooltip>
      </Box>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Form
            dialog={dialog}
            title={t("addBookmark")}
            onSubmit={createBookmark}
            submitLabel={t("add")}
          />
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
});

Add.displayName = "Add";

export { Add };
