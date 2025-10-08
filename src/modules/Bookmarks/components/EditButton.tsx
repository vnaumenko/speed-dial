import { EditIcon } from "@chakra-ui/icons";
import { Dialog, IconButton, Portal, useDialog } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { useStore } from "@/store";
import { Form } from "./Form";
import type { FormValues } from "./types";

type Props = {
  id: string;
  url: string;
  title: string;
  folders: string[];
};

const EditButton = memo<Props>((props) => {
  const { id, url, title, folders } = props;

  const { t } = useTranslation();

  const { saveBookmark } = useStore();

  const dialog = useDialog();

  const onSubmit = (values: FormValues) => {
    saveBookmark({
      id,
      ...values,
    });
  };

  return (
    <Dialog.RootProvider value={dialog} lazyMount>
      <Tooltip
        content={t("edit")}
        positioning={{ placement: "bottom" }}
        openDelay={0}
        closeDelay={0}
      >
        <Dialog.Trigger asChild>
          <IconButton
            rounded="full"
            size="xs"
            colorScheme="teal"
            aria-label={t("edit")}
          >
            <EditIcon />
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Form
            dialog={dialog}
            title={t("editBookmark")}
            initialValues={{ url, title, folders }}
            onSubmit={onSubmit}
            submitLabel={t("save")}
          />
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
});

EditButton.displayName = "EditButton";

export { EditButton };
