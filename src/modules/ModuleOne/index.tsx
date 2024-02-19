import { useState } from "react";
import cn from "classnames";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import style from "./style.module.css";

export const ModuleOne = () => {
  const [newValue, setNewValue] = useState("");
  const [state, setState] = useState([
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ]);
  return (
    <div className={style.moduleOne}>
      <ul className={cn("mt-2", style.ul)}>
        {state.map((item, index) => (
          <li key={item}>
            {item}
            <Button
              onClick={() => {
                setState((p) => p.filter((_, i) => i !== index));
              }}
            >
              <DeleteIcon className={"w-16 h-16"} />
            </Button>
          </li>
        ))}
      </ul>
      <input
        className={cn("mt-2", style.input)}
        type="text"
        value={newValue}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      />
      <button
        className={cn("mt-2", style.button)}
        onClick={() => {
          setState((p) => [...p, newValue]);
          setNewValue("");
        }}
      >
        Add
      </button>
    </div>
  );
};
