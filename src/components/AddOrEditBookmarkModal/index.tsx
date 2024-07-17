import React, {
  type ChangeEventHandler,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { isValidUrl } from "@/helpers/isValidUrl";

type FormValues = {
  url: string;
  title?: string;
};

type Props = {
  initialValues: FormValues;
  onSubmit: (formValues: FormValues) => void;
  onClose: () => void;
  texts: {
    title: string;
    buttonText: string;
    urlLabel: string;
    urlPlaceholder: string;
    urlError: string;
    titleLabel: string;
    titlePlaceholder: string;
  };
};

export const AddOrEditBookmarkModal: FC<Props> = (props) => {
  const { initialValues, texts, onSubmit, onClose } = props;

  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  const urlHasError = useMemo(() => {
    return !isValidUrl(formValues.url);
  }, [formValues.url]);

  const urlEmpty = useMemo(() => {
    return formValues.url.length === 0;
  }, [formValues.url]);

  const handlerInput = useCallback(
    (key: keyof FormValues): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        setFormValues((prev) => ({
          ...prev,
          [key]: e.target.value,
        }));
      },
    [],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSubmit(formValues);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [formValues]);

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{texts.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl isInvalid={urlHasError} isRequired>
              <FormLabel>{texts.urlLabel}</FormLabel>
              <Input
                type="url"
                size="lg"
                value={formValues.url}
                onChange={handlerInput("url")}
                autoFocus
                placeholder={texts.urlPlaceholder}
              />
              {urlHasError && !urlEmpty && <FormErrorMessage>{texts.urlError}</FormErrorMessage>}
            </FormControl>
            <FormControl>
              <FormLabel>{texts.titleLabel}</FormLabel>
              <Input
                size="lg"
                value={formValues.title ?? ""}
                onChange={handlerInput("title")}
                placeholder={texts.titlePlaceholder}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              onSubmit(formValues);
            }}
            isDisabled={urlHasError}
          >
            {texts.buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
