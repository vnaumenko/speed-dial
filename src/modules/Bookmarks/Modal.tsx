import { type FC } from "react";
import { useStore } from "@/store";
import { AddOrEditBookmarkModal } from "@/components/AddOrEditBookmarkModal";

type Props = {
  id: "new" | string;
};

export const Modal: FC<Props> = (props) => {
  const { id } = props;

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
      texts={
        id === "new"
          ? {
              title: "Добавить закладку",
              buttonText: "Добавить",
            }
          : {
              title: "Редактировать закладку",
              buttonText: "Сохранить",
            }
      }
      onClose={closeBookmarkModal}
    />
  );
};
