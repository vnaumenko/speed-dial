import { HStack, RadioCard } from "@chakra-ui/react";
import { memo } from "react";
import { useStore } from "@/store";
import { FOLDER_ALL } from "@/store/contants";
import { Add } from "./components/Add";
import { All } from "./components/All";
import { Folder } from "./components/Folder";

const Folders = memo(() => {
  const { folders, setSelectedFolders, selectedFolders } = useStore();

  return (
    <RadioCard.Root
      value={selectedFolders}
      onValueChange={(e) => {
        setSelectedFolders(e.value ?? FOLDER_ALL);
      }}
      size="sm"
      width="100%"
    >
      <HStack align="stretch" flexWrap="wrap" justifyContent="center">
        <All />
        {Object.entries(folders).map(([id, label]) => (
          <Folder id={id} label={label} key={id} />
        ))}
        <Add />
      </HStack>
    </RadioCard.Root>
  );
});

Folders.displayName = "Folders";

export { Folders };
