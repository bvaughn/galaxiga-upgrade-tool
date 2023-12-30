import { TextButton } from "../../components/TextButton";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Action } from "../types";

import styles from "./shared.module.css";

export function DeleteCorruptedAction({ action }: { action: Action }) {
  const { id } = action;

  const [actions, saveActions] = useLocalStorage<Action[]>("wizard-items", []);

  const onClick = () => {
    saveActions(actions.filter(({ id: itemId }) => itemId !== id));
  };

  return (
    <div className={styles.Action} data-error data-separator key={id}>
      Something went wrong rendering this item.
      <TextButton onClick={onClick}>Remove it</TextButton>
    </div>
  );
}
