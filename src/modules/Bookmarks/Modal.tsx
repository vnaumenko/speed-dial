import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import { AddOrEditBookmarkModal } from "@/components/AddOrEditBookmarkModal";

type Props = {
  id: "new" | string;
};

export const Modal: FC<Props> = (props) => {
  const { id } = props;

  const { t } = useTranslation();

  const { bookmarks, createBookmark, saveBookmark, closeBookmarkModal } = useStore();

  return (
    <AddOrEditBookmarkModal
      initialValues={
        id !== "new" && bookmarks[id]
          ? {
              title: bookmarks[id].title,
              url: bookmarks[id].url,
            }
          : {
              url: "",
            }
      }
      onSubmit={(formValues) => {
        if (id === "new") {
          createBookmark(formValues);
        } else {
          saveBookmark({ id: bookmarks[id].id, ...formValues });
        }
      }}
      texts={{
        title: t(id === "new" ? "addBookmark" : "editBookmark"),
        buttonText: t(id === "new" ? "add" : "save"),
        urlLabel: t("urlLabel"),
        urlPlaceholder: t("urlPlaceholder"),
        urlError: t("urlError"),
        titleLabel: t("titleLabel"),
        titlePlaceholder: t("titlePlaceholder"),
      }}
      onClose={closeBookmarkModal}
    />
  );
};
