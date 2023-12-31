import { useMemo, useState } from "react";
import { TextButton } from "../components/TextButton";
import useLocalStorage from "../hooks/useLocalStorage";
import { uid } from "../utils/uid";
import { Group } from "./Actions/Group";
import { Form } from "./Form";
import styles from "./Wizard.module.css";
import { Action, FormData } from "./types";

export function Wizard() {
  const [savedActionsUnsafe, setSavedActions] = useLocalStorage<Action[][]>(
    "wizard-items",
    []
  );

  // Just in place migrate old data
  const savedActions = useMemo(
    () =>
      savedActionsUnsafe.length === 0
        ? []
        : Array.isArray(savedActionsUnsafe[0])
        ? savedActionsUnsafe
        : savedActionsUnsafe.map((action) => [action as any as Action]),
    [savedActionsUnsafe]
  );

  const [formData, setFormData] = useState<FormData | null>(null);

  const addOrUpdateAction = (action: Action) => {
    if (formData) {
      const { actions } = formData;

      setFormData(null);

      let index = -1;

      const newActions = [...actions];
      index = actions.findIndex(({ id }) => id === action.id);
      if (index >= 0) {
        newActions.splice(index, 1, action);
      } else {
        newActions.push(action);
      }

      const newSavedActions = [...savedActions];
      index = newSavedActions.indexOf(actions);
      if (index >= 0) {
        newSavedActions.splice(index, 1, newActions);
      } else {
        newSavedActions.push(newActions);
      }

      setSavedActions(newSavedActions);
    }
  };

  if (formData) {
    return (
      <Form
        defaultPendingAction={formData.pendingAction}
        defaultStep={formData.step}
        onDismiss={() => setFormData(null)}
        onSave={addOrUpdateAction}
      />
    );
  }

  return (
    <div className={styles.Page}>
      <div className={styles.MainSection}>
        {savedActions.map((actions, index) => (
          <Group
            actions={actions}
            addAction={() => {
              setFormData({
                actions,
                pendingAction: {
                  id: uid(),
                },
                step: 1,
              });
            }}
            deleteAction={(action: Action) => {
              if (actions.length === 1) {
                setSavedActions(
                  savedActions.filter((prev) => prev !== actions)
                );
              } else {
                setSavedActions(
                  savedActions.map((prev) => {
                    if (prev === actions) {
                      return prev.filter(({ id }) => action.id !== id);
                    } else {
                      return prev;
                    }
                  })
                );
              }
            }}
            editAction={(action: Action) => {
              setFormData({
                actions,
                pendingAction: action,
                step: 4,
              });
            }}
            key={index}
          />
        ))}
      </div>
      <TextButton
        className={styles.StartUpgradeButton}
        onClick={() =>
          setFormData({
            actions: [],
            pendingAction: {
              id: uid(),
            },
            step: 1,
          })
        }
      >
        Start an upgrade
      </TextButton>
    </div>
  );
}
