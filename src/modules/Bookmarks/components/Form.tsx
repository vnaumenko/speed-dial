import {
  Box,
  Button,
  CheckboxCard,
  CheckboxGroup,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Stack,
  Text,
  type UseDialogReturn,
} from "@chakra-ui/react";
import { type FormEvent, memo } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui/field";
import { useStore } from "@/store";
import type { FormValues } from "./types";

type Props = {
  dialog: UseDialogReturn;
  title: string;
  submitLabel: string;
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
};

const Form = memo<Props>((props) => {
  const { dialog, title, initialValues, onSubmit, submitLabel } = props;

  const { t } = useTranslation();

  const { folders } = useStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const url = formData.get("url") as string;
    const title = formData.get("title") as string;
    const folders = formData.getAll("folders") as string[];

    onSubmit({ url, title, folders });

    dialog.setOpen(false);
  };

  const foldersArray = Object.entries(folders);

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>
      <form onSubmit={handleSubmit}>
        <Dialog.Body>
          <Stack gap={4}>
            <Field label={t("urlLabel")} required>
              <Input
                type="url"
                name="url"
                size="lg"
                defaultValue={initialValues?.url}
                autoFocus
                placeholder={t("urlPlaceholder")}
              />
            </Field>
            <Field label={t("titleLabel")}>
              <Input
                size="lg"
                defaultValue={initialValues?.title}
                name="title"
                placeholder={t("titlePlaceholder")}
              />
            </Field>
            {foldersArray.length > 0 && (
              <Box gap="1.5" display="flex" flexDirection="column">
                <Text textStyle="sm" fontWeight="medium">
                  {t("foldersLabel")}
                </Text>
                <CheckboxGroup defaultValue={initialValues?.folders}>
                  <Flex gap="2" flexWrap="wrap">
                    {foldersArray.map(([id, label]) => (
                      <CheckboxCard.Root key={id} value={id} name="folders">
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Content alignItems="center">
                            <CheckboxCard.Label textWrapMode="nowrap">
                              {label}
                            </CheckboxCard.Label>
                          </CheckboxCard.Content>
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </Box>
            )}
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </Dialog.ActionTrigger>
          <Button type="submit">{submitLabel}</Button>
        </Dialog.Footer>
      </form>
      <Dialog.CloseTrigger asChild>
        <CloseButton size="sm" />
      </Dialog.CloseTrigger>
    </Dialog.Content>
  );
});

Form.displayName = "Form";

export { Form };
