import { Stack } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { Bookmark } from "@/modules/Bookmarks/components/Bookmark";
import { useStore } from "@/store";
import { FOLDER_ALL } from "@/store/contants";
import { Add } from "./components/Add";

const Bookmarks = memo(() => {
  const { bookmarks, selectedFolders } = useStore();

  const filteredBookmarks = useMemo(() => {
    return Object.values(bookmarks)
      .filter(
        ({ folders }) =>
          folders?.includes(selectedFolders) || selectedFolders === FOLDER_ALL,
      )
      .toSorted(
        ({ countClick: countClickA }, { countClick: countClickB }) =>
          countClickB - countClickA,
      );
  }, [bookmarks, selectedFolders]);

  return (
    <Stack
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      rowGap="4"
      columnGap="2"
    >
      {filteredBookmarks.map((bookmark) => (
        <Bookmark bookmark={bookmark} key={bookmark.id} />
      ))}
      <Add />
    </Stack>
  );
});

Bookmarks.displayName = "Bookmarks";

export { Bookmarks };
