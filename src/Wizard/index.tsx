import { useState } from "react";
import { TextButton } from "../components/TextButton";
import useLocalStorage from "../hooks/useLocalStorage";
import { uid } from "../utils/uid";
import { CreateAction } from "./Actions/CreateAction";
import { UpgradeAction } from "./Actions/UpgradeAction";
import { Form } from "./Form";
import styles from "./Wizard.module.css";
import {
  Action,
  PendingAction,
  isCreateTier2Item,
  isCreateTier3Item,
  isCreateTier4Item,
  isCreateTier5Item,
  isUpgradeItem,
} from "./types";
import { ErrorBoundary } from "react-error-boundary";
import { DeleteCorruptedAction } from "./Actions/DeleteCorruptedAction";

export function Wizard() {
  const [actions, saveActions] = useLocalStorage<Action[]>("wizard-items", []);

  const [defaultFormData, setFormData] = useState<{
    pendingAction: PendingAction;
    step: number;
  } | null>(null);

  const addOrUpdateAction = (item: Action) => {
    setFormData(null);

    const index = actions.findIndex(({ id }) => id === item.id);
    if (index >= 0) {
      const newItems = [...actions];
      newItems.splice(index, 1, item);
      saveActions(newItems);
    } else {
      saveActions([...actions, item]);
    }
  };

  const deleteAction = (item: Action) => {
    saveActions(actions.filter(({ id }) => item.id !== id));
  };

  if (defaultFormData) {
    return (
      <Form
        defaultPendingAction={defaultFormData.pendingAction}
        defaultStep={defaultFormData.step}
        onDismiss={() => setFormData(null)}
        onSave={addOrUpdateAction}
      />
    );
  }

  return (
    <div className={styles.Page}>
      <div className={styles.MainSection}>
        {actions.map((action) => {
          if (
            isCreateTier2Item(action) ||
            isCreateTier3Item(action) ||
            isCreateTier4Item(action) ||
            isCreateTier5Item(action)
          ) {
            return (
              <ErrorBoundary
                key={action.id}
                fallback={<DeleteCorruptedAction action={action} />}
              >
                <CreateAction
                  action={action}
                  deleteAction={() => deleteAction(action)}
                  editAction={() =>
                    setFormData({
                      pendingAction: action,
                      step: 4,
                    })
                  }
                />
              </ErrorBoundary>
            );
          } else if (isUpgradeItem(action)) {
            return (
              <ErrorBoundary
                key={action.id}
                fallback={<DeleteCorruptedAction action={action} />}
              >
                <UpgradeAction
                  action={action}
                  deleteAction={() => deleteAction(action)}
                  editAction={() =>
                    setFormData({
                      pendingAction: action,
                      step: 4,
                    })
                  }
                />
              </ErrorBoundary>
            );
          } else {
            throw Error("Unsupported action");
          }
        })}
      </div>
      <TextButton
        className={styles.StartUpgradeButton}
        onClick={() =>
          setFormData({
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
