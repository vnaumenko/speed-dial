import {
  Button,
  CloseButton,
  Dialog,
  FileUpload,
  Portal,
  Stack,
  Text,
  useFileUpload,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";

const ImportExportButton = memo(() => {
  const { t } = useTranslation();

  const { onExport, onClearSettings, onImport } = useStore();

  const [importedFile, setImportedFile] = useState<File | null>(null);
  const [clearSettings, setClearSettings] = useState(false);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: ["application/json"],
    onFileAccept: ({ files }) => {
      setImportedFile(files[0]);
    },
  });

  const accepted = fileUpload.acceptedFiles.map((file) => file.name);

  const handleClearSettings = (onClose: () => void) => {
    if (clearSettings) {
      onClearSettings();
      onClose();
    } else {
      setClearSettings(true);
    }
  };

  const handleSubmit = (onClose: () => void) => {
    if (importedFile) {
      onImport(importedFile);
      setImportedFile(null);
    }
    onClose();
  };

  return (
    <Dialog.Root
      lazyMount
      size="xs"
      onOpenChange={() => {
        setClearSettings(false);
        setImportedFile(null);
        fileUpload.clearFiles();
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {t("importExport")}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Context>
            {({ setOpen }) => (
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{t("importExport")}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Stack gap={2}>
                    <Button variant="outline" width="full" onClick={onExport}>
                      {t("export")}
                    </Button>
                    <FileUpload.RootProvider value={fileUpload}>
                      <FileUpload.HiddenInput />
                      <FileUpload.Trigger asChild>
                        <Button variant="outline" width="full" maxWidth="full">
                          {accepted.length > 0 ? (
                            <Text truncate>{accepted[0]}</Text>
                          ) : (
                            t("import")
                          )}
                        </Button>
                      </FileUpload.Trigger>
                    </FileUpload.RootProvider>
                    <Button
                      width="full"
                      variant={clearSettings ? "solid" : "outline"}
                      colorPalette={clearSettings ? "red" : undefined}
                      onClick={() => {
                        handleClearSettings(() => {
                          setOpen(false);
                        });
                      }}
                    >
                      {clearSettings
                        ? t("confirmClearSettings")
                        : t("clearSettings")}
                    </Button>
                  </Stack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">{t("cancel")}</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    onClick={() => {
                      handleSubmit(() => {
                        setOpen(false);
                      });
                    }}
                  >
                    {t(importedFile !== null ? "save" : "close")}
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            )}
          </Dialog.Context>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

ImportExportButton.displayName = "ImportExportButton";

export { ImportExportButton };
